import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { Card } from "./ui/card";

export function AddSellerScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Cadastrar Vendedor</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="text-gray-900 mb-4">Foto do Vendedor</div>
          <button className="w-full h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm">Clique para adicionar foto</span>
          </button>
        </Card>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sellerName">Nome Completo*</Label>
            <Input 
              id="sellerName" 
              placeholder="Ex: João Pedro Silva"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sellerCpf">CPF*</Label>
            <Input 
              id="sellerCpf" 
              placeholder="000.000.000-00"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sellerPhone">Telefone*</Label>
            <Input 
              id="sellerPhone" 
              type="tel"
              placeholder="(00) 00000-0000"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sellerEmail">E-mail*</Label>
            <Input 
              id="sellerEmail" 
              type="email"
              placeholder="vendedor@email.com"
              className="rounded-xl"
            />
          </div>
          
          <div className="text-gray-900 mt-6 mb-2">Dados de Acesso</div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Usuário/Login*</Label>
            <Input 
              id="username" 
              placeholder="Ex: joao.silva"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha Inicial*</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="••••••••"
              className="rounded-xl"
            />
          </div>
          
          <div className="text-gray-900 mt-6 mb-2">Informações de Vendas</div>
          
          <div className="space-y-2">
            <Label htmlFor="commission">Comissão (%)</Label>
            <Input 
              id="commission" 
              type="number"
              step="0.01"
              placeholder="Ex: 5.00"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Meta Mensal (R$)</Label>
            <Input 
              id="goal" 
              type="number"
              step="0.01"
              placeholder="Ex: 10000.00"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Região/Área</Label>
            <Input 
              id="region" 
              placeholder="Ex: Zona Norte"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Salvar Vendedor
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
