import React from 'react';
import { Home } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <Home className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Система учета работ с электродвигателями
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Выберите тип работы в меню слева для начала работы с системой.
      </p>
    </div>
  );
};
