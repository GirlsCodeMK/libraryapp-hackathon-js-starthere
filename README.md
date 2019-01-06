# Requirements

1. NodeJS
2. NPM (comes installed with NodeJS)
3. PostgreSQL

If you want to deploy you'll also need:

1. A Heroku account
2. The Heroku CLI

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

# Deployment

1. Create Heroku app

   ```
   $ heroku apps:create
   ```

2. Add a PostgreSQL database

   ```
   $ heroku addons:add heroku-postgresql
   ```

3. Do a deploy

   ```
   $ git push heroku master
   ```

4. Run the migrations (you'll need to do this if you add any more
   migrations too)

   ```
   $ heroku run npx sequelize db:migrate
   ```

# TODO

- [x] Initial set up, communicating with PostgreSQL database.
- [x] Create/Read/Update/Delete books
- [x] Sign up
- [x] Sign in (sorta)
- [x] Deployment
- [x] Authentication framework (persisting sessions, basic auth?)
- [x] Sign out
- [x] List loans
- [x] Create loan
- [x] HTML views for books, sign up, sign in
- [ ] HTML views for your loans, taking out a book
- [ ] Commented throughout
- [ ] Return book
- [ ] Update user
- [ ] Delete user
- [ ] Use a [more production ready session store](https://www.npmjs.com/package/express-session#compatible-session-stores).
      This would also stop your session from clearing every time it restarts!
- [ ] Tests
