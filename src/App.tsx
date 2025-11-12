import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ProductCatalogScreen } from './components/ProductCatalogScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { AddProductScreen } from './components/AddProductScreen';
import { AddClientScreen } from './components/AddClientScreen';
import { AddSellerScreen } from './components/AddSellerScreen';
import { AddOrderScreen } from './components/AddOrderScreen';
import { AddSupplierScreen } from './components/AddSupplierScreen';
import { RoutesScreen } from './components/RoutesScreen';
import { AddRouteScreen } from './components/AddRouteScreen';
import { RouteProductsScreen } from './components/RouteProductsScreen';
import { FinanceScreen } from './components/FinanceScreen';
import { ExportCatalogScreen } from './components/ExportCatalogScreen';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  
  if (!isLoggedIn) {
    return (
      <div className="w-[360px] h-[800px] mx-auto bg-white shadow-2xl overflow-hidden">
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case 'catalog':
        return <ProductCatalogScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'product-detail':
        return <ProductDetailScreen onBack={() => setCurrentScreen('catalog')} />;
      case 'orders':
        return <OrdersScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'add-product':
        return <AddProductScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'add-client':
        return <AddClientScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'add-seller':
        return <AddSellerScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'add-supplier':
        return <AddSupplierScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'add-order':
        return <AddOrderScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'routes':
        return <RoutesScreen onBack={() => setCurrentScreen('dashboard')} onNavigate={setCurrentScreen} />;
      case 'add-route':
        return <AddRouteScreen onBack={() => setCurrentScreen('routes')} />;
      case 'route-products':
        return <RouteProductsScreen onBack={() => setCurrentScreen('routes')} />;
      case 'finance':
        return <FinanceScreen onBack={() => setCurrentScreen('dashboard')} />;
      case 'export-catalog':
        return <ExportCatalogScreen onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };
  
  return (
    <div className="w-[360px] h-[800px] mx-auto bg-white shadow-2xl overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <BottomNav 
        active={currentScreen} 
        onNavigate={setCurrentScreen}
      />
    </div>
  );
}
