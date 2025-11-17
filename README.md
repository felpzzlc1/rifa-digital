
  # 🎯 Rifa Digital

Sistema completo de gestão de vendas com catálogo de produtos, pedidos, clientes e rotas de vendedores.

## 🚀 Tecnologias

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

## 📦 Estrutura do Projeto

```
rifa-digital/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── lib/            # Configurações (Prisma)
│   │   ├── middlewares/    # Auth middleware
│   │   ├── routes/         # Rotas da API
│   │   └── server.ts       # Servidor Express
│   ├── prisma/
│   │   └── schema.prisma   # Schema do banco
│   ├── package.json
│   └── tsconfig.json
├── src/                     # Frontend React
│   ├── components/         # Componentes React
│   ├── styles/            # CSS global
│   └── App.tsx            # App principal
├── docker-compose.yml      # Orquestração Docker
├── Dockerfile             # Frontend container
└── DEPLOY.md              # Guia de deploy
```

## 🛠️ Instalação Local

### Pré-requisitos

- Node.js 20+
- PostgreSQL 16+ (ou Docker)
- Git

### 1. Clonar o Repositório

```bash
git clone https://github.com/felpzzlc1/rifa-digital.git
cd rifa-digital
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas configurações
# DATABASE_URL, JWT_SECRET, etc.

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev
```

### 3. Configurar Frontend

```bash
cd ..

# Instalar dependências
npm install
```

### 4. Rodar em Desenvolvimento

#### Backend (porta 3001)
```bash
cd backend
npm run dev
```

#### Frontend (porta 3000)
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🐳 Docker

### Rodar com Docker Compose

```bash
# Build e iniciar todos os serviços
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

Serviços:
- Frontend: http://localhost
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432

## 📚 API Endpoints

### Autenticação

```http
POST /api/auth/register
POST /api/auth/login
```

### Produtos

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Pedidos

```http
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id/status
```

## 🚀 Deploy no Railway

Siga o guia completo em [DEPLOY.md](./DEPLOY.md)

### Resumo Rápido:

1. Criar conta no Railway
2. Criar projeto e adicionar PostgreSQL
3. Adicionar serviço Backend (root: `backend/`)
4. Adicionar serviço Frontend (root: `/`)
5. Configurar variáveis de ambiente
6. Deploy automático! 🎉

## 🔐 Variáveis de Ambiente

### Backend (.env)

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
PORT=3001
NODE_ENV=production
JWT_SECRET=seu-secret-super-seguro
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

### Frontend

```env
VITE_API_URL=https://seu-backend.railway.app
```

## 🧪 Scripts Disponíveis

### Backend

```bash
npm run dev          # Desenvolvimento com tsx
npm run build        # Build TypeScript
npm start            # Produção
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Rodar migrations
```

### Frontend

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run serve        # Servir build com serve
```

## 📊 Banco de Dados

### Models Prisma

- **User**: Usuários do sistema
- **Product**: Produtos do catálogo
- **Client**: Clientes/compradores
- **Seller**: Vendedores
- **Supplier**: Fornecedores
- **Order**: Pedidos de venda
- **OrderItem**: Itens do pedido
- **Route**: Rotas de vendas
- **RouteClient**: Relação rota-cliente
- **RouteProduct**: Relação rota-produto

### Migrations

```bash
# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Resetar banco (cuidado!)
npx prisma migrate reset
```

## 🎨 Componentes UI

O projeto usa **shadcn/ui** com Tailwind CSS:

- Buttons, Cards, Inputs
- Dialogs, Dropdowns, Tooltips
- Tables, Tabs, Badges
- Charts (Recharts)
- E muito mais!

## 📱 Funcionalidades

- ✅ Login e Autenticação
- ✅ Dashboard com métricas
- ✅ Catálogo de produtos
- ✅ Gestão de pedidos
- ✅ Cadastro de clientes
- ✅ Cadastro de vendedores
- ✅ Cadastro de fornecedores
- ✅ Rotas de vendas
- ✅ Financeiro (contas a pagar/receber)
- ✅ Exportação de catálogo
- ✅ Modo responsivo mobile

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 👥 Autor

**felpzzlc1**
- GitHub: [@felpzzlc1](https://github.com/felpzzlc1)

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Unsplash](https://unsplash.com/) - Imagens
- [Lucide](https://lucide.dev/) - Ícones

---

**Feito com ❤️ e ☕**

  