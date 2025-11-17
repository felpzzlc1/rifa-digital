import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  category: z.string().optional(),
  barcode: z.string().optional(),
  supplierId: z.string().optional(),
});

// Listar produtos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { 
        tenantId: req.tenantId // ← Filtro por tenant
      },
      include: {
        supplier: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Buscar produto por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: { 
        id: req.params.id,
        tenantId: req.tenantId // ← Garantir que o produto pertence ao tenant
      },
      include: {
        supplier: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

// Criar produto
router.post('/', authMiddleware, async (req, res) => {
  try {
    const data = productSchema.parse(req.body);

    const product = await prisma.product.create({
      data: {
        ...data,
        tenantId: req.tenantId!, // ← Associar ao tenant do usuário
      },
      include: {
        supplier: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const data = productSchema.partial().parse(req.body);

    // Verificar se produto pertence ao tenant antes de atualizar
    const existing = await prisma.product.findFirst({
      where: { id: req.params.id, tenantId: req.tenantId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data,
      include: {
        supplier: true,
      },
    });

    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar produto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Verificar se produto pertence ao tenant antes de deletar
    const existing = await prisma.product.findFirst({
      where: { id: req.params.id, tenantId: req.tenantId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
