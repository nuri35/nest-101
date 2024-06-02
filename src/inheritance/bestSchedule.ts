import { Subject } from 'src/entities/subject.entity';
import { Classroom } from '../entities/classroom.entity';
import { Teacher } from '../entities/teacher.entity';
import { SummaryGeneticAlgorithm } from './algorithms/genetic-alg';
import { AlgorithmParams, ScheduleEntry } from 'src/interfaces/algorithm';

//? ScheduleCreator class'ımız  SummaryGeneticAlgorithm class  ile cok birleşik bir class oldugu ıcın başka bir class ile calısmayacagı ıcın object composition yerine inheritance tercih edildi.
export class ScheduleCreator extends SummaryGeneticAlgorithm<
  AlgorithmParams,
  ScheduleEntry
> {
  //
  initializePopulation(size: number, data: AlgorithmParams): ScheduleEntry[][] {
    const population: ScheduleEntry[][] = [];
    for (let i = 0; i < size; i++) {
      population.push(
        this.generateRandomSchedule(
          data.classrooms,
          data.teachers,
          data.subjects,
        ),
      );
    }
    return population;
  }

  private generateRandomSchedule(
    classrooms: Classroom[],
    teachers: Teacher[],
    subjects: Subject[],
  ): ScheduleEntry[] {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8];
    const schedule: ScheduleEntry[] = [];

    classrooms.forEach((classroom) => {
      subjects.forEach((subject) => {
        for (let i = 0; i < subject.hoursperweek; i++) {
          let day = days[Math.floor(Math.random() * days.length)];
          let hour = hours[Math.floor(Math.random() * hours.length)];
          let teacher = teachers[Math.floor(Math.random() * teachers.length)];

          while (!day || !hour || !teacher) {
            day = days[Math.floor(Math.random() * days.length)];
            hour = hours[Math.floor(Math.random() * hours.length)];
            teacher = teachers[Math.floor(Math.random() * teachers.length)];
          }

          schedule.push({
            classroom,
            subject,
            day,
            hour,
            teacher,
          });
        }
      });
    });

    return schedule;
  }

  mutate(entity: any[], mutationRate: number): void {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8];
    const teacherDailySchedule = new Map();
    const teacherWeeklySchedule = new Map();
    const subjectDailyHours = new Map();

    entity.forEach((entry) => {
      if (Math.random() < mutationRate) {
        let newDay = days[Math.floor(Math.random() * days.length)];
        let newHour = hours[Math.floor(Math.random() * hours.length)];
        let newTeacher = entry.teacher;
        const subjectDailyKey = `${entry.subject}-${newDay}`;

        const teacherDailyKey = `${newTeacher}-${newDay}`;
        const teacherWeeklyKey = newTeacher;

        if (!teacherDailySchedule.has(teacherDailyKey)) {
          teacherDailySchedule.set(teacherDailyKey, 0);
        }
        if (!teacherWeeklySchedule.has(teacherWeeklyKey)) {
          teacherWeeklySchedule.set(teacherWeeklyKey, 0);
        }
        if (!subjectDailyHours.has(subjectDailyKey)) {
          subjectDailyHours.set(subjectDailyKey, 0);
        }

        teacherDailySchedule.set(
          teacherDailyKey,
          teacherDailySchedule.get(teacherDailyKey) + 1,
        );
        teacherWeeklySchedule.set(
          teacherWeeklyKey,
          teacherWeeklySchedule.get(teacherWeeklyKey) + 1,
        );
        subjectDailyHours.set(
          subjectDailyKey,
          subjectDailyHours.get(subjectDailyKey) + 1,
        );

        while (
          teacherDailySchedule.get(teacherDailyKey) > 8 ||
          teacherWeeklySchedule.get(teacherWeeklyKey) > 40 ||
          subjectDailyHours.get(subjectDailyKey) > 2
        ) {
          newDay = days[Math.floor(Math.random() * days.length)];
          newHour = hours[Math.floor(Math.random() * hours.length)];
          newTeacher = entry.teacher;

          teacherDailySchedule.set(
            teacherDailyKey,
            teacherDailySchedule.get(teacherDailyKey) - 1,
          );
          teacherWeeklySchedule.set(
            teacherWeeklyKey,
            teacherWeeklySchedule.get(teacherWeeklyKey) - 1,
          );
          subjectDailyHours.set(
            subjectDailyKey,
            subjectDailyHours.get(subjectDailyKey) - 1,
          );

          teacherDailySchedule.set(
            teacherDailyKey,
            teacherDailySchedule.get(teacherDailyKey) + 1,
          );
          teacherWeeklySchedule.set(
            teacherWeeklyKey,
            teacherWeeklySchedule.get(teacherWeeklyKey) + 1,
          );
          subjectDailyHours.set(
            subjectDailyKey,
            subjectDailyHours.get(subjectDailyKey) + 1,
          );
        }

        entry.day = newDay;
        entry.hour = newHour;
        entry.teacher = newTeacher;
      }
    });
  }

  crossover(parents: ScheduleEntry[][][]) {
    const offspring: any[] = [];
    for (let i = 0; i < parents.length - 1; i += 2) {
      const parent1 = parents[i];
      const parent2 = parents[i + 1];
      const midpoint = Math.floor(Math.random() * parent1.length);
      const child1 = parent1.slice(0, midpoint).concat(parent2.slice(midpoint));
      const child2 = parent2.slice(0, midpoint).concat(parent1.slice(midpoint));
      offspring.push(child1, child2);
    }
    if (parents.length % 2 === 1) {
      offspring.push(parents[parents.length - 1]);
    }

    return offspring;
  }

  selection(population: ScheduleEntry[][]): ScheduleEntry[][][] {
    const selected: ScheduleEntry[][][] = [];
    const fitnessValues = population.map((schedule) =>
      this.calculateFitness(schedule),
    );
    const totalFitness = fitnessValues.reduce(
      (sum, fitness) => sum + fitness,
      0,
    );
    for (let i = 0; i < population.length / 2; i++) {
      const selectedParents: ScheduleEntry[][] = [];
      for (let j = 0; j < 2; j++) {
        const randomValue = Math.random() * totalFitness;
        let sum = 0;
        for (let k = 0; k < population.length; k++) {
          sum += fitnessValues[k];
          if (sum >= randomValue) {
            selectedParents.push(population[k]);
            break;
          }
        }
      }
      selected.push(selectedParents);
    }

    return selected;
  }

  calculateFitness(schedule: ScheduleEntry[]): number {
    let fitness = 0;
    const conflicts = new Set();
    const teacherDailySchedule = new Map();
    const teacherWeeklySchedule = new Map();
    const subjectDailyHours = new Map();

    schedule.forEach((entry) => {
      const teacherDailyKey = `${entry.teacher}-${entry.day}`;
      const teacherWeeklyKey = entry.teacher;
      const subjectDailyKey = `${entry.subject}-${entry.day}`;

      if (!teacherDailySchedule.has(teacherDailyKey)) {
        teacherDailySchedule.set(teacherDailyKey, 0);
      }
      if (!teacherWeeklySchedule.has(teacherWeeklyKey)) {
        teacherWeeklySchedule.set(teacherWeeklyKey, 0);
      }
      if (!subjectDailyHours.has(subjectDailyKey)) {
        subjectDailyHours.set(subjectDailyKey, 0);
      }

      teacherDailySchedule.set(
        teacherDailyKey,
        teacherDailySchedule.get(teacherDailyKey) + 1,
      );
      teacherWeeklySchedule.set(
        teacherWeeklyKey,
        teacherWeeklySchedule.get(teacherWeeklyKey) + 1,
      );
      subjectDailyHours.set(
        subjectDailyKey,
        subjectDailyHours.get(subjectDailyKey) + 1,
      );

      if (
        teacherDailySchedule.get(teacherDailyKey) > 8 ||
        teacherWeeklySchedule.get(teacherWeeklyKey) > 40 ||
        subjectDailyHours.get(subjectDailyKey) > 2
      ) {
        fitness -= 10;
      }

      if (teacherDailySchedule.get(teacherDailyKey) <= 8) {
        fitness += 5;
      }

      if (teacherWeeklySchedule.get(teacherWeeklyKey) <= 40) {
        fitness += 5;
      }

      if (subjectDailyHours.get(subjectDailyKey) <= 2) {
        fitness += 5;
      }

      const conflictKey = `${entry.classroom}-${entry.day}-${entry.hour}`;
      if (conflicts.has(conflictKey)) {
        fitness -= 10;
      } else {
        conflicts.add(conflictKey);
      }
    });

    return fitness;
  }
}
