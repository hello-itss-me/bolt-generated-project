import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Settings } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { InputField } from '../InputField';
import { ProductInfo } from '../ProductInfo';
import { useProductData } from '../../hooks/useProductData';

interface OtherFormData {
  motorId: string;
  employeeId: string;
  workDate: string;
  workTime: string;
  workDescription: string;
}

export const OtherForm: React.FC = () => {
  const [formData, setFormData] = useState<OtherFormData>({
    motorId: '',
    employeeId: '',
    workDate: '',
    workTime: '',
    workDescription: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productData, isLoading } = useProductData(formData.motorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('other_works').insert([
        {
          motor_id: parseInt(formData.motorId, 10),
          employee_id: formData.employeeId,
          work_date: formData.workDate,
          work_time: formData.workTime,
          description: formData.workDescription,
        },
      ]);

      if (error) throw error;

      toast.success('Данные успешно сохранены');
      setFormData({
        motorId: '',
        employeeId: '',
        workDate: '',
        workTime: '',
        workDescription: '',
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
      className="p-4 md:p-8 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-center mb-6">
        <Settings className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">
          Регистрация прочих работ
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
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
          label="Дата Работы"
          type="date"
          value={formData.workDate}
          onChange={(value) => setFormData({ ...formData, workDate: value })}
          required
        />

        <InputField
          label="Время Работы"
          type="time"
          value={formData.workTime}
          onChange={(value) => setFormData({ ...formData, workTime: value })}
          required
        />

        <InputField
          label="Описание Работы"
          type="text"
          value={formData.workDescription}
          onChange={(value) =>
            setFormData({ ...formData, workDescription: value })
          }
          required
          placeholder="Введите описание работы"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};
