module.exports = {
  development: {
    username: 'gwcmk',
    password: null,
    database: "gwcmk-library-app",
    host: 'db',
    dialect: 'postgres',
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  },
  production: {
    // In production we'll use a configured environment variable.
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: false
  }
};
