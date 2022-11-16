# nodejs-gmp-main-task

# Task 3

## I. Main setup
* you have to have postgres server running locally
* copy `.env.example` to `.env` and put DB data in there

##  II. Create tables (3 way)
### 1. Use script `user.sql`
### 2. Use migration:
* run `npm run db:migrate` - this will make structure of your DB
* run `npm run db:seed` - this will add some data to your DB
### 3. Uncomment in `server.ts` line `await db.sync({ alter: true });` - this will make structure of your DB automatic


## III. App setup
* install dependencies by running `npm i`
* start by running `npm run start`
