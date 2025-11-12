import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { ArrowLeft, Upload, ChevronDown, Plus, X, Camera } from "lucide-react";
import { useState } from "react";

const mockProducts = [
  { id: 1, name: "Detergente Líquido 500ml", price: 3.99 },
  { id: 2, name: "Sabão em Pó 1kg", price: 12.90 },
];

export function AddOrderScreen({ onBack }: { onBack: () => void }) {
  const [orderItems, setOrderItems] = useState<Array<{ id: number; name: string; price: number; qty: number }>>([]);
  const [sendReminder, setSendReminder] = useState(false);
  const [hasReceipt, setHasReceipt] = useState(false);
  
  const total = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Cadastrar Pedido</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="text-gray-500 text-sm mb-3">Cliente*</div>
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-3">
                <AvatarFallback className="bg-[#3B82F6] text-white">
                  MS
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-gray-900">Selecionar cliente</div>
                <div className="text-gray-500 text-sm">Toque para escolher</div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
        </Card>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-900">Itens do Pedido*</div>
            <button className="text-[#3B82F6] text-sm flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </button>
          </div>
          
          {orderItems.length === 0 ? (
            <Card className="p-6 rounded-xl border-0 shadow-sm text-center">
              <div className="text-gray-400 text-sm">Nenhum item adicionado</div>
              <div className="text-gray-400 text-xs mt-1">Clique em "Adicionar" para incluir produtos</div>
            </Card>
          ) : (
            <div className="space-y-2">
              {orderItems.map((item) => (
                <Card key={item.id} className="p-3 rounded-xl border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-gray-900 text-sm mb-1">{item.name}</div>
                      <div className="text-gray-500 text-sm">
                        {item.qty}x R$ {item.price.toFixed(2)}
                      </div>
                    </div>
                    <button className="ml-2">
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  <div className="text-[#3B82F6]">R$ {(item.price * item.qty).toFixed(2)}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="text-gray-900 mb-4">Foto da Nota/Recibo</div>
          {!hasReceipt ? (
            <button 
              onClick={() => setHasReceipt(true)}
              className="w-full h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300"
            >
              <Camera className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-500 text-sm">Tirar foto ou adicionar da galeria</span>
            </button>
          ) : (
            <div className="relative">
              <div className="w-full h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                <span className="text-gray-500">Foto da nota adicionada</span>
              </div>
              <button 
                onClick={() => setHasReceipt(false)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </Card>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="text-gray-900 mb-4">Forma de Pagamento*</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button className="p-3 border-2 border-[#3B82F6] bg-blue-50 rounded-xl text-[#3B82F6]">
              À Vista
            </button>
            <button className="p-3 border border-gray-200 rounded-xl text-gray-600">
              Parcelado
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input 
                id="dueDate" 
                type="date"
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentValue">Valor da Parcela (R$)</Label>
              <Input 
                id="paymentValue" 
                type="number"
                step="0.01"
                placeholder="0,00"
                className="rounded-xl"
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-gray-900">Lembrete Automático</div>
              <div className="text-gray-500 text-sm">Enviar mensagem antes do vencimento</div>
            </div>
            <Switch 
              checked={sendReminder}
              onCheckedChange={setSendReminder}
            />
          </div>
          
          {sendReminder && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="space-y-2">
                <Label htmlFor="reminderDays">Enviar lembrete quantos dias antes?</Label>
                <Input 
                  id="reminderDays" 
                  type="number"
                  placeholder="Ex: 3"
                  className="rounded-xl"
                />
                <div className="text-gray-400 text-xs">O cliente receberá uma mensagem X dias antes do vencimento</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminderMessage">Mensagem Personalizada</Label>
                <Textarea 
                  id="reminderMessage" 
                  placeholder="Ex: Olá! Lembramos que seu pagamento vence em 3 dias. Total: R$ 50,00"
                  className="rounded-xl min-h-24"
                  defaultValue="Olá! Lembramos que seu pagamento vence em breve."
                />
              </div>
            </div>
          )}
        </Card>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea 
              id="notes" 
              placeholder="Informações adicionais sobre o pedido..."
              className="rounded-xl min-h-20"
            />
          </div>
        </Card>
        
        <Card className="p-4 rounded-xl border-0 shadow-sm bg-gray-50">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600">Desconto</span>
            <span className="text-gray-900">R$ 0,00</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="text-gray-900">Total</span>
            <span className="text-[#3B82F6]">R$ {total.toFixed(2)}</span>
          </div>
        </Card>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Finalizar Pedido
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
