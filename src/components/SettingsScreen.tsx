import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, User, Bell, Lock, HelpCircle, LogOut, Moon } from "lucide-react";
import { useState } from "react";

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Configurações</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-4 rounded-xl border-0 shadow-sm mb-6">
          <div className="flex items-center">
            <Avatar className="w-16 h-16 mr-4">
              <AvatarFallback className="bg-[#3B82F6] text-white text-xl">
                JS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-gray-900 mb-1">João Silva</div>
              <div className="text-gray-500 text-sm">joao@email.com</div>
              <div className="text-[#3B82F6] text-sm mt-1">Editar perfil</div>
            </div>
          </div>
        </Card>
        
        <div className="mb-4">
          <div className="text-gray-500 text-sm mb-3 px-1">Preferências</div>
          <Card className="rounded-xl border-0 shadow-sm overflow-hidden">
            <button className="w-full p-4 flex items-center hover:bg-gray-50">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                <Moon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">Tema Escuro</div>
                <div className="text-gray-500 text-sm">Ativar modo noturno</div>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </button>
            
            <div className="border-t border-gray-100" />
            
            <button className="w-full p-4 flex items-center hover:bg-gray-50">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">Notificações</div>
                <div className="text-gray-500 text-sm">Gerenciar alertas</div>
              </div>
            </button>
          </Card>
        </div>
        
        <div className="mb-4">
          <div className="text-gray-500 text-sm mb-3 px-1">Conta</div>
          <Card className="rounded-xl border-0 shadow-sm overflow-hidden">
            <button className="w-full p-4 flex items-center hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">Dados Pessoais</div>
              </div>
            </button>
            
            <div className="border-t border-gray-100" />
            
            <button className="w-full p-4 flex items-center hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">Segurança</div>
              </div>
            </button>
          </Card>
        </div>
        
        <div className="mb-4">
          <div className="text-gray-500 text-sm mb-3 px-1">Suporte</div>
          <Card className="rounded-xl border-0 shadow-sm overflow-hidden">
            <button className="w-full p-4 flex items-center hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-gray-900">Central de Ajuda</div>
              </div>
            </button>
          </Card>
        </div>
        
        <Card className="rounded-xl border-0 shadow-sm overflow-hidden">
          <button className="w-full p-4 flex items-center hover:bg-gray-50">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-red-600">Sair da Conta</div>
            </div>
          </button>
        </Card>
      </div>
    </div>
  );
}
