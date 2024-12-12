import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Workflow } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { InputField } from '../InputField';
import { ProductInfo } from '../ProductInfo';
import { useProductData } from '../../hooks/useProductData';

interface WindingFormData {
  motorId: string;
  employeeId: string;
  workDate: string;
  workTime: string;
  wireConsumption: string;
  stickQuantity: string;
}

export const WindingForm: React.FC = () => {
  const [formData, setFormData] = useState<WindingFormData>({
    motorId: '',
    employeeId: '',
    workDate: '',
    workTime: '',
    wireConsumption: '',
    stickQuantity: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productData, isLoading } = useProductData(formData.motorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('motor_winding').insert([
        {
          motor_id: parseInt(formData.motorId, 10),
          employee_id: formData.employeeId,
          winding_date: formData.workDate,
          winding_time: formData.workTime,
          wire_consumption: formData.wireConsumption,
          stick_quantity: formData.stickQuantity,
        },
      ]);

      if (error) throw error;

      toast.success('Данные успешно сохранены');
      setFormData({
        motorId: '',
        employeeId: '',
        workDate: '',
        workTime: '',
        wireConsumption: '',
        stickQuantity: '',
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(
        `Ошибка при сохранении данных: ${
          error.message || 'Неизвестная ошибка'
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-center mb-6">
        <Workflow className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          Регистрация обмотки электродвигателя
        </h2>
      </div>

      <InputField
        label="ID Электродвигателя"
        type="text"
        value={formData.motorId}
        onChange={(value) => setFormData({ ...formData, motorId: value })}
        required
        placeholder="Введите ID электродвигателя"
      />

      <ProductInfo
        isLoading={isLoading}
        productData={productData}
        motorId={formData.motorId}
      />

      <InputField
        label="ID Сотрудника"
        type="text"
        value={formData.employeeId}
        onChange={(value) => setFormData({ ...formData, employeeId: value })}
        required
        placeholder="Введите ID сотрудника"
      />

      <InputField
        label="Дата Обмотки"
        type="date"
        value={formData.workDate}
        onChange={(value) => setFormData({ ...formData, workDate: value })}
        required
      />

      <InputField
        label="Время Обмотки"
        type="time"
        value={formData.workTime}
        onChange={(value) => setFormData({ ...formData, workTime: value })}
        required
      />

      <InputField
        label="Расход провода"
        type="text"
        value={formData.wireConsumption}
        onChange={(value) =>
          setFormData({ ...formData, wireConsumption: value })
        }
        placeholder="Введите расход провода"
      />

      <InputField
        label="Количество палочек"
        type="text"
        value={formData.stickQuantity}
        onChange={(value) => setFormData({ ...formData, stickQuantity: value })}
        placeholder="Введите количество палочек"
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
