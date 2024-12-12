import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Home,
  Settings,
  Wrench,
  Hammer,
  RotateCcw,
  Workflow,
  SplitSquareVertical,
  User,
  LogOut,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

const navItems = [
  { to: '/', icon: Home, text: 'Главная страница' },
  { to: '/assembly', icon: Wrench, text: 'Сборка электродвигателя' },
  {
    to: '/disassembly',
    icon: SplitSquareVertical,
    text: 'Разборка электродвигателя',
  },
  { to: '/winding', icon: Workflow, text: 'Обмотка электродвигателя' },
  { to: '/turning', icon: RotateCcw, text: 'Токарные работы' },
  { to: '/other', icon: Settings, text: 'Прочие работы' },
  { to: '/profile', icon: User, text: 'Профиль' },
];

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Ошибка при выходе');
    } else {
      toast.success('Вы успешно вышли');
      navigate('/auth');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg md:w-64">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Hammer className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Учет работ</h1>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <ul
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:block space-y-2`}
          >
            {navItems.map(({ to, icon: Icon, text }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 text-gray-500" />
            <span>Выйти</span>
          </button>
        </div>
      </nav>
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};
