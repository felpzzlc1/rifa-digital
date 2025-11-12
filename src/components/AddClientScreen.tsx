import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft } from "lucide-react";

export function AddClientScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Cadastrar Cliente</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Nome Completo*</Label>
            <Input 
              id="clientName" 
              placeholder="Ex: Maria Silva Santos"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input 
              id="cpf" 
              placeholder="000.000.000-00"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone*</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="(00) 00000-0000"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email"
              placeholder="cliente@email.com"
              className="rounded-xl"
            />
          </div>
          
          <div className="text-gray-900 mt-6 mb-2">Endereço</div>
          
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input 
              id="cep" 
              placeholder="00000-000"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="street">Rua</Label>
            <Input 
              id="street" 
              placeholder="Nome da rua"
              className="rounded-xl"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input 
                id="number" 
                placeholder="123"
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input 
                id="complement" 
                placeholder="Apto 45"
                className="rounded-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input 
              id="neighborhood" 
              placeholder="Nome do bairro"
              className="rounded-xl"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input 
                id="city" 
                placeholder="São Paulo"
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input 
                id="state" 
                placeholder="SP"
                className="rounded-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea 
              id="notes" 
              placeholder="Informações adicionais..."
              className="rounded-xl min-h-20"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Salvar Cliente
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
