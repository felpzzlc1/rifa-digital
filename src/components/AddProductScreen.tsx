import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";
import { Card } from "./ui/card";

export function AddProductScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Cadastrar Produto</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="text-gray-900 mb-4">Foto do Produto</div>
          <button className="w-full h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm">Clique para adicionar foto</span>
          </button>
        </Card>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto*</Label>
            <Input 
              id="name" 
              placeholder="Ex: Detergente Líquido 500ml"
              className="rounded-xl"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)*</Label>
              <Input 
                id="price" 
                type="number"
                step="0.01"
                placeholder="0,00"
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Estoque*</Label>
              <Input 
                id="stock" 
                type="number"
                placeholder="0"
                className="rounded-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code">Código/SKU</Label>
            <Input 
              id="code" 
              placeholder="Ex: DET-500"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input 
              id="category" 
              placeholder="Ex: Limpeza"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              placeholder="Descreva o produto..."
              className="rounded-xl min-h-24"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Salvar Produto
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
