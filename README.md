<p align="center">
  <a href="https://github.com/nuri35/nest-101/blob/master/img/genetic.png" target="blank"><img src="https://github.com/nuri35/nest-101/blob/master/img/genetic.png" width="600" height="400" alt="Nest Logo" /></a>
</p>
 
## Description 
  - Reusability and genetic algorithm
  
      - The genetic algorithm is a search heuristic that mimics the process of natural selection. This heuristic is routinely used to generate useful solutions to optimization and search problems. Genetic algorithms belong to the larger class of evolutionary algorithms (EA), which generate solutions to optimization problems using techniques inspired by natural evolution, such as inheritance, mutation, selection, and crossover.

In this case study, a study was conducted to create the best lesson plan using a genetic algorithm. By using a modular structure in this study, the reusability of the code was ensured.


## Project File Structure

```
└── src
    ├── app.module.ts
    ├── main.ts
    ├── modules
    │   ├── schedule
    │   │   ├── schedule.module.ts
    │   │   ├── schedule.controller.ts
    │   │   ├── schedule.service.ts  
    │   │       ├── dto
    │   │       │   ├── lookup.dto.ts
    ├── shared
    │   ├── http-exception.filter.ts
    │   └── ...
    └── config
    │    └── db.config.ts
    │──  interceptors
    │    └──  serialize.interceptor.ts
    │──  subscribers
    │    └──  every.event.subscriber.ts
    │──  repository
    │    └──  schedule.repo.ts
    │──  inheritance
    │    └──  algorithms
    │          └──  genetic-alg.ts
    │    └──  bestSchedule.ts
    │──  entities
    │    └──  schedule.entity.ts
    │──  decorators
    │    └──  response.message.ts
    │    └──  try.catch.ts

```

### Endpoints -

1. **Schedule Endpoint:**
  - **Endpoint:**   `/api/v1/schedules`
  - **Method:**     `POST`

2. **Get All Schedule Endpoint:**
  - **Endpoint:**   `/api/v1/schedules`
  - **Method:**     `GET`
    - **Request Query:** 
    ```json
    {
      "limit": "---",
      "page": "----", 
    }
    ```
  


## Swagger Documentation

- **Swagger UI:** The project's API documentation is generated using Swagger. Swagger is a tool used to automatically generate and serve API documentation.  

-  **URL:** `http://localhost:8000/api/v1/docs`

 
 

 ## Features with TypeORM

- **Custom Repositories:** Custom repositories were utilized for database operations.

- **Transactions:** Transactions were used to manage operations atomically.

- **Entity Listeners and Subscribers:** Entity listeners and subscribers were employed to define custom behaviors that will automatically execute during database operations.


## Response Models Using DTOs

- **DTOs for Response:** Data Transfer Objects (DTOs) were employed for defining response models.

  - Objects specified in DTOs: The objects defined in DTOs were returned as responses, providing a structured and tailored data format to clients.

   
- ### Ways to run the application
    #1:) for local development  

    - ### Package installation
        - When we run our project with Docker in the production environment or locally, global packages will be installed automatically. Entering these commands is sufficient only for our team members who will run it for the first time locally without docker.
            - ``git clone or git pull``
            - ``npm i``
            - please check the `.env` file for the environment variables. if it not exist please create it.
            - ``npm run start:dev``

        - requiremet env value for local development
            - DB_NAME=postgres
            - SYNCHRONIZE=true
            - DB_HOST=localhost
            - DB_PORT=5432
            - DB_PASS=postgres
            - DB_USER=postgres
            - DB_NAME=postgres
            - COOKIE_KEY=usYvcPuTTZnafZKrEDIi
            - DB_TYPE=postgres
            - MIGRATIONS_RUN=true
            - LOGGING=true

  

- ### Data Initialization
    - Data for classrooms, levels, subjects, and teachers is populated in the database using migrations. The following commands are used to manage migrations:
        - Create Migration: `npm run typeorm:create-migration`
        - Run Migrations: `npm run typeorm:run-migrations`
        - Revert Migrations: `npm run typeorm:revert-migrations`



 
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## Contact

Nurettin Şen - [ ](gmail.com) - nurie487@gmail.com
 