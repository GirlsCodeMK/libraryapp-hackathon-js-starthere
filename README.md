# Requirements

1. NodeJS
2. NPM (comes installed with NodeJS)
3. PostgreSQL

If you want to deploy you'll also need:

1. A Heroku account
2. The Heroku CLI

# Install

1. Install dependencies with `npm install`
2. Create a file in the folder of the project called '.env', with content

```
DEV_DATABASE_URL=postgres://postgres@localhost:5432/girlscode_library_app
```

You may change this to 'postgres://username:password@localhost:5432/girlscode_library_app' if using different username/password than default.

3. Create the DB with `npx sequelize db:create`
4. Run the migrations with `npx sequelize db:migrate`

# Run

```
$ npm run dev
```
Open your browser and go to: `http://localhost:3000/`

# Making changes

Let's say you want to make a change/enhancement/extension to the app.

## Setup
You only need do this once.

Create a new `remote` link, called `upstream`, that points to the original repository. This will allow you to keep up to date with ongoing changes that others have made. (You have to do this on the command line: GitHub desktop doesn't support this.)
```
$ git remote add upstream https://github.com/GirlsCodeMK/libraryapp-hackathon-js-starthere.git
```

## Starting work
Before you start work, ask around to make sure no-one else is working on that feature!

1. Make sure your local copy of your repository is up-to-date by `fetch`ing any updates and `merge`ing them into your local repository.
```
$ git checkout master
$ git fetch upstream
$ git merge --ff-only upstream/master
```

2. Create and checkout a new branch for your feature. Call the branch anything you want, but you may want to include your name and/or the issue number (if you're addressing [an open issue on the project](https://github.com/GirlsCodeMK/libraryapp-hackathon-js-starthere/issues)).
```
$ git branch cool-feature
$ git checkout cool-feature
```
(You can do both of these steps as one with `git checkout -b cool-feature`)

3. Do some work on this feature. Make commits often, as is good Git practice.

4. Sooner or later (and preferably sooner), you'll want to `push` these commits to your own `origin` repository on Github. The _first_ time you do this, you need to tell Git to create a new branch in your remote `origin` repository on GitHub.
```
$ git push --set-upstream origin cool-feature
```

5. As you continue to work, make more commits and push them.
```
$ git push origin cool-feature
```

## Getting your changes accepted
Once you've finished your cool feature, it's time to get it accepted into the main project.

1. Check that the main `master` hasn't changed while you've been working.
```
$ git checkout master
$ git fetch upstream
$ git merge --ff-only upstream/master
```
As you've not changed our local copy of `master`, there should be no conflicts here.

2. Merge the newly-updated `master` into your feature branch
```
% git checkout cool-feature
% git merge master
```
(If you're feeling confident about what you're doing, you can `rebase` your changes instead of `merge`ing them.)

3. Fix any conflicts between your changes and the updates in `master`. Once you're done, commit the changes back to your feature branch. (Git is helpful here in guiding you through the process.)

4. Push your changes back up to your repository
```
$ git push origin cool-feature
```

5. On the GitHub website, find the big green "New pull request" button to ask for your changes to be included into main repository.

6. That's all you need do: someone else will look at your changes and advise you on what happens next. Your changes could be accepted as-is, or the review could suggest some improvements to make to your feature. 

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

3. Set a `SESSION_SECRET` environment variable

   ```
   $ heroku config:set SESSION_SECRET=mysecret
   ```

4. Do a deploy

   ```
   $ git push heroku master
   ```

5. Run the migrations (you'll need to do this if you add any more
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
- [x] HTML views for your loans, taking out a book
- [x] Return book
- [ ] Commented throughout
- [ ] Update user
- [ ] Delete user
- [ ] Some kind of permissions system, right now anyone can create a book.
- [ ] Check a book isn't already on loan before loaninng it out (race condition)
- [ ] Layout; navbar etc.?
- [x] Use a [more production ready session store](https://www.npmjs.com/package/express-session#compatible-session-stores).
- [ ] Tests
