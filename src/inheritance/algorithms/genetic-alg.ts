import { GeneticAlgorithmParameters } from 'src/enums/genetic.algorithm.parameters';

export abstract class SummaryGeneticAlgorithm<T, K> {
  populationSize = GeneticAlgorithmParameters.PopulationSize;
  generations = GeneticAlgorithmParameters.Generations;
  mutationRate = GeneticAlgorithmParameters.MutationRate;

  abstract initializePopulation(size: number, data: T): K[][];
  abstract calculateFitness(schedule: K[]): number;
  abstract selection(population: K[][]): K[][][];
  abstract crossover(selected: K[][][]): any[];
  abstract mutate(offspring: any[], mutationRate: number): void;

  async build(data: T) {
    const population = this.initializePopulation(this.populationSize, data);

    let bestItem = null;
    let bestFitness = -Infinity;

    for (let generation = 0; generation < this.generations; generation++) {
      population.forEach((item) => {
        const fitness = this.calculateFitness(item);
        if (fitness > bestFitness) {
          bestFitness = fitness;
          bestItem = item;
        }
      });

      const selected = this.selection(population);
      const offspring = this.crossover(selected);

      this.mutate(offspring, this.mutationRate);
      population.length = 0;
      population.push(...offspring);
    }

    if (bestItem) {
      const value = bestItem as K[][][];
      const scheduleConverted = value.flat(2);

      return scheduleConverted;
    } else {
      throw new Error('No suitable  Item found');
    }
  }
}
