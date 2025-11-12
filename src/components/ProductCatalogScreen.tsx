import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  { id: 1, name: "Detergente Líquido 500ml", price: 3.99, stock: 45, image: "cleaning supplies" },
  { id: 2, name: "Sabão em Pó 1kg", price: 12.90, stock: 23, image: "laundry detergent" },
  { id: 3, name: "Amaciante Roupa 2L", price: 15.50, stock: 18, image: "fabric softener" },
  { id: 4, name: "Esponja Multiuso (Pct 3)", price: 5.99, stock: 67, image: "kitchen sponge" },
  { id: 5, name: "Papel Higiênico (Pct 12)", price: 18.90, stock: 12, image: "toilet paper" },
  { id: 6, name: "Desinfetante 2L", price: 8.90, stock: 34, image: "disinfectant" },
];

export function ProductCatalogScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Catálogo</h1>
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
            <Card key={product.id} className="p-3 rounded-xl border-0 shadow-sm flex items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-xl mr-3 overflow-hidden flex-shrink-0">
                <ImageWithFallback 
                  src={`https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=100&h=100&fit=crop`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 text-sm mb-1 truncate">{product.name}</div>
                <div className="text-[#3B82F6] mb-1">R$ {product.price.toFixed(2)}</div>
                <Badge 
                  variant={product.stock > 20 ? "default" : "secondary"}
                  className={`text-xs ${product.stock > 20 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} hover:${product.stock > 20 ? 'bg-green-100' : 'bg-orange-100'}`}
                >
                  Estoque: {product.stock}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
