import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight, ShoppingCart, BarChart3, Users } from 'lucide-react';
import Button from '../components/Button';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-6 rounded-full shadow-lg">
              <Package className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Bienvenido a Techno Market
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Tu sistema de gestión de inventario inteligente y eficiente para 
            administrar todos tus productos tecnológicos en un solo lugar.
          </p>
          
          <Button 
            onClick={() => navigate('/inventory')}
            variant="primary"
            size="lg"
          >
            Ir al Inventario
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestión Simple</h3>
            <p className="text-gray-600">
              Administra tu inventario de manera intuitiva con nuestra interfaz amigable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-green-100 p-3 rounded-full w-fit mb-4">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Control Total</h3>
            <p className="text-gray-600">
              Mantén un seguimiento detallado de stock, precios y categorías.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 p-3 rounded-full w-fit mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-gray-600">
              Diseñado para que cualquier persona pueda gestionar el inventario.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            ¿Por qué elegir Techno Market?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">En la nube</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600">Disponibilidad</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
              <p className="text-gray-600">Configuración requerida</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-600 mb-8">
            Empieza a gestionar tu inventario de manera profesional hoy mismo.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/inventory')}
              variant="primary"
              size="lg"
            >
              Acceder al Sistema
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;