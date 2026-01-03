import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Individual, GenerationResult } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const POPULATION_SIZE = 20;
const MUTATION_RATE = 0.1;
const MAX_GENERATIONS = 1000;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as GenerationResult;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-slate-200 shadow-xl rounded-xl">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Generación {label}</p>
        <div className="space-y-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Mejor Individuo</span>
            <span className="text-sm font-bold text-slate-800">
              {data.bestIndividual.a} + {data.bestIndividual.b} = {data.bestIndividual.sum}
            </span>
            <span className="text-xs text-slate-500">Error: {data.bestIndividual.fitness}</span>
          </div>
          <div className="flex flex-col border-t border-slate-100 pt-2">
            <span className="text-[10px] font-bold text-indigo-600 uppercase">Promedio Población</span>
            <span className="text-sm font-semibold text-slate-700">Error medio: {data.averageFitness.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Simulator: React.FC = () => {
  const [target, setTarget] = useState<number | string>(100);
  const [history, setHistory] = useState<GenerationResult[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);
  const celebrationTimeoutRef = useRef<number | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isRunning) {
      scrollToBottom();
    }
  }, [logs, isRunning]);

  const calculateFitness = (a: number, b: number, targetValue: number): number => {
    return Math.abs((a + b) - targetValue);
  };

  const createIndividual = useCallback((a?: number, b?: number): Individual => {
    const targetNum = Number(target) || 0;
    const range = targetNum * 2 || 100;
    const valA = a ?? Math.floor(Math.random() * range);
    const valB = b ?? Math.floor(Math.random() * range);
    return {
      a: valA,
      b: valB,
      sum: valA + valB,
      fitness: calculateFitness(valA, valB, targetNum)
    };
  }, [target]);

  const startEvolution = () => {
    if (target === "" || isNaN(Number(target))) return;

    const targetNum = Number(target);
    setHistory([]);
    setGeneration(0);
    setLogs(["Iniciando simulación...", `Objetivo: ${targetNum}`]);
    setIsRunning(true);
    setIsSuccess(false);
    setShowCelebration(false);
    if (celebrationTimeoutRef.current) clearTimeout(celebrationTimeoutRef.current);

    let currentPop: Individual[] = Array.from({ length: POPULATION_SIZE }, () => createIndividual());
    
    const evolve = () => {
      setGeneration(prev => {
        const nextGen = prev; 
        
        const sorted = [...currentPop].sort((a, b) => a.fitness - b.fitness);
        const best = sorted[0];
        const average = sorted.reduce((acc, curr) => acc + curr.fitness, 0) / sorted.length;
        
        const logLine = `Gen ${nextGen} | Mejor: ${best.a} + ${best.b} = ${best.sum} (error: ${best.fitness})`;
        setLogs(prevLogs => [...prevLogs.slice(-49), logLine]);

        setHistory(prevHistory => [...prevHistory, {
          generation: nextGen,
          bestIndividual: best,
          averageFitness: average,
          population: sorted
        }]);

        if (best.fitness === 0) {
          setLogs(prevLogs => [...prevLogs, "", "¡OBJETIVO ALCANZADO!", `${best.a} + ${best.b} = ${targetNum}`]);
          setIsRunning(false);
          setIsSuccess(true);
          setShowCelebration(true);
          
          celebrationTimeoutRef.current = window.setTimeout(() => {
            setShowCelebration(false);
          }, 5000);

          return nextGen;
        }

        if (nextGen >= MAX_GENERATIONS) {
          setLogs(prevLogs => [...prevLogs, "Límite de generaciones alcanzado."]);
          setIsRunning(false);
          return nextGen;
        }

        const nextPop: Individual[] = [];
        nextPop.push({ ...sorted[0] });
        nextPop.push({ ...sorted[1] });

        const survivors = sorted.slice(0, POPULATION_SIZE / 2);

        while (nextPop.length < POPULATION_SIZE) {
          const p1 = survivors[Math.floor(Math.random() * survivors.length)];
          const p2 = survivors[Math.floor(Math.random() * survivors.length)];
          
          let childA = p1.a;
          let childB = p2.b;

          if (Math.random() < MUTATION_RATE) {
            childA += Math.floor(Math.random() * 21) - 10;
          }
          if (Math.random() < MUTATION_RATE) {
            childB += Math.floor(Math.random() * 21) - 10;
          }

          nextPop.push(createIndividual(childA, childB));
        }

        currentPop = nextPop;
        timerRef.current = window.setTimeout(evolve, 60);
        return nextGen + 1;
      });
    };

    evolve();
  };

  const stopEvolution = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setLogs(prevLogs => [...prevLogs, "Simulación detenida por el usuario."]);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (celebrationTimeoutRef.current) clearTimeout(celebrationTimeoutRef.current);
    };
  }, []);

  const lastGen = history[history.length - 1];
  const isTargetInvalid = target === "" || isNaN(Number(target));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Simulador en tiempo real</h2>
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">Valor objetivo de la suma</label>
            <input 
              type="number" 
              value={target}
              inputMode="numeric"
              onChange={(e) => setTarget(e.target.value)}
              disabled={isRunning}
              placeholder="Ej: 100"
              className={`w-full px-5 py-3 text-2xl font-bold rounded-xl transition-all outline-none shadow-sm disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-100 disabled:cursor-not-allowed border-2 ${isTargetInvalid && !isRunning ? 'border-red-200 bg-red-50 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500'}`}
            />
            {isTargetInvalid && !isRunning && (
              <p className="text-red-500 text-xs font-bold mt-3 animate-pulse flex items-center gap-1.5 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Introduce un valor para iniciar la evolución
              </p>
            )}
          </div>
          <div className="flex gap-2 mt-7">
            {!isRunning ? (
              <button 
                onClick={startEvolution}
                disabled={isTargetInvalid}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 ${isTargetInvalid ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'}`}
              >
                {isSuccess ? 'Reiniciar evolución' : 'Iniciar evolución'}
              </button>
            ) : (
              <button 
                onClick={stopEvolution}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-red-100"
              >
                Parar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-8">
          <div className={`bg-white p-6 rounded-2xl shadow-sm border transition-colors duration-1000 h-[450px] relative overflow-hidden ${isSuccess ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'}`}>
            {/* Efecto de resplandor sutil al éxito */}
            <div className={`absolute inset-0 bg-gradient-to-t from-emerald-100/20 to-transparent pointer-events-none transition-opacity duration-1000 ${showCelebration ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Convergencia del Algoritmo</h3>
                <p className="text-xs text-slate-500 font-medium">Reducción del error generacional</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Media</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Mejor</span>
                </div>
              </div>
            </div>
            
            <div className="h-[340px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isSuccess ? "#d1fae5" : "#f1f5f9"} />
                  <XAxis 
                    dataKey="generation" 
                    hide={history.length < 2}
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="averageFitness" 
                    stroke="#6366f1" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorAvg)" 
                    isAnimationActive={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bestIndividual.fitness" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorBest)" 
                    isAnimationActive={false}
                  />
                  {lastGen?.bestIndividual.fitness === 0 && (
                    <ReferenceLine y={0} stroke="#10b981" strokeDasharray="3 3" strokeWidth={2} />
                  )}
                </AreaChart>
              </ResponsiveContainer>
              
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ${showCelebration ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-4'}`}>
                <div className="relative group pointer-events-auto">
                  {/* Resplandor externo */}
                  <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-20 animate-pulse group-hover:opacity-40" />
                  
                  {/* Botón de cierre X */}
                  <button 
                    onClick={() => setShowCelebration(false)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shadow-lg z-10"
                    aria-label="Cerrar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative bg-white/80 backdrop-blur-md px-6 py-4 rounded-3xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] flex flex-col items-center gap-1 border border-emerald-100 transform transition-all duration-700 hover:scale-105">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl shadow-lg shadow-emerald-200 mb-2">
                      🎯
                    </div>
                    <span className="text-xl font-extrabold text-slate-800 tracking-tight">¡Objetivo alcanzado!</span>
                    <div className="flex items-center gap-2">
                       <span className="h-px w-8 bg-slate-200" />
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Generación {generation}</span>
                       <span className="h-px w-8 bg-slate-200" />
                    </div>
                  </div>
                </div>
              </div>

              {history.length === 0 && !isRunning && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 backdrop-blur-[1px]">
                  <p className="text-slate-400 font-medium text-sm italic">Esperando datos de evolución...</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col h-[300px]">
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">Consola de salida (Java)</span>
            </div>
            <div 
              ref={logContainerRef}
              className="p-4 font-mono text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 flex-1 no-scrollbar"
            >
              {logs.length === 0 && <span className="text-slate-600 italic">Esperando inicio de simulación...</span>}
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('¡OBJETIVO') ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Estado actual</h3>
          <div className="space-y-4 flex-1">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Generación actual</p>
              <p className="text-3xl font-bold text-slate-800">{generation}</p>
            </div>
            {lastGen && (
              <>
                <div className={`p-4 rounded-2xl border transition-all duration-700 ${isSuccess ? 'bg-emerald-50 border-emerald-400/60 shadow-[0_8px_20px_-8px_rgba(16,185,129,0.15)]' : 'bg-white border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-1.5">
                    <p className={`text-[9px] font-black uppercase tracking-[0.15em] ${isSuccess ? 'text-emerald-600/80' : 'text-slate-400'}`}>Mejor individuo</p>
                    {isSuccess && (
                      <span className="bg-emerald-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest">Perfecto</span>
                    )}
                  </div>
                  <p className={`text-2xl font-black tracking-tight ${isSuccess ? 'text-emerald-900' : 'text-slate-800'}`}>
                    {lastGen.bestIndividual.a} + {lastGen.bestIndividual.sum - lastGen.bestIndividual.a} = {lastGen.bestIndividual.sum}
                  </p>
                  
                  <div className={`mt-2.5 flex items-center justify-between border-t border-slate-100/60 pt-2`}>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Error absoluto</span>
                    <span className={`text-base font-black ${isSuccess ? 'text-emerald-600' : 'text-slate-700'}`}>{lastGen.bestIndividual.fitness}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Población (Top 5)</h4>
                  <div className="space-y-1">
                    {lastGen.population.slice(0, 5).map((ind, i) => (
                      <div key={i} className="flex justify-between items-center text-sm px-3 py-2 bg-slate-50/50 rounded-lg border border-transparent hover:border-slate-100 transition-colors">
                        <span className="text-slate-600 font-medium">{ind.a} + {ind.sum - ind.a}</span>
                        <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-slate-100 text-slate-500">Err: {ind.fitness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;