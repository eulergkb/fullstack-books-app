# Books Application
![Screenshot 2023-09-22 152100](https://github.com/eulergkb/fullstack-books-app/assets/145793447/37905f14-db40-4c43-9ae1-de26d697e5fb)

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

![Screenshot 2023-09-22 152039](https://github.com/eulergkb/fullstack-books-app/assets/145793447/c2749d7d-46b6-418e-bce6-44a78f49e225)

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
![Screenshot 2023-09-22 154721](https://github.com/eulergkb/fullstack-books-app/assets/145793447/0e6eca2c-5bbd-4f5b-8937-cb84a4daaca1)

