import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Wrench } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { InputField } from './InputField';

interface ProductData {
  id: number;
  product_name: string;
  contractor: string;
}

export const MotorAssemblyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    motorId: '',
    employeeId: '',
    assemblyDate: '',
    assemblyTime: '',
    bearingId: '',
    fanId: '',
    sealId: '',
  });

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!formData.motorId.trim()) {
        setProductData(null);
        return;
      }

      setIsLoading(true);
      try {
        const motorId = parseInt(formData.motorId, 10);
        if (isNaN(motorId)) {
          toast.error('Пожалуйста, введите корректный ID электродвигателя');
          setProductData(null);
          return;
        }

        console.log('Fetching data for motor ID:', motorId);
        
        const { data, error } = await supabase
          .from('product_data')
          .select('id, product_name, contractor')
          .eq('id', motorId)
          .maybeSingle();

        console.log('Received data:', data);
        console.log('Received error:', error);

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
  }, [formData.motorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);

      // Insert bearing replacement record
      if (formData.bearingId) {
        const { data: bearingData, error: bearingError } = await supabase
          .from('motor_assembly')
          .insert([
            {
              motor_id: parseInt(formData.motorId, 10),
              employee_id: formData.employeeId,
              assembly_date: formData.assemblyDate,
              assembly_time: formData.assemblyTime,
              part_id: formData.bearingId,
            },
          ])
          .select();

        if (bearingError) {
          console.error('Error inserting bearing data:', bearingError);
          throw bearingError;
        }
        console.log('Bearing data inserted successfully:', bearingData);
      }

      // Insert fan replacement record
      if (formData.fanId) {
        const { data: fanData, error: fanError } = await supabase
          .from('motor_assembly')
          .insert([
            {
              motor_id: parseInt(formData.motorId, 10),
              employee_id: formData.employeeId,
              assembly_date: formData.assemblyDate,
              assembly_time: formData.assemblyTime,
              part_id: formData.fanId,
            },
          ])
          .select();

        if (fanError) {
          console.error('Error inserting fan data:', fanError);
          throw fanError;
        }
        console.log('Fan data inserted successfully:', fanData);
      }

      // Insert seal replacement record
      if (formData.sealId) {
        const { data: sealData, error: sealError } = await supabase
          .from('motor_assembly')
          .insert([
            {
              motor_id: parseInt(formData.motorId, 10),
              employee_id: formData.employeeId,
              assembly_date: formData.assemblyDate,
              assembly_time: formData.assemblyTime,
              part_id: formData.sealId,
            },
          ])
          .select();

        if (sealError) {
          console.error('Error inserting seal data:', sealError);
          throw sealError;
        }
        console.log('Seal data inserted successfully:', sealData);
      }

      toast.success('Данные успешно сохранены');
      setFormData({
        motorId: '',
        employeeId: '',
        assemblyDate: '',
        assemblyTime: '',
        bearingId: '',
        fanId: '',
        sealId: '',
      });
      setProductData(null);
    } catch (error: any) {
      console.error('Detailed error:', error);
      toast.error(
        `Ошибка при сохранении данных: ${error.message || 'Неизвестная ошибка'}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Wrench className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Регистрация сборки электродвигателя</h2>
      </div>

      <InputField
        label="ID Электродвигателя"
        type="text"
        value={formData.motorId}
        onChange={(value) => setFormData({ ...formData, motorId: value })}
        required
        placeholder="Введите ID электродвигателя"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Название товара:
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          {isLoading ? (
            <span className="text-gray-500">Загрузка...</span>
          ) : productData ? (
            productData.product_name
          ) : (
            <span className="text-gray-500 italic">
              {formData.motorId ? 'Электродвигатель не найден' : 'Введите ID Электродвигателя в строке выше'}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Контрагент:
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          {isLoading ? (
            <span className="text-gray-500">Загрузка...</span>
          ) : productData ? (
            productData.contractor
          ) : (
            <span className="text-gray-500 italic">
              {formData.motorId ? 'Электродвигатель не найден' : 'Заполнится при вводе ID электродвигателя'}
            </span>
          )}
        </div>
      </div>

      <InputField
        label="ID Сотрудника"
        type="text"
        value={formData.employeeId}
        onChange={(value) => setFormData({ ...formData, employeeId: value })}
        required
        placeholder="Введите ID сотрудника"
      />

      <InputField
        label="Дата Сборки"
        type="date"
        value={formData.assemblyDate}
        onChange={(value) => setFormData({ ...formData, assemblyDate: value })}
        required
      />

      <InputField
        label="Время Сборки"
        type="time"
        value={formData.assemblyTime}
        onChange={(value) => setFormData({ ...formData, assemblyTime: value })}
        required
      />

      <InputField
        label="Замена Подшипника (ID)"
        type="text"
        value={formData.bearingId}
        onChange={(value) => setFormData({ ...formData, bearingId: value })}
        placeholder="Введите ID подшипника"
      />

      <InputField
        label="Замена Вентилятора (ID)"
        type="text"
        value={formData.fanId}
        onChange={(value) => setFormData({ ...formData, fanId: value })}
        placeholder="Введите ID вентилятора"
      />

      <InputField
        label="Замена Уплотнение торцевое (ID)"
        type="text"
        value={formData.sealId}
        onChange={(value) => setFormData({ ...formData, sealId: value })}
        placeholder="Введите ID торцевого уплотнения"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};
