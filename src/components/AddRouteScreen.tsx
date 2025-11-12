import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft } from "lucide-react";

export function AddRouteScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Cadastrar Rota</h1>
          <div className="w-6" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="routeName">Nome da Rota*</Label>
            <Input 
              id="routeName" 
              placeholder="Ex: Rota Centro"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routeColor">Cor de Identificação</Label>
            <div className="grid grid-cols-5 gap-2">
              <button className="w-full h-12 bg-blue-500 rounded-xl border-2 border-blue-700" />
              <button className="w-full h-12 bg-green-500 rounded-xl border-2 border-transparent" />
              <button className="w-full h-12 bg-purple-500 rounded-xl border-2 border-transparent" />
              <button className="w-full h-12 bg-orange-500 rounded-xl border-2 border-transparent" />
              <button className="w-full h-12 bg-red-500 rounded-xl border-2 border-transparent" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routeRegion">Região/Bairros</Label>
            <Input 
              id="routeRegion" 
              placeholder="Ex: Centro, República, Sé"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routeDays">Dias de Atendimento</Label>
            <div className="grid grid-cols-7 gap-1">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
                <button 
                  key={idx}
                  className={`h-10 rounded-lg ${idx === 1 ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routeNotes">Observações</Label>
            <Textarea 
              id="routeNotes" 
              placeholder="Informações adicionais sobre a rota..."
              className="rounded-xl min-h-24"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white space-y-2">
        <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl">
          Salvar Rota
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
