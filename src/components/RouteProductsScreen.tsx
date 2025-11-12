import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  { id: 1, name: "Detergente Líquido 500ml", price: 3.99, stock: 45, assigned: true },
  { id: 2, name: "Sabão em Pó 1kg", price: 12.90, stock: 23, assigned: true },
  { id: 3, name: "Amaciante Roupa 2L", price: 15.50, stock: 18, assigned: false },
  { id: 4, name: "Esponja Multiuso (Pct 3)", price: 5.99, stock: 67, assigned: true },
];

export function RouteProductsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900">Rota Centro</h1>
            <p className="text-gray-500 text-sm">Produtos disponíveis</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Buscar produtos..." 
            className="pl-10 rounded-xl border-gray-200"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id} className="p-3 rounded-xl border-0 shadow-sm">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl mr-3 overflow-hidden flex-shrink-0">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=100&h=100&fit=crop"
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 text-sm mb-1 truncate">{product.name}</div>
                  <div className="text-[#3B82F6] mb-1">R$ {product.price.toFixed(2)}</div>
                  <div className="text-gray-500 text-xs">Estoque: {product.stock}</div>
                </div>
                <Badge 
                  className={`ml-2 ${product.assigned ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  {product.assigned ? 'Na rota' : 'Disponível'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Produtos à Rota
        </Button>
      </div>
    </div>
  );
}
