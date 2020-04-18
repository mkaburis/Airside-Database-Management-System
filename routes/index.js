// routes/index.js
const flightsRouter = require('./flights');
const passengerRouter = require('./passenger');
const employeeRouter = require('./employee');
const loginRouter = require('./login');

module.exports = (app) => {
  app.use('/employee', employeeRouter);
  app.use('/flights', flightsRouter);
  app.use('/passenger', passengerRouter);
  app.use('/login', loginRouter);
};
