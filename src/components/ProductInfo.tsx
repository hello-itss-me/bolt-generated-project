import React from 'react';
import { ProductData } from '../types/product';

interface ProductInfoProps {
  isLoading: boolean;
  productData: ProductData | null;
  motorId: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  isLoading,
  productData,
  motorId,
}) => {
  const renderContent = (type: 'name' | 'contractor') => {
    if (isLoading) {
      return <span className="text-gray-500">Загрузка...</span>;
    }
    if (productData) {
      return type === 'name' ? productData.product_name : productData.contractor;
    }
    return (
      <span className="text-gray-500 italic">
        {motorId
          ? 'Электродвигатель не найден'
          : type === 'name'
          ? 'Введите ID Электродвигателя в строке выше'
          : 'Заполнится при вводе ID электродвигателя'}
      </span>
    );
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Название товара:
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          {renderContent('name')}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Контрагент:
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          {renderContent('contractor')}
        </div>
      </div>
    </>
  );
};
