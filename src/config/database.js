module.exports = {
  development: {
    username: null,
    password: null,
    database: 'girlscode_library_app',
    host: 'localhost',
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
