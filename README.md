# nodejs-gmp-main-task

# Task 3

## I. DB setup
* you have to have postgres server running locally
* copy `.env.example` to `.env` and put DB data in there

###  - Create tables (2 way)
1. Use script `user.sql`
2. Uncomment in `server.ts` line `await db.sync({ alter: true });` - this will make structure of your DB automatic
<!-- * run `npm run db:migrate` - this will make structure of your DB
* run `npm run db:seed` - this will add some data to your DB -->

## II. App setup
* install dependencies by running `npm i`
* start by running `npm run start`
