import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { InputField } from '../components/InputField';
import { toast } from 'react-hot-toast';

interface Profile {
  first_name: string;
  last_name: string;
  patronymic: string;
  position_employee: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    patronymic: '',
    position_employee: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('user')
          .select('first_name, last_name, patronymic, position_employee')
          .eq('user_id', user.id)
          .single();

        if (error) {
          toast.error('Ошибка при загрузке профиля');
        } else if (data) {
          setProfile(data);
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from('user')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          patronymic: profile.patronymic,
          position_employee: profile.position_employee,
        })
        .eq('user_id', user.id);

      if (error) {
        toast.error('Ошибка при обновлении профиля');
      } else {
        toast.success('Профиль успешно обновлен');
      }
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Имя"
          type="text"
          value={profile.first_name}
          onChange={(value) => handleInputChange('first_name', value)}
        />
        <InputField
          label="Фамилия"
          type="text"
          value={profile.last_name}
          onChange={(value) => handleInputChange('last_name', value)}
        />
        <InputField
          label="Отчество"
          type="text"
          value={profile.patronymic}
          onChange={(value) => handleInputChange('patronymic', value)}
        />
        <InputField
          label="Должность"
          type="text"
          value={profile.position_employee}
          onChange={(value) => handleInputChange('position_employee', value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
