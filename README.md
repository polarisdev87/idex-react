# Pipeline

## Running the Backend
1. Install Maven
2. Install Java
3. Install Postgres
4. Run PostgreSQL
5. Create a Postgres database to hold the data, such as pipeline_test
6. Navigate to the backend directory in your terminal
7. Run `mvn spring-boot:run -DPIPELINE_DB=pipeline_test -DPIPELINE_DB_USER=postgres -DPIPELINE_DB_PASS=postgres`
8. The backend is now running at `localhost:8080`

## Running the Frontend
1. Navigate to the frontend irectory in your terminal
2. `npm install`  (node version => 7.8.0 )
3. `npm start`
4. In your browser got to `localhost:3000`