import React from 'react';
import { AlertCircle } from 'lucide-react';

function Message({ type = 'info', children }) {
  const types = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    error: "bg-red-50 text-red-800 border-red-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200"
  };
  
  return (
    <div className={`p-4 rounded-lg border ${types[type]} flex items-center gap-2`}>
      <AlertCircle className="w-5 h-5" />
      {children}
    </div>
  );
}

export default Message;