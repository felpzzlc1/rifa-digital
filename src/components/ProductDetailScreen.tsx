import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

export function ProductDetailScreen({ onBack }: { onBack: () => void }) {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Produto</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&h=300&fit=crop"
            alt="Detergente"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">Detergente Líquido 500ml</h2>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Estoque: 45 unidades
              </Badge>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="text-gray-500 text-sm mb-1">Preço unitário</div>
            <div className="text-[#3B82F6]">R$ 3,99</div>
          </div>
          
          <div className="mb-6">
            <div className="text-gray-900 mb-3">Descrição</div>
            <p className="text-gray-600">
              Detergente líquido concentrado com alta eficiência na remoção de gorduras. 
              Fórmula biodegradável e suave para as mãos.
            </p>
          </div>
          
          <div className="mb-6">
            <div className="text-gray-900 mb-3">Quantidade</div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <Minus className="w-5 h-5 text-gray-900" />
              </button>
              <div className="text-gray-900 w-12 text-center">{quantity}</div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">Total</span>
          <span className="text-[#3B82F6]">R$ {(3.99 * quantity).toFixed(2)}</span>
        </div>
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Adicionar ao Pedido
        </Button>
      </div>
    </div>
  );
}
