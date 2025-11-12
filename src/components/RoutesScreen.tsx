import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Plus, MapPin, Package } from "lucide-react";

const routes = [
  { id: 1, name: "Rota Centro", clients: 15, products: 45, color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Rota Zona Norte", clients: 23, products: 67, color: "bg-green-100 text-green-700" },
  { id: 3, name: "Rota Zona Sul", clients: 18, products: 52, color: "bg-purple-100 text-purple-700" },
  { id: 4, name: "Rota Zona Leste", clients: 12, products: 38, color: "bg-orange-100 text-orange-700" },
];

export function RoutesScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (screen: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Rotas de Vendas</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {routes.map((route) => (
            <Card 
              key={route.id} 
              onClick={() => onNavigate('route-products')}
              className="p-4 rounded-xl border-0 shadow-sm cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center flex-1">
                  <div className={`w-12 h-12 ${route.color} rounded-xl flex items-center justify-center mr-3`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">{route.name}</div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">{route.clients} clientes</span>
                      <span className="text-gray-500">{route.products} produtos</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <Button 
          onClick={() => onNavigate('add-route')}
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Rota
        </Button>
      </div>
    </div>
  );
}
