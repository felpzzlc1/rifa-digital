import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

const productSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
  preco: z.number().positive(),
  estoque: z.number().int().min(0),
  categoria: z.string().optional(),
  codigoBarras: z.string().optional(),
  fornecedorId: z.string().optional(),
});

// Listar produtos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await prisma.produto.findMany({
      where: { 
        empresaId: req.empresaId
      },
      include: {
        fornecedor: true,
      },
      orderBy: {
        nome: 'asc',
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
    const product = await prisma.produto.findFirst({
      where: { 
        id: req.params.id,
        empresaId: req.empresaId
      },
      include: {
        fornecedor: true,
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

    const product = await prisma.produto.create({
      data: {
        ...data,
        empresaId: req.empresaId!,
      },
      include: {
        fornecedor: true,
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

    const existing = await prisma.produto.findFirst({
      where: { id: req.params.id, empresaId: req.empresaId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const product = await prisma.produto.update({
      where: { id: req.params.id },
      data,
      include: {
        fornecedor: true,
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
    const existing = await prisma.produto.findFirst({
      where: { id: req.params.id, empresaId: req.empresaId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await prisma.produto.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
