# 🧬 Genetix: Algoritmos Evolutivos

**Genetix** es un proyecto educativo diseñado para explorar y visualizar el funcionamiento de los **Algoritmos Genéticos (AG)**. El objetivo principal es encontrar dos números naturales cuya suma coincida con un valor objetivo definido por el usuario, utilizando para ello un proceso de selección natural.

Este proyecto ha sido desarrollado como trabajo de ampliación para la asignatura de **Programación (1º DAM)** durante el primer trimestre.

## 🚀 Características

- **Simulador en tiempo real:** Visualización interactiva del proceso evolutivo mediante gráficos de convergencia (Recharts).
- **Lógica Genética Pura:** Implementación fiel de los pilares de la computación evolutiva:
  - **Población Inicial:** Generación aleatoria basada en el rango del objetivo.
  - **Elitismo:** Preservación automática de los dos mejores individuos de cada generación.
  - **Crossover (Cruce):** Mezcla de material genético de los progenitores más aptos.
  - **Mutación:** Introducción de variabilidad aleatoria para evitar mínimos locales.
- **Doble Implementación:** Incluye el algoritmo optimizado tanto en **Java** (lógica de backend) como en **TypeScript/React** (visualización).

## 🛠️ Stack Tecnológico

- **Core:** Java (Algoritmo principal).
- **Frontend:** React, TypeScript, Tailwind CSS [VibeCoding].
- **Gráficos:** Recharts (Visualización de aptitud y error) [VibeCoding].
- **Diseño:** UI moderna e intuitiva basada en la experiencia de usuario (UX) académica.

## 📖 Conceptos Aplicados

El algoritmo sigue un flujo darwiniano:
1. **Evaluación de Aptitud (Fitness):** Se calcula el error absoluto respecto al objetivo.
2. **Selección:** Solo el 50% más apto tiene posibilidad de reproducirse.
3. **Reproducción:** Los hijos heredan genes de los padres con una probabilidad de mutación del 10%.
4. **Sustitución:** La nueva generación reemplaza a la anterior, manteniendo a los líderes (elitismo).

Estaré encantado de recibir comentarios y sugerencias...

¡Gracias por pasarte por aquí! 🙌
