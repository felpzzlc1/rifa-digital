import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ArrowLeft, Download, Share2, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

const products = [
  { id: 1, name: "Detergente Líquido 500ml", price: 3.99, stock: 45, selected: true },
  { id: 2, name: "Sabão em Pó 1kg", price: 12.90, stock: 23, selected: true },
  { id: 3, name: "Amaciante Roupa 2L", price: 15.50, stock: 18, selected: false },
  { id: 4, name: "Esponja Multiuso (Pct 3)", price: 5.99, stock: 67, selected: true },
  { id: 5, name: "Papel Higiênico (Pct 12)", price: 18.90, stock: 12, selected: false },
];

export function ExportCatalogScreen({ onBack }: { onBack: () => void }) {
  const [includeStock, setIncludeStock] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(products.filter(p => p.selected));
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Exportar Catálogo</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4 bg-blue-50 border border-blue-100">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-blue-900 mb-1">Compartilhe com seus clientes</div>
              <div className="text-blue-700 text-sm">
                Gere um catálogo atualizado com preços e estoque para enviar aos seus clientes
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="text-gray-900 mb-4">Opções de Exportação</div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900">Incluir Fotos</div>
                <div className="text-gray-500 text-sm">Imagens dos produtos</div>
              </div>
              <Switch 
                checked={includeImages}
                onCheckedChange={setIncludeImages}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900">Incluir Estoque</div>
                <div className="text-gray-500 text-sm">Quantidade disponível</div>
              </div>
              <Switch 
                checked={includeStock}
                onCheckedChange={setIncludeStock}
              />
            </div>
          </div>
        </Card>
        
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div className="text-gray-900">Produtos Selecionados</div>
            <Badge className="bg-[#3B82F6] text-white">
              {selectedProducts.length} de {products.length}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {products.map((product) => (
            <Card key={product.id} className={`p-3 rounded-xl border shadow-sm ${product.selected ? 'border-[#3B82F6] bg-blue-50' : 'border-0'}`}>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 overflow-hidden flex-shrink-0">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=100&h=100&fit=crop"
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 text-sm mb-1 truncate">{product.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#3B82F6] text-sm">R$ {product.price.toFixed(2)}</span>
                    {includeStock && (
                      <span className="text-gray-500 text-xs">Estoque: {product.stock}</span>
                    )}
                  </div>
                </div>
                {product.selected && (
                  <CheckCircle className="w-5 h-5 text-[#3B82F6] ml-2 flex-shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm">
          <div className="text-gray-900 mb-3">Formatos Disponíveis</div>
          <div className="space-y-2">
            <button className="w-full p-3 bg-gray-50 rounded-xl text-left flex items-center justify-between hover:bg-gray-100">
              <div>
                <div className="text-gray-900">PDF para WhatsApp</div>
                <div className="text-gray-500 text-sm">Ideal para enviar por mensagem</div>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-3 bg-gray-50 rounded-xl text-left flex items-center justify-between hover:bg-gray-100">
              <div>
                <div className="text-gray-900">Link de Catálogo Online</div>
                <div className="text-gray-500 text-sm">Página web compartilhável</div>
              </div>
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full p-3 bg-gray-50 rounded-xl text-left flex items-center justify-between hover:bg-gray-100">
              <div>
                <div className="text-gray-900">Planilha Excel</div>
                <div className="text-gray-500 text-sm">Para edição e impressão</div>
              </div>
              <Download className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </Card>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          <Share2 className="w-5 h-5 mr-2" />
          Gerar e Compartilhar
        </Button>
        <Button 
          onClick={onBack}
          variant="outline" 
          className="w-full rounded-xl"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
