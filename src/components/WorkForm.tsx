import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { InputField } from './InputField';
import { ProductInfo } from './ProductInfo';
import { useProductData } from '../hooks/useProductData';
import type { FormData } from '../types/product';

interface WorkFormProps {
  title: string;
  icon: React.ReactNode;
}

const initialFormData: FormData = {
  motorId: '',
  employeeId: '',
  workDate: '',
  workTime: '',
  bearingId: '',
  fanId: '',
  sealId: '',
};

export const WorkForm: React.FC<WorkFormProps> = ({ title, icon }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productData, isLoading } = useProductData(formData.motorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const records = [];
      const motorId = parseInt(formData.motorId, 10);

      // Add bearing record if ID is provided
      if (formData.bearingId) {
        records.push({
          motor_id: motorId,
          employee_id: formData.employeeId,
          assembly_date: formData.workDate,
          assembly_time: formData.workTime,
          part_id: formData.bearingId,
        });
      }

      // Add fan record if ID is provided
      if (formData.fanId) {
        records.push({
          motor_id: motorId,
          employee_id: formData.employeeId,
          assembly_date: formData.workDate,
          assembly_time: formData.workTime,
          part_id: formData.fanId,
        });
      }

      // Add seal record if ID is provided
      if (formData.sealId) {
        records.push({
          motor_id: motorId,
          employee_id: formData.employeeId,
          assembly_date: formData.workDate,
          assembly_time: formData.workTime,
          part_id: formData.sealId,
        });
      }

      if (records.length > 0) {
        const { error } = await supabase
          .from('motor_assembly')
          .insert(records);

        if (error) throw error;

        toast.success('Данные успешно сохранены');
        setFormData(initialFormData);
      } else {
        toast.error('Необходимо указать хотя бы один ID детали');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Ошибка при сохранении данных: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-gray-900 ml-2">{title}</h2>
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
        label="Дата работы"
        type="date"
        value={formData.workDate}
        onChange={(value) => setFormData({ ...formData, workDate: value })}
        required
      />

      <InputField
        label="Время работы"
        type="time"
        value={formData.workTime}
        onChange={(value) => setFormData({ ...formData, workTime: value })}
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
