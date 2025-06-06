import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Package, Search, ArrowLeft, ShoppingCart, TrendingUp, Eye } from 'lucide-react';
import useFetchData from '../hooks/useFetchData';
import useSaveData from '../hooks/useSaveData';
import Title from '../components/Title';
import Button from '../components/Button';
import Card from '../components/Card';
import Message from '../components/Message';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';

function ProductInventory() {
  const navigate = useNavigate();
  const { productos, loading, error, refetch } = useFetchData();
  const { saveProduct, deleteProduct, saving } = useSaveData();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = productos.filter(product =>
    product?.producto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product?.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estadísticas
  const stats = {
    totalProducts: productos.length,
    totalValue: productos.reduce((sum, p) => sum + (p.precio * (p.stock || 0)), 0),
    lowStock: productos.filter(p => p.stock < 10).length,
    outOfStock: productos.filter(p => p.stock === 0).length
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateProduct = async (productData) => {
    try {
      await saveProduct(productData);
      showNotification('Producto creado exitosamente');
      setShowForm(false);
      refetch();
    } catch (error) {
      showNotification('Error al crear el producto', 'error');
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await saveProduct(productData, 'PUT', editingProduct.id);
      showNotification('Producto actualizado exitosamente');
      setEditingProduct(null);
      refetch();
    } catch (error) {
      showNotification('Error al actualizar el producto', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProduct(id);
        showNotification('Producto eliminado exitosamente');
        refetch();
      } catch (error) {
        showNotification('Error al eliminar el producto', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header minimalista */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
            <Title>Techno Market</Title>
              <p className="text-gray-600 mt-2">
                Sistema de gestión de inventario
              </p>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Notificaciones */}
        {notification && (
          <div className={`mb-6 p-4 rounded-xl shadow-lg animate-in slide-in-from-top duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              {notification.message}
            </div>
          </div>
        )}

        {/* Dashboard de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="w-10 h-10 text-gray-400" />
            </div>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-gray-400" />
            </div>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Stock Bajo</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
              </div>
              <Eye className="w-10 h-10 text-gray-400" />
            </div>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Sin Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
              </div>
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
          </Card>
        </div>

        {/* Barra de herramientas */}
        <Card className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos por nombre o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingProduct(null);
              }}
              variant="primary"
              disabled={saving}
              className="w-full lg:w-auto"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Agregar Producto
            </Button>
          </div>
        </Card>

        {/* Formularios */}
        {(showForm || editingProduct) && (
          <Card className="mb-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={() => editingProduct ? setEditingProduct(null) : setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <ProductForm
              onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
              initialData={editingProduct}
              onCancel={() => editingProduct ? setEditingProduct(null) : setShowForm(false)}
            />
          </Card>
        )}

        {/* Estado de carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Cargando inventario...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <Card className="mb-6">
            <Message type="error">
              <div className="flex flex-col items-center text-center py-6">
                <Package className="w-10 h-10 text-red-500 mb-3" />
                <h3 className="text-lg font-medium mb-1">Error al cargar los productos</h3>
                <p className="text-gray-600">{error}</p>
                <Button 
                  onClick={refetch} 
                  variant="secondary" 
                  size="sm" 
                  className="mt-4"
                >
                  Reintentar
                </Button>
              </div>
            </Message>
          </Card>
        )}

        {/* Lista de productos */}
        {!loading && !error && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
              </h3>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <Card className="py-12">
                <div className="flex flex-col items-center text-center">
                  <Package className="w-12 h-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    {searchTerm ? 'No hay coincidencias' : 'Inventario vacío'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? 'No encontramos productos que coincidan con tu búsqueda' 
                      : 'Comienza agregando tu primer producto'}
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    variant="primary"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Agregar Producto
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow duration-200 group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                          {product.producto}
                        </h3>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                          {product.categoria}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowForm(false);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Precio:</span>
                        <span className="font-medium text-gray-900">
                          ${product.precio}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Disponible:</span>
                        <span className={`font-medium ${
                          product.stock > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.stock} {product.stock === 1 ? 'unidad' : 'unidades'}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInventory;