# Requirements

1. NodeJS
2. NPM or Yarn (NPM comes with NodeJS)
3. PostgreSQL

# Install

1. Install dependencies with `npm install`
2. Create the DB with `npx sequelize db:create`
3. Run the migrations with `npx sequelize db:migrate`

# Run

```
$ npm run dev
```

# API documentation

As well as some comments in the code, you can also open the [Paw][paw] or
[Postman][postman] API collections to view example requests.

[paw]: https://paw.cloud/
[postman]: https://www.getpostman.com/

# TODO

- [x] Initial set up, communicating with PostgreSQL database.
- [x] Create/Read/Update/Delete books
- [ ] CRUD users (potentially including an authentication framework?)
- [ ] CRUD loans
- [ ] Deployment
- [ ] Commented throughout
- [ ] Tests
