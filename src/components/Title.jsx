import React from 'react';
import { Package } from 'lucide-react';

function Title({ children }) {
  return (
    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
      <Package className="text-blue-600" />
      {children}
    </h1>
  );
}

export default Title;