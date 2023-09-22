# Books Application

### Features
- Authentication / User registration / SignOut
- List , Create , Filter , Update And Delete Books
- Infinite loading of books
- Integration / E2E Tests


### Project Structure
- /frontend: UI (React + Typescript) 
- /backend: API (Node + Typescript)
- /cypress: E2E (Javascript) 
- /scripts: Database Initialization Scripts

### Requirements
- node (V16 preferred) / yarn (Local Development only)
- Docker

### How to run application (Using Docker)
- Make sure you have yarn installed (`npm install yarn -g`)
- Clone repository to desired location open terminal from the directory.
- Run command: `yarn start` or `npx yarn start`  (This will bootstrap application components using docker)
- Navigate to `http://localhost:3000` to see application running
- Proceed to register a new user account by enter your `username` , `first name` , `last name` and `password`.
- After registering you'll be redirected to the `dashboard` page where you can `add` , `delete` , `update` and see all created notes


### How to run application (Local Development)
- Clone repository using above technique
- Connect to MSSQL and Create a new database with name `BooksDB` (You can pull MSSQL image: `mcr.microsoft.com/mssql/server:latest`)
- Navigate to the `backend` directory and modify `DATABASE_URL` env variable in `.env` to `sqlserver://localhost:1433;database=BooksDB;integratedSecurity=false;username=<YOUR_USERNAME>;password=<YOUR_PASSWORD>;trustServerCertificate=true;encrypt=false`
- Navigate back to root folder and run `yarn run setup` and wait for command to finish installing all dependencies


### Integration Tests (Backend - Local Only)
#### NOTE: This can be run locally after running the application locally
- Setup test database in MSSQL Instance and update `DATABASE_URL` in .env file accordingly 
- Navigate to backend directory by running `cd backend` from root directory.
- Run the command `yarn run test:integration`


### E2E Tests (Local Only)
#### NOTE: This can be run locally after running the application locally
- Make sure application is running gracefully on your local environment
- In the root directory, run the command `yarn run test:e2e`
