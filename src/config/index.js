module.exports = {
  development: {
    sessionSecret: 'girlscodemk',
    // In days
    defaultLoanDuration: 14
  },
  production: {
    sessionSecret: process.env.SESSION_SECRET,
    defaultLoanDuration: 14
  }
};
