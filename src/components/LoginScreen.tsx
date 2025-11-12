import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Package } from "lucide-react";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center">
            <Package className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-center mb-2 text-gray-900">VendaFácil</h1>
        <p className="text-center text-gray-500 mb-12">Vendas porta a porta</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="seu@email.com"
              className="rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              className="rounded-xl"
            />
          </div>
          
          <Button 
            onClick={onLogin}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl mt-6"
          >
            Entrar
          </Button>
          
          <button className="w-full text-[#3B82F6] text-center py-2">
            Esqueci minha senha
          </button>
        </div>
      </div>
      
      <p className="text-center text-gray-400 text-sm mt-8">
        Versão 1.0.0
      </p>
    </div>
  );
}
