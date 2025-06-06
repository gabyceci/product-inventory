import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

function ProductForm({ onSubmit, initialData = null, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      producto: initialData?.producto || '',
      categoria: initialData?.categoria || '',
      precio: initialData?.precio || '',
      stock: initialData?.stock || ''
    }
  });

  const onFormSubmit = (data) => {
    onSubmit({
      producto: data.producto.trim(),
      categoria: data.categoria.trim(),
      precio: parseFloat(data.precio),
      stock: parseInt(data.stock)
    });
    
    // Resetear el formulario después de enviar (solo para crear)
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del Producto
        </label>
        <input
          type="text"
          {...register('producto', {
            required: 'El nombre del producto es requerido',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres'
            }
          })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.producto ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Laptop Dell"
        />
        {errors.producto && (
          <p className="mt-1 text-sm text-red-600">{errors.producto.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <input
          type="text"
          {...register('categoria', {
            required: 'La categoría es requerida',
            minLength: {
              value: 2,
              message: 'La categoría debe tener al menos 2 caracteres'
            }
          })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.categoria ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Computadoras"
        />
        {errors.categoria && (
          <p className="mt-1 text-sm text-red-600">{errors.categoria.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            {...register('precio', {
              required: 'El precio es requerido',
              min: {
                value: 0.01,
                message: 'El precio debe ser mayor a 0'
              },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Formato de precio inválido'
              }
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.precio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.precio && (
            <p className="mt-1 text-sm text-red-600">{errors.precio.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            {...register('stock', {
              required: 'El stock es requerido',
              min: {
                value: 0,
                message: 'El stock debe ser 0 o mayor'
              },
              pattern: {
                value: /^\d+$/,
                message: 'El stock debe ser un número entero'
              }
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.stock ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary">
          {initialData ? 'Actualizar' : 'Crear'} Producto
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;