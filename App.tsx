
import React, { useState } from 'react';
import { Tab } from './types';
import Simulator from './components/Simulator';
import Presentation from './components/Presentation';
import JavaCode from './components/JavaCode';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Theory);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabecera */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Genetix
              </span>
              <span className="text-slate-300 font-light">|</span>
              <span className="text-slate-700 font-semibold tracking-tight">Juanma Fernández</span>
            </h1>
          </div>
          <nav className="flex gap-2 md:gap-4">
            <button 
              onClick={() => setActiveTab(Tab.Theory)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base ${activeTab === Tab.Theory ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Investigación Previa
            </button>
            <button 
              onClick={() => setActiveTab(Tab.Simulator)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base ${activeTab === Tab.Simulator ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Simulador
            </button>
            <button 
              onClick={() => setActiveTab(Tab.JavaCode)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md transition-colors text-sm md:text-base ${activeTab === Tab.JavaCode ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600'}`}
            >
              Código Java
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        {activeTab === Tab.Theory && <Presentation />}
        {activeTab === Tab.Simulator && <Simulator />}
        {activeTab === Tab.JavaCode && <JavaCode />}
      </main>

      {/* Pie de página */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Proyecto de Algoritmo Genético - Primer Trimestre <i>Programación</i> 1ºDAM
        </div>
      </footer>
    </div>
  );
};

export default App;
