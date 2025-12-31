import React from 'react';

const Presentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4 animate-fadeIn">
      {/* Cabecera de la Presentación */}
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
          La lógica detrás del código
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Una explicación sencilla de cómo he aplicado la teoría de la evolución para crear mi propio <i>Algoritmo Genético</i> que busca la combinación de dos números que sumen el valor exacto que queramos.
        </p>
      </section>

      {/* Bloques de Investigación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors group">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 22c0-5.5 15-5.5 15-11s-15-5.5-15-11" />
              <path d="M19.5 22c0-5.5-15-5.5-15-11s15-5.5 15-11" />
              <path d="M6.5 16.5h11" opacity="0.3" />
              <path d="M6.5 5.5h11" opacity="0.3" />
              <path d="M9 11h6" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Fundamentos Biológicos</h3>
          <p className="text-slate-600 leading-relaxed">
            Los algoritmos genéticos se inspiran en la evolución natural. Al igual que en la naturaleza, los "individuos" que mejor resuelven el problema son los que sobreviven para crear la siguiente generación.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Implementación Lógica</h3>
          <p className="text-slate-600 leading-relaxed">
            En el código, cada individuo es una pareja de números. Su "éxito" depende de lo cerca que esté su suma del número que buscamos. Si la suma es perfecta, el error es cero.
          </p>
        </div>
      </div>

      {/* Conceptos Clave */}
      <section className="bg-indigo-900 text-white p-10 rounded-3xl space-y-8 shadow-xl shadow-indigo-200">
        <h3 className="text-2xl font-bold">Conceptos clave del algoritmo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="text-indigo-300 font-bold uppercase tracking-widest text-sm">Población inicial</h4>
            <p className="text-indigo-100 opacity-90">Empezamos con números al azar. La mayoría no sumarán lo que queremos, pero entre ellos siempre habrá alguno un poco mejor que el resto.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-indigo-300 font-bold uppercase tracking-widest text-sm">Cruce (Crossover)</h4>
            <p className="text-indigo-100 opacity-90">Mezclamos los números de los "padres" con menos error para crear "hijos". La idea es que el hijo herede lo mejor de cada uno.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-indigo-300 font-bold uppercase tracking-widest text-sm">Mutación</h4>
            <p className="text-indigo-100 opacity-90">A veces cambiamos un número un poquito por sorpresa. Esto ayuda a que el algoritmo no se quede "atascado" y explore nuevas opciones.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-indigo-300 font-bold uppercase tracking-widest text-sm">Aptitud (Fitness)</h4>
            <p className="text-indigo-100 opacity-90">Es la nota que le damos a cada intento. Cuanto más cerca esté la suma del objetivo, mejor es su aptitud y más posibilidades tiene de reproducirse.</p>
          </div>
        </div>
      </section>

      {/* Fuentes de Referencia */}
      <section className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">Fuentes de referencia</h3>
        </div>
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Para el desarrollo de este algoritmo y la comprensión de los conceptos evolutivos, materia que no conocía hasta ahora, he utilizado como base teórica los siguientes recursos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://youtu.be/RBrXGyo0kIw?si=rNQZ1r9C3aqKBcdN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all group"
            >
              <div className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded">Video 1</div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-red-600 transition-colors truncate">Introducción a Algoritmos Genéticos</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a 
              href="https://youtu.be/k33N_62nnSc?si=XOqyV45ueKDv5rAv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-md transition-all group"
            >
              <div className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded">Video 2</div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-red-600 transition-colors truncate">Programación Evolutiva en Java</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <p className="text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
            Por otro lado, la base práctica de programación para desarrollar este código me la han proporcionado los volúmenes 1 y 2 del libro "Aprende Ejercicios con Java" de Luis José Sánchez.
          </p>
        </div>
      </section>

      {/* Sobre el Autor y Redes */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <h3 className="text-2xl font-bold text-slate-800">Sobre el autor</h3>
            <p className="text-slate-600 leading-relaxed">
              ¡Hola! Soy <strong>Juanma Fernández</strong>, estudiante de 1º de DAM (Desarrollo de Aplicaciones Multiplataforma). 
              He desarrollado este proyecto como trabajo de ampliación para subir nota en el primer trimestre de la asignatura de <strong>Programación</strong>. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              Este proyecto me ha ayudado a practicar la parte de la lógica que todavía no tenía asentada y ver cómo la programación puede ir mucho más allá de los ejercicios de clase, aplicando conceptos de evolución para resolver casi cualquier problema que se presente.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-sm text-slate-500 italic">
                Aprovecho para agradecer enormemente a <strong>Juan Antonio</strong>, mi tutor, por darme la oportunidad de presentar este proyecto de ampliación.
              </p>
            </div>
          </div>
          
          {/* Columna de Redes Sociales Centrada */}
          <div className="flex flex-col items-center justify-center gap-3 min-w-[240px]">
            <a 
              href="https://github.com/Ju4nmaFd3z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="font-semibold">GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/juanma-fernández-rodríguez" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-[#0077b5] text-white rounded-xl hover:bg-[#006396] transition-all hover:scale-[1.02] shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a 
              href="https://juanma-dev-portfolio.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all hover:scale-[1.02] shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
              <span className="font-semibold">Portafolio</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;