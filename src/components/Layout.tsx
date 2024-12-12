import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Home,
  Settings,
  Wrench,
  Hammer,
  RotateCcw,
  Workflow,
  SplitSquareVertical,
} from 'lucide-react';

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
];

export const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center mb-8">
            <Hammer className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Учет работ</h1>
          </div>
          <ul className="space-y-2">
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
        </div>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
