import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { ProductData } from '../types/product';

export const useProductData = (motorId: string) => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!motorId.trim()) {
        setProductData(null);
        return;
      }

      setIsLoading(true);
      try {
        const id = parseInt(motorId, 10);
        if (isNaN(id)) {
          toast.error('Пожалуйста, введите корректный ID электродвигателя');
          setProductData(null);
          return;
        }

        const { data, error } = await supabase
          .from('product_data')
          .select('id, product_name, contractor')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          if (error.code === 'PGRST116') {
            toast.error('Электродвигатель с указанным ID не найден');
          } else {
            console.error('Error fetching product data:', error);
            toast.error('Ошибка при получении данных о продукте');
          }
          setProductData(null);
        } else if (data) {
          setProductData(data);
        } else {
          setProductData(null);
          toast.error('Электродвигатель с указанным ID не найден');
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('Произошла неожиданная ошибка');
        setProductData(null);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProductData, 500);
    return () => clearTimeout(timeoutId);
  }, [motorId]);

  return { productData, isLoading };
};
