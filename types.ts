
export interface Individual {
  a: number;
  b: number;
  fitness: number;
  sum: number;
}

export interface GenerationResult {
  generation: number;
  bestIndividual: Individual;
  averageFitness: number;
  population: Individual[];
}

export enum Tab {
  Simulator = 'simulator',
  Theory = 'theory',
  JavaCode = 'java'
}
