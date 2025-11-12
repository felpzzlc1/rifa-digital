import { Home, Package, FileText, Settings } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'catalog', icon: Package, label: 'Produtos' },
    { id: 'orders', icon: FileText, label: 'Pedidos' },
    { id: 'settings', icon: Settings, label: 'Config' },
  ];
  
  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center py-2 px-3 min-w-0"
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${isActive ? 'text-[#3B82F6]' : 'text-gray-400'}`}
              />
              <span className={`text-xs ${isActive ? 'text-[#3B82F6]' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
