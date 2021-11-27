# A demo to work with NestJS and TypeORM

### Used technologies and approaches:
- `NestJS`
- `SQLite 3`
- `TypeORM`
  - migrations
  - relations
  > See `npm run` commands in `package.json`: `migration:generate` and `migration:run`

### Basic functionality
1. Go to `localhost:3000`
2. See the database objects on the screen
   (`GET` request will be performed when loading the page and will return the db data).
3. The API methods are placed in the `src/app.service.ts`

    They aren't callable as this project is just a playground.