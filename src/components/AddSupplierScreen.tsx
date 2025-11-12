import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft } from "lucide-react";

export function AddSupplierScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Cadastrar Fornecedor</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplierName">Nome do Fornecedor*</Label>
            <Input 
              id="supplierName" 
              placeholder="Ex: Distribuidora ABC Ltda"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input 
              id="cnpj" 
              placeholder="00.000.000/0000-00"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supplierPhone">Telefone*</Label>
            <Input 
              id="supplierPhone" 
              type="tel"
              placeholder="(00) 0000-0000"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supplierEmail">E-mail</Label>
            <Input 
              id="supplierEmail" 
              type="email"
              placeholder="fornecedor@email.com"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Pessoa de Contato</Label>
            <Input 
              id="contact" 
              placeholder="Nome do responsável"
              className="rounded-xl"
            />
          </div>
          
          <div className="text-gray-900 mt-6 mb-2">Condições de Pagamento</div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentTerm">Prazo de Pagamento (dias)</Label>
            <Input 
              id="paymentTerm" 
              type="number"
              placeholder="Ex: 30"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount">Desconto por Antecipação (%)</Label>
            <Input 
              id="discount" 
              type="number"
              step="0.01"
              placeholder="Ex: 5.00"
              className="rounded-xl"
            />
            <div className="text-gray-400 text-xs">Desconto oferecido pelo fornecedor ao pagar antes do vencimento</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="minOrder">Pedido Mínimo (R$)</Label>
            <Input 
              id="minOrder" 
              type="number"
              step="0.01"
              placeholder="0,00"
              className="rounded-xl"
            />
          </div>
          
          <div className="text-gray-900 mt-6 mb-2">Endereço</div>
          
          <div className="space-y-2">
            <Label htmlFor="supplierAddress">Endereço Completo</Label>
            <Input 
              id="supplierAddress" 
              placeholder="Rua, número, bairro"
              className="rounded-xl"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="supplierCity">Cidade</Label>
              <Input 
                id="supplierCity" 
                placeholder="São Paulo"
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplierState">Estado</Label>
              <Input 
                id="supplierState" 
                placeholder="SP"
                className="rounded-xl"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supplierNotes">Observações</Label>
            <Textarea 
              id="supplierNotes" 
              placeholder="Informações adicionais sobre o fornecedor..."
              className="rounded-xl min-h-20"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Salvar Fornecedor
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
