import { useState } from 'react';

const API_URL = 'https://retoolapi.dev/BuJvOm/productos';

function useSaveData() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const saveProduct = async (product, method = 'POST', id = null) => {
    setSaving(true);
    setSaveError(null);
    
    try {
      const url = id ? `${API_URL}/${id}` : API_URL;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) throw new Error('Error al guardar producto');
      const data = await response.json();
      return data;
    } catch (err) {
      setSaveError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    setSaving(true);
    setSaveError(null);
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error al eliminar producto');
      return true;
    } catch (err) {
      setSaveError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { saveProduct, deleteProduct, saving, saveError };
}

export default useSaveData;