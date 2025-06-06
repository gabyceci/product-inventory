import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ProductInventory from './pages/ProductInventory';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Página de bienvenida */}
        <Route path="/" element={<Welcome />} />
        
        {/* Ruta del inventario */}
        <Route path="/inventory" element={<ProductInventory />} />
        
        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;