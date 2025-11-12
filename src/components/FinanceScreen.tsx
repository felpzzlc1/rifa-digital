import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const receivables = [
  { id: 1, customer: "Maria Silva", date: "15/11/2025", amount: 125.00, overdue: false, hasReminder: true },
  { id: 2, customer: "Ana Costa", date: "12/11/2025", amount: 89.00, overdue: false, hasReminder: true },
  { id: 3, customer: "Carla Souza", date: "08/11/2025", amount: 234.50, overdue: true, hasReminder: false },
  { id: 4, customer: "José Santos", date: "20/11/2025", amount: 156.00, overdue: false, hasReminder: true },
];

const payables = [
  { id: 1, supplier: "Fornecedor ABC Ltda", date: "20/11/2025", amount: 1250.00, overdue: false, discount: 5 },
  { id: 2, supplier: "Distribuidora XYZ", date: "05/11/2025", amount: 890.00, overdue: true, discount: 3 },
  { id: 3, supplier: "Atacado São Paulo", date: "25/11/2025", amount: 2340.00, overdue: false, discount: 7 },
];

export function FinanceScreen({ onBack }: { onBack: () => void }) {
  const totalReceivable = receivables.reduce((sum, item) => sum + item.amount, 0);
  const totalPayable = payables.reduce((sum, item) => sum + item.amount, 0);
  const totalOverdueReceivable = receivables.filter(r => r.overdue).reduce((sum, item) => sum + item.amount, 0);
  const totalOverduePayable = payables.filter(p => p.overdue).reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Financeiro</h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card className="p-4 rounded-2xl border-0 shadow-sm bg-green-50 border border-green-100">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-700 text-sm">A Receber</span>
            </div>
            <div className="text-green-900 mb-1">R$ {totalReceivable.toFixed(2)}</div>
            {totalOverdueReceivable > 0 && (
              <div className="text-red-600 text-xs">Vencido: R$ {totalOverdueReceivable.toFixed(2)}</div>
            )}
          </Card>
          
          <Card className="p-4 rounded-2xl border-0 shadow-sm bg-red-50 border border-red-100">
            <div className="flex items-center mb-2">
              <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">A Pagar</span>
            </div>
            <div className="text-red-900 mb-1">R$ {totalPayable.toFixed(2)}</div>
            {totalOverduePayable > 0 && (
              <div className="text-red-700 text-xs">Vencido: R$ {totalOverduePayable.toFixed(2)}</div>
            )}
          </Card>
        </div>
        
        <Card className="p-4 rounded-2xl border-0 shadow-sm bg-blue-50 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-blue-700 text-sm mb-1">Saldo Projetado</div>
              <div className="text-blue-900">R$ {(totalReceivable - totalPayable).toFixed(2)}</div>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="receivable" className="flex-1 flex flex-col">
        <div className="px-4 pb-3">
          <TabsList className="w-full grid grid-cols-2 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="receivable" className="rounded-xl">A Receber</TabsTrigger>
            <TabsTrigger value="payable" className="rounded-xl">A Pagar</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="receivable" className="flex-1 overflow-y-auto px-4 mt-0">
          <div className="space-y-3">
            {receivables.map((item) => (
              <Card key={item.id} className="p-4 rounded-xl border-0 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-gray-900 mb-1">{item.customer}</div>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      Vencimento: {item.date}
                    </div>
                    {item.hasReminder && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        Lembrete agendado
                      </Badge>
                    )}
                  </div>
                  {item.overdue && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Vencido
                    </Badge>
                  )}
                </div>
                <div className="text-green-600">R$ {item.amount.toFixed(2)}</div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="payable" className="flex-1 overflow-y-auto px-4 mt-0">
          <div className="space-y-3">
            {payables.map((item) => (
              <Card key={item.id} className="p-4 rounded-xl border-0 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-gray-900 mb-1">{item.supplier}</div>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      Vencimento: {item.date}
                    </div>
                    {item.discount > 0 && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Desconto: {item.discount}% por antecipação
                      </Badge>
                    )}
                  </div>
                  {item.overdue && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Vencido
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-red-600">R$ {item.amount.toFixed(2)}</div>
                  {item.discount > 0 && (
                    <div className="text-green-600 text-sm">
                      R$ {(item.amount * (1 - item.discount / 100)).toFixed(2)}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
