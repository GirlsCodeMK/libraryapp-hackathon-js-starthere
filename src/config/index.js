module.exports = {
  development: {
    sessionSecret: 'girlscodemk'
  },
  production: {
    sessionSecret: process.env.SESSION_SECRET
  }
}
