import React, { useState } from 'react';

const JAVA_SOURCE = `/**
 * Algoritmo Genético - Busca dos números que sumen un objetivo
 * Proyecto de ampliación 1º DAM - Programación
 * Primer Trimestre
 */
public class AlgoritmoGenetico {

    static final int OBJETIVO = 100;        // Número que queremos conseguir (input del simulador)
    static final int POBLACION = 20;        // Cuántos individuos hay
    static final double MUTACION = 0.1;     // 10% de mutación
    static final int MAX_GEN = 1000;        // Máximo de generaciones

    public static void main(String[] args) {
        // Tres arrays para guardar la población
        int[] num1 = new int[POBLACION];    // Primer número de cada individuo
        int[] num2 = new int[POBLACION];    // Segundo número de cada individuo
        int[] error = new int[POBLACION];   // Error de cada individuo
        
        // PASO 1: Crear población inicial random
        // Generamos números en un rango más amplio basado en el objetivo
        int rango = OBJETIVO * 2;  // El doble del objetivo para tener margen
        
        for (int i = 0; i < POBLACION; i++) {
            num1[i] = (int)(Math.random() * rango);
            num2[i] = (int)(Math.random() * rango);
            error[i] = calcularError(num1[i], num2[i]);
        }

        // PASO 2: Evolucionar generación tras generación
        int gen = 0;
        while (gen < MAX_GEN) {
            
            ordenar(num1, num2, error);  // Los mejores primero

            System.out.println("Gen " + gen + " | Mejor: " + num1[0] + 
                             " + " + num2[0] + " = " + 
                             (num1[0] + num2[0]) + " (error: " + error[0] + ")");

            // ¿Lo conseguimos?
            if (error[0] == 0) {
                System.out.println("\\n¡OBJETIVO ALCANZADO!");
                System.out.println(num1[0] + " + " + num2[0] + " = " + OBJETIVO);
                break;
            }

            // PASO 3: Crear nueva generación
            int[] nuevoNum1 = new int[POBLACION];
            int[] nuevoNum2 = new int[POBLACION];
            int[] nuevoError = new int[POBLACION];
            
            // Guardamos los 2 mejores (elitismo)
            nuevoNum1[0] = num1[0];
            nuevoNum2[0] = num2[0];
            nuevoError[0] = error[0];
            
            nuevoNum1[1] = num1[1];
            nuevoNum2[1] = num2[1];
            nuevoError[1] = error[1];

            // Creamos el resto mezclando padres
            for (int i = 2; i < POBLACION; i++) {
                // Elegimos 2 padres buenos
                int p1 = (int)(Math.random() * (POBLACION / 2));
                int p2 = (int)(Math.random() * (POBLACION / 2));
                
                // CRUCE: el hijo hereda de ambos
                int hijo1 = num1[p1];
                int hijo2 = num2[p2];

                // MUTACIÓN: a veces cambia algo
                if (Math.random() < MUTACION) {
                    hijo1 += (int)(Math.random() * 21) - 10;
                }
                if (Math.random() < MUTACION) {
                    hijo2 += (int)(Math.random() * 21) - 10;
                }

                nuevoNum1[i] = hijo1;
                nuevoNum2[i] = hijo2;
                nuevoError[i] = calcularError(hijo1, hijo2);
            }

            // La nueva generación reemplaza a la anterior
            num1 = nuevoNum1;
            num2 = nuevoNum2;
            error = nuevoError;
            
            gen++;
        }
    }

    // Calcula lo lejos que estamos del objetivo
    static int calcularError(int a, int b) {
        return Math.abs((a + b) - OBJETIVO);
    }

    // Ordena de mejor (menos error) a peor
    static void ordenar(int[] num1, int[] num2, int[] error) {
        for (int i = 0; i < POBLACION - 1; i++) {
            for (int j = i + 1; j < POBLACION; j++) {
                if (error[i] > error[j]) {
                    // Intercambiamos el error
                    int auxError = error[i];
                    error[i] = error[j];
                    error[j] = auxError;
                    
                    // Intercambiamos el primer número
                    int auxNum1 = num1[i];
                    num1[i] = num1[j];
                    num1[j] = auxNum1;
                    
                    // Intercambiamos el segundo número
                    int auxNum2 = num2[i];
                    num2[i] = num2[j];
                    num2[j] = auxNum2;
                }
            }
        }
    }
}`;

const JavaHighlighter: React.FC<{ code: string }> = ({ code }) => {
  const tokens = code.split(/(\/\*[\s\S]*?\*\/|\/\/.*|".*?"|\b(?:import|public|class|static|final|int|double|void|main|new|for|while|if|else|break|return|boolean|Math|System|Random|nextInt|nextDouble|println|clone|length|abs|random)\b|\b\d+\b)/);

  return (
    <code className="font-mono text-sm leading-relaxed">
      {tokens.map((token, i) => {
        if (!token) return null;
        if (token.startsWith('//') || token.startsWith('/*')) return <span key={i} className="text-slate-500 italic">{token}</span>;
        if (token.startsWith('"')) return <span key={i} className="text-emerald-400">{token}</span>;
        if (/^(import|public|class|static|final|int|double|void|main|new|for|while|if|else|break|return|boolean)$/.test(token)) return <span key={i} className="text-indigo-400 font-bold">{token}</span>;
        if (/^(Math|System|Random|nextInt|nextDouble|println|clone|length|abs|random)$/.test(token)) return <span key={i} className="text-sky-300">{token}</span>;
        if (/^\d+$/.test(token)) return <span key={i} className="text-amber-400 font-semibold">{token}</span>;
        return <span key={i} className="text-slate-300">{token}</span>;
      })}
    </code>
  );
};

const JavaCode: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JAVA_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Código fuente en Java</h2>
            <p className="text-slate-500 text-sm">Código fuente desde mi GitHub con su correspondiente documentación Javadoc.</p>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {copied ? 'Copiado' : 'Copiar código'}
          </button>
        </div>

        <div className="relative group">
          <div className="bg-slate-900 p-6 rounded-2xl overflow-x-auto border border-slate-800 shadow-inner max-h-[650px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            <pre className="m-0">
              <JavaHighlighter code={JAVA_SOURCE} />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaCode;