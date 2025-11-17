import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../lib/prisma';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, tenantId } = req.body;

    // Verificar se tenant existe e está ativo
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant || !tenant.active) {
      return res.status(400).json({ error: 'Empresa não encontrada ou inativa' });
    }

    const existingUser = await prisma.user.findFirst({
      where: { tenantId, email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado nesta empresa' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        tenantId,
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        tenantId: user.tenantId  // ← NOVO!
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId,
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({ 
      where: { email },
      include: { tenant: true }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar se tenant está ativo
    if (!user.tenant.active) {
      return res.status(401).json({ error: 'Empresa inativa. Entre em contato com o suporte.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        tenantId: user.tenantId  // ← NOVO!
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          slug: user.tenant.slug,
          plan: user.tenant.plan,
        }
      },
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

export default router;
