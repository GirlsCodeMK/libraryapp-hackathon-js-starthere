# Notes

## docker-compose

### articles / reference

* [Heroku devcenter on docker-compose](https://devcenter.heroku.com/articles/local-development-with-docker-compose)
* [CodeShip article on using docker-compose with nodejs](https://blog.codeship.com/using-docker-compose-for-nodejs-development/) ([part 2](https://blog.codeship.com/using-codeship-for-nodejs-application-deployments/))
* [docker-compose official documentation](https://docs.docker.com/compose/overview/)

### useful cli commands

These need to be run from the same directory where `docker-compose.yml` is.

* `docker-compose up -d`

  Start all services in the background (also restarts the ones that changed)

* `docker-compose log [-f] <service>`

  Shows all console output of a service

  if using `-f` (follow), it keeps watching for new outputs

* `docker-compose ps`

  Show status of all services

* `docker-compose exec <service> [options] <cli command>`

  Runs <cli command> in the already running container of <service>. Needs
  <service> to be up already.

  Examples:
  * `docker-compose exec db psql -h db -U gwcmk -d gwcmk-library-app`

    opens a PosrtgreSQL shell against the development database

  * `docker-compose exec web npx sequelize db:migrate`

    runs any cli command in the node app's container as if running it in a terminal 'normally'.

* `docker-compose run <service> --rm [options] <cli command>`

  Similar as `docker-compose exec`, but runs the command in a new container,
  then discards the container. Slower than `exec**, but can run even if the
  service is not started or down.

## heroku

### cli commands

* `heroku login`
* `heroku create --region eu`
* `heroku addons:create heroku-postgresql:hobby-dev --as=DATABASE`
* `heroku container:login`
* `heroku config:set NODE_ENV=production`
* `git push heroku master` or `git push heroku <current-branch>:master`
* `heroku logs -d web`
* `heroku run NODE_ENV=production npx sequelize db:migrate`
