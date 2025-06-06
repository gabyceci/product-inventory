import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight, ShoppingCart, BarChart3, Users, Sparkles, TrendingUp, Zap } from 'lucide-react';
import Button from '../components/Button';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/25 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 group">
                <Package className="w-20 h-20 text-white group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              Techno Market
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-lg font-semibold text-blue-600 tracking-wide">SISTEMA DE GESTIÓN AVANZADO</span>
            </div>
          </div>
          
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Tu sistema de gestión de inventario <span className="font-semibold text-blue-700">inteligente y eficiente</span> para 
            administrar todos tus productos tecnológicos en un solo lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => navigate('/inventory')}
              variant="primary"
              size="lg"
              className="group shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-12 py-4 text-xl font-semibold"
            >
              <Zap className="w-6 h-6 mr-3" />
              Ir al Inventario
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mb-24">
          <div className="group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Gestión Simple</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Administra tu inventario de manera intuitiva con nuestra interfaz amigable y moderna.
              </p>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Control Total</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Mantén un seguimiento detallado de stock, precios y categorías en tiempo real.
              </p>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Fácil de Usar</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Diseñado para que cualquier persona pueda gestionar el inventario sin complicaciones.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto mb-24 border border-white/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              ¿Por qué elegir Techno Market?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black">100%</div>
              </div>
              <p className="text-slate-600 text-xl font-semibold">En la nube</p>
              <p className="text-slate-500 mt-2">Acceso desde cualquier lugar</p>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black">24/7</div>
              </div>
              <p className="text-slate-600 text-xl font-semibold">Disponibilidad</p>
              <p className="text-slate-500 mt-2">Siempre funcionando</p>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-black">0</div>
              </div>
              <p className="text-slate-600 text-xl font-semibold">Configuración</p>
              <p className="text-slate-500 mt-2">Listo para usar</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-16 border border-white/50 shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-12 h-12 text-blue-600 mr-4" />
              <h2 className="text-5xl font-bold text-slate-800">¿Listo para comenzar?</h2>
            </div>
            
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empieza a gestionar tu inventario de manera profesional hoy mismo. 
              <span className="font-semibold text-blue-700"> Sin complicaciones, sin configuración compleja.</span>
            </p>
            
            <div className="flex gap-6 justify-center">
              <Button 
                onClick={() => navigate('/inventory')}
                variant="primary"
                size="lg"
                className="group shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-16 py-5 text-xl font-bold"
              >
                Acceder al Sistema
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
            
            <p className="text-slate-500 mt-8 text-sm">
              Comienza ahora mismo • Sin registro complicado • Interfaz intuitiva
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;