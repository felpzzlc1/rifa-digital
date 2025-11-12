import { Card } from "./ui/card";
import { DollarSign, AlertCircle, Package, FileText, TrendingUp, UserPlus, PackagePlus, Users, ShoppingCart, MapPin, Truck, Share2 } from "lucide-react";

export function DashboardScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-[#3B82F6] text-white p-6 pb-8 rounded-b-3xl">
        <h1 className="mb-1">Olá, João</h1>
        <p className="text-blue-100">Terça, 11 de Novembro</p>
      </div>
      
      <div className="flex-1 p-4 -mt-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 rounded-2xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="text-gray-500 text-sm">Vendas Hoje</div>
            <div className="text-gray-900 mt-1">R$ 1.245,00</div>
          </Card>
          
          <Card className="p-4 rounded-2xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-gray-500 text-sm">Meta do Mês</div>
            <div className="text-gray-900 mt-1">68%</div>
          </Card>
          
          <Card className="p-4 rounded-2xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-gray-500 text-sm">Pedidos</div>
            <div className="text-gray-900 mt-1">12</div>
          </Card>
          
          <Card className="p-4 rounded-2xl border-0 shadow-sm bg-red-50 border border-red-100">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-red-700 text-sm">Pendências</div>
            <div className="text-red-900 mt-1">3</div>
          </Card>
        </div>
        
        <div className="mb-4">
          <h2 className="text-gray-900 mb-3">Atalhos</h2>
          <div className="space-y-2">
            <Card 
              onClick={() => onNavigate('add-order')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <ShoppingCart className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Novo Pedido</div>
                <div className="text-gray-500 text-sm">Cadastrar nova venda</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('catalog')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Catálogo de Produtos</div>
                <div className="text-gray-500 text-sm">Ver produtos disponíveis</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('orders')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Meus Pedidos</div>
                <div className="text-gray-500 text-sm">Ver histórico de vendas</div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-gray-900 mb-3">Gestão</h2>
          <div className="space-y-2">
            <Card 
              onClick={() => onNavigate('finance')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Financeiro</div>
                <div className="text-gray-500 text-sm">Contas a pagar e receber</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('routes')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Rotas de Vendas</div>
                <div className="text-gray-500 text-sm">Gerenciar rotas e produtos</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('export-catalog')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mr-3">
                <Share2 className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Exportar Catálogo</div>
                <div className="text-gray-500 text-sm">Compartilhar com clientes</div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-gray-900 mb-3">Cadastros</h2>
          <div className="space-y-2">
            <Card 
              onClick={() => onNavigate('add-product')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                <PackagePlus className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Cadastrar Produto</div>
                <div className="text-gray-500 text-sm">Adicionar novo produto</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('add-client')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
                <UserPlus className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Cadastrar Cliente</div>
                <div className="text-gray-500 text-sm">Adicionar novo cliente</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('add-seller')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Cadastrar Vendedor</div>
                <div className="text-gray-500 text-sm">Adicionar novo vendedor</div>
              </div>
            </Card>
            
            <Card 
              onClick={() => onNavigate('add-supplier')}
              className="p-4 rounded-xl border-0 shadow-sm flex items-center cursor-pointer hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
                <Truck className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900">Cadastrar Fornecedor</div>
                <div className="text-gray-500 text-sm">Adicionar novo fornecedor</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
