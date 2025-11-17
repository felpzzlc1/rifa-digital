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
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
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
      data,
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
    await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
