import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const orders = [
  { id: "#1234", customer: "Maria Silva", date: "11/11/2025", total: 20.88, status: "pending" },
  { id: "#1233", customer: "José Santos", date: "10/11/2025", total: 45.90, status: "completed" },
  { id: "#1232", customer: "Ana Costa", date: "10/11/2025", total: 89.00, status: "completed" },
  { id: "#1231", customer: "Pedro Oliveira", date: "09/11/2025", total: 156.40, status: "cancelled" },
  { id: "#1230", customer: "Carla Souza", date: "09/11/2025", total: 234.50, status: "completed" },
];

const statusConfig = {
  pending: { label: "Pendente", color: "bg-orange-100 text-orange-700", icon: Clock },
  completed: { label: "Concluído", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: XCircle },
};

export function OrdersScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Pedidos</h1>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="bg-white px-4 pb-3 shadow-sm">
          <TabsList className="w-full grid grid-cols-3 bg-gray-100 rounded-xl">
            <TabsTrigger value="all" className="rounded-xl">Todos</TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">Pendentes</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-xl">Concluídos</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="flex-1 overflow-y-auto p-4 mt-0">
          <div className="space-y-3">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <Card key={order.id} className="p-4 rounded-xl border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-gray-900 mb-1">{order.id}</div>
                      <div className="text-gray-500 text-sm">{order.customer}</div>
                    </div>
                    <Badge className={`${status.color} hover:${status.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{order.date}</span>
                    <span className="text-[#3B82F6]">R$ {order.total.toFixed(2)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="flex-1 overflow-y-auto p-4 mt-0">
          <div className="space-y-3">
            {orders.filter(o => o.status === 'pending').map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <Card key={order.id} className="p-4 rounded-xl border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-gray-900 mb-1">{order.id}</div>
                      <div className="text-gray-500 text-sm">{order.customer}</div>
                    </div>
                    <Badge className={`${status.color} hover:${status.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{order.date}</span>
                    <span className="text-[#3B82F6]">R$ {order.total.toFixed(2)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="flex-1 overflow-y-auto p-4 mt-0">
          <div className="space-y-3">
            {orders.filter(o => o.status === 'completed').map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <Card key={order.id} className="p-4 rounded-xl border-0 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-gray-900 mb-1">{order.id}</div>
                      <div className="text-gray-500 text-sm">{order.customer}</div>
                    </div>
                    <Badge className={`${status.color} hover:${status.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{order.date}</span>
                    <span className="text-[#3B82F6]">R$ {order.total.toFixed(2)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
