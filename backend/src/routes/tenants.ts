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
  plan: z.enum(['basico', 'premium', 'enterprise']).default('basico'),
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
    const existingTenant = await prisma.empresa.findUnique({
      where: { slug: data.companySlug },
    });

    if (existingTenant) {
      return res.status(400).json({ error: 'Slug já existe. Use outro identificador.' });
    }

    // Verificar se email do admin já existe (global)
    const existingUser = await prisma.usuario.findFirst({
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
      const empresa = await tx.empresa.create({
        data: {
          nome: data.companyName,
          slug: data.companySlug,
          documento: data.companyDocument,
          email: data.companyEmail,
          telefone: data.companyPhone,
          plano: data.plan,
          expiraEm: data.expiresAt ? new Date(data.expiresAt) : null,
          ativa: true,
        },
      });

      // 2. Criar Admin do Tenant
      const admin = await tx.usuario.create({
        data: {
          empresaId: empresa.id,
          email: data.adminEmail,
          senha: hashedPassword,
          nome: data.adminName,
          papel: 'admin',
        },
      });

      return { empresa, admin };
    });

    res.status(201).json({
      message: 'Tenant criado com sucesso!',
      tenant: {
        id: result.empresa.id,
        nome: result.empresa.nome,
        slug: result.empresa.slug,
        plano: result.empresa.plano,
        ativa: result.empresa.ativa,
      },
      admin: {
        id: result.admin.id,
        nome: result.admin.nome,
        email: result.admin.email,
        papel: result.admin.papel,
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
    const tenants = await prisma.empresa.findMany({
      include: {
        _count: {
          select: {
            usuarios: true,
            produtos: true,
            pedidos: true,
            clientes: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
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

    const tenant = await prisma.empresa.findUnique({ where: { id } });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant não encontrado' });
    }

    const updated = await prisma.empresa.update({
      where: { id },
      data: { ativa: !tenant.ativa },
    });

    res.json({
      message: `Tenant ${updated.ativa ? 'ativado' : 'desativado'}`,
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

    const updated = await prisma.empresa.update({
      where: { id },
      data: {
        plano: plan,
        expiraEm: expiresAt ? new Date(expiresAt) : null,
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
    await prisma.empresa.delete({ where: { id } });

    res.json({ message: 'Tenant deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tenant' });
  }
});

export default router;
