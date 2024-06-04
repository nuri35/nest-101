// description.ts
export const apiDescription = `
 
This API is designed to manage schedules using advanced genetic algorithms. It ensures optimal scheduling through intelligent resource allocation and constraint management, making it suitable for various scenarios such as educational timetables and sports team planning.

### Summary
The API provides functionalities to create and fetch schedules using a genetic algorithm approach. It optimizes the scheduling process by considering multiple constraints and efficiently managing resources. The implementation leverages object composition and inheritance to enhance code reusability, making the genetic algorithm applicable to different scenarios like lesson plans or football team schedules.

### Features

1. **Create Schedules**: Utilize a genetic algorithm to generate optimal schedules based on various constraints and parameters. This includes:
   - Allocating subjects to specific classes
   - Ensuring no subject or teacher overlap in different classes at the same time
   - Distributing lessons across available days, ensuring daily limits are not exceeded
   - Handling empty lesson slots appropriately
   - Efficiently managing resources such as classrooms, teachers, and subjects

2. **Fetch Schedules**: Retrieve schedules with support for filtering and pagination. This allows users to:
   - Navigate through schedules using pagination parameters

**The genetic algorithm ensures that the schedules are optimized for the best possible outcome, adhering to all the specified constraints. This API is a robust solution for educational institutions or organizations needing dynamic and efficient schedule management.**

Additionally, in this case, we ensured code reusability by using object composition or inheritance. This allows us to run the genetic algorithm across various scenarios, whether it's a lesson plan schedule or a football team plan, through an abstract GeneticAlgorithm class. This flexibility enhances the versatility and applicability of the algorithm in different contexts

### Lesson Plan Scheduling
\`\`\`typescript
class LessonPlanGeneticAlgorithm extends GeneticAlgorithm {
  // Implementation specific to lesson plan scheduling
}
const lessonPlanAlgorithm = new LessonPlanGeneticAlgorithm();
lessonPlanAlgorithm.run();
\`\`\`

### Football Team Scheduling
\`\`\`typescript
class FootballTeamGeneticAlgorithm extends GeneticAlgorithm {
  // Implementation specific to football team scheduling
}
const footballTeamAlgorithm = new FootballTeamGeneticAlgorithm();
footballTeamAlgorithm.run();
\`\`\`

This flexibility enhances the versatility and applicability of the algorithm in different contexts, allowing for efficient scheduling regardless of the domain.

 

### Data Initialization
Data for classrooms, levels, subjects, and teachers is populated in the database using migrations. The following commands are used to manage migrations:

- **Create Migration**: \`npm run typeorm:create-migration\`
  \`\`\`sh
  npm run typeorm -- migration:create ./migrations/PublicItems
  \`\`\`

- **Run Migrations**: \`npm run typeorm:run-migrations\`
  \`\`\`sh
  npm run typeorm migration:run -- -d ./typeOrm.config.ts
  \`\`\`

- **Revert Migrations**: \`npm run typeorm:revert-migrations\`
  \`\`\`sh
  npm run typeorm migration:revert -- -d ./typeOrm.config.ts
  \`\`\`
`;
