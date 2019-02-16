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

# Example GitHub workflow

1. Fork this repository by clicking "Fork" on the top right corner
2. Clone your fork to your machine,
  `git clone https://github.com/<YOUR GITHUB USERNAME>/libraryapp-hackathon-js-starthere`
3. Follow the installation steps in this readme file to run the app

## Make changes and save them to your local branch

Let's say you want to add a background image to the project

1. Create a local branch: `git checkout -b addBackgroundImage'
2. Make the changes and then save
3. Type `git status` to review what files are being changed
4. Type `git add .` to add ALL the changed files
5. Type `git commit -m "Adds a background image"`
6. Type `git push` to push the changes to your remote

## Remote repository setup

We suggest using two remote repositories:
- one called upstream, in our case `https://github.com/GirlsCodeMK/libraryapp-hackathon-js-starthere`
- one called origin, which is your fork `https://github.com/<YOUR GITHUB USERNAME>/libraryapp-hackathon-js-starthere`

You can check your remote(s) by running the following command in your command line / terminal:
`git remote -v`

You can add a remote by typing: `git add remote origin https://github.com/<YOUR GITHUB USERNAME>/libraryapp-hackathon-js-starthere`

Following the example above, this is how you would push your loca branch `addBackgroundImage` to your origin (fork):
`git push --set-upstream origin addBackgroundImage` 

From there you can create a pull request. The pull request will compare the changes you made to the existin code. Someone will review the code and then add it to the (upstream) master.

## Updating your remote

The upstream remote will update with every merged commit (this can be from you, or other contributors).

Using the setup suggested above, this is how you can keep your remote up-to-date:

1. To fetch all the changes, type: `git fetch upstream`
2. To incorporate those changes to your local master type: `git merge --ff-only upstream/master`
Now your local master is up-to-date. To make sure your origin (your fork) is up-to-date too, type:
3. `git push -f origin master`

To summarize: upstream (the girlscode master) > local master (the repository on your machine) > origin (your fork)

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
