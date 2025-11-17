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
    const { email, password, name, empresaId } = req.body;

    // Verificar se empresa existe e está ativa
    const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } });
    if (!empresa || !empresa.ativa) {
      return res.status(400).json({ error: 'Empresa não encontrada ou inativa' });
    }

    const existingUser = await prisma.usuario.findFirst({
      where: { empresaId, email },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado nesta empresa' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        empresaId,
        email,
        senha: hashedPassword,
        nome: name,
      },
    });

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        empresaId: user.empresaId
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        empresaId: user.empresaId,
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

    const user = await prisma.usuario.findFirst({ 
      where: { email },
      include: { empresa: true }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar se empresa está ativa
    if (!user.empresa.ativa) {
      return res.status(401).json({ error: 'Empresa inativa. Entre em contato com o suporte.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        empresaId: user.empresaId
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        papel: user.papel,
        empresaId: user.empresaId,
        empresa: {
          id: user.empresa.id,
          nome: user.empresa.nome,
          slug: user.empresa.slug,
          plano: user.empresa.plano,
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
