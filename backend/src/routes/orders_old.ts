import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middlewares/auth';

const router = Router();

const orderSchema = z.object({
  clientId: z.string(),
  sellerId: z.string().optional(),
  paymentMethod: z.string(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});

// Listar pedidos
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        tenantId: req.tenantId, // ← Filtro por tenant
      },
      include: {
        client: true,
        seller: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
});

// Buscar pedido por ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId, // ← Garantir que o pedido pertence ao tenant
      },
      include: {
        client: true,
        seller: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
});

// Criar pedido
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const data = orderSchema.parse(req.body);

    // Calcular total
    let total = 0;
    const items = data.items.map((item) => {
      const subtotal = item.quantity * item.price;
      total += subtotal;
      return {
        ...item,
        subtotal,
      };
    });

    // Gerar número do pedido (por tenant)
    const orderCount = await prisma.order.count({
      where: { tenantId: req.tenantId },
    });
    const orderNumber = `PED${String(orderCount + 1).padStart(6, '0')}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        tenantId: req.tenantId!, // ← Associar ao tenant
        userId: req.userId!,
        clientId: data.clientId,
        sellerId: data.sellerId,
        paymentMethod: data.paymentMethod,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        notes: data.notes,
        total,
        items: {
          create: items,
        },
      },
      include: {
        client: true,
        seller: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Atualizar status do pedido
router.patch('/:id/status', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;

    // Verificar se pedido pertence ao tenant antes de atualizar
    const existing = await prisma.order.findFirst({
      where: { id: req.params.id, tenantId: req.tenantId },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        client: true,
        seller: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
});

export default router;
