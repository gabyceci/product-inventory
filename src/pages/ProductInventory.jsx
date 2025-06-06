import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Package, Search } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-8">

        <div className="mb-8 flex justify-between items-center">
          <div>
            <Title>Techno Market - Inventario de Productos</Title>
            <p className="text-gray-600 mt-2">
              Sistema de gestión de inventario
            </p>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            size="sm"
          >
            Volver al Inicio
          </Button>
        </div>

        {/* Notificaciones */}
        {notification && (
          <div className="mb-4">
            <Message type={notification.type}>{notification.message}</Message>
          </div>
        )}

        {/* Barra de herramientas */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            onClick={() => setShowForm(true)}
            variant="primary"
            disabled={saving}
          >
            <PlusCircle className="w-5 h-5 mr-2 inline" />
            Agregar Producto
          </Button>
        </div>

        {/* Formulario de creación */}
        {showForm && (
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Nuevo Producto</h2>
            <ProductForm
              onSubmit={handleCreateProduct}
              onCancel={() => setShowForm(false)}
            />
          </Card>
        )}

        {/* Formulario de edición */}
        {editingProduct && (
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
            <ProductForm
              onSubmit={handleUpdateProduct}
              initialData={editingProduct}
              onCancel={() => setEditingProduct(null)}
            />
          </Card>
        )}

        {/* Lista de productos */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Cargando productos...</p>
          </div>
        ) : error ? (
          <Message type="error">
            Error al cargar los productos: {error}
          </Message>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <Package className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">
                  {searchTerm ? 'No se encontraron productos' : 'No hay productos en el inventario'}
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.producto}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Categoría: {product.categoria}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        disabled={saving}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        disabled={saving}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio:</span>
                      <span className="font-medium">${product.precio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stock:</span>
                      <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {product.stock} unidades
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInventory;