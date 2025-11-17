import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma';

const router = Router();

// Chave secreta de administrador (para você usar)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-in-production';

const createTenantSchema = z.object({
  // Dados da Empresa
  companyName: z.string().min(2),
  companySlug: z.string().min(2).regex(/^[a-z0-9-]+$/), // ex: "distribuidora-abc"
  companyDocument: z.string().optional(), // CNPJ
  companyEmail: z.string().email().optional(),
  companyPhone: z.string().optional(),
  plan: z.enum(['basic', 'premium', 'enterprise']).default('basic'),
  expiresAt: z.string().optional(), // Data de expiração (ISO string)
  
  // Dados do Admin da Empresa
  adminName: z.string().min(2),
  adminEmail: z.string().email(),
  adminPassword: z.string().min(6),
});

// Middleware para verificar se é você (admin do sistema)
const masterAdminMiddleware = (req: any, res: any, next: any) => {
  const secret = req.headers['x-admin-secret'];
  
  if (secret !== ADMIN_SECRET) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  
  next();
};

// ✅ CRIAR NOVO TENANT (Você cria para o cliente)
router.post('/create', masterAdminMiddleware, async (req, res) => {
  try {
    const data = createTenantSchema.parse(req.body);

    // Verificar se slug já existe
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: data.companySlug },
    });

    if (existingTenant) {
      return res.status(400).json({ error: 'Slug já existe. Use outro identificador.' });
    }

    // Verificar se email do admin já existe (global)
    const existingUser = await prisma.user.findFirst({
      where: { email: data.adminEmail },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email do admin já cadastrado em outra empresa' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(data.adminPassword, 10);

    // Criar Tenant + Admin em uma transação
    const result = await prisma.$transaction(async (tx) => {
      // 1. Criar Tenant (Empresa)
      const tenant = await tx.tenant.create({
        data: {
          name: data.companyName,
          slug: data.companySlug,
          document: data.companyDocument,
          email: data.companyEmail,
          phone: data.companyPhone,
          plan: data.plan,
          expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
          active: true,
        },
      });

      // 2. Criar Admin do Tenant
      const admin = await tx.user.create({
        data: {
          tenantId: tenant.id,
          email: data.adminEmail,
          password: hashedPassword,
          name: data.adminName,
          role: 'admin',
        },
      });

      return { tenant, admin };
    });

    res.status(201).json({
      message: 'Tenant criado com sucesso!',
      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
        slug: result.tenant.slug,
        plan: result.tenant.plan,
        active: result.tenant.active,
      },
      admin: {
        id: result.admin.id,
        name: result.admin.name,
        email: result.admin.email,
        role: result.admin.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Erro ao criar tenant:', error);
    res.status(500).json({ error: 'Erro ao criar tenant' });
  }
});

// ✅ LISTAR TODOS OS TENANTS (Para você ver)
router.get('/list', masterAdminMiddleware, async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        _count: {
          select: {
            users: true,
            products: true,
            orders: true,
            clients: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar tenants' });
  }
});

// ✅ ATIVAR/DESATIVAR TENANT
router.patch('/:id/toggle', masterAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const tenant = await prisma.tenant.findUnique({ where: { id } });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant não encontrado' });
    }

    const updated = await prisma.tenant.update({
      where: { id },
      data: { active: !tenant.active },
    });

    res.json({
      message: `Tenant ${updated.active ? 'ativado' : 'desativado'}`,
      tenant: updated,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tenant' });
  }
});

// ✅ ATUALIZAR PLANO DO TENANT
router.patch('/:id/plan', masterAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { plan, expiresAt } = req.body;

    const updated = await prisma.tenant.update({
      where: { id },
      data: {
        plan,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    res.json({
      message: 'Plano atualizado',
      tenant: updated,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar plano' });
  }
});

// ✅ DELETAR TENANT (CUIDADO!)
router.delete('/:id', masterAdminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Cascade vai deletar todos os dados relacionados
    await prisma.tenant.delete({ where: { id } });

    res.json({ message: 'Tenant deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tenant' });
  }
});

export default router;
