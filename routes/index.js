// routes/index.js
const flightsRouter = require('./flights');
const passengerRouter = require('./passenger');
const employeeRouter = require('./employee');
const profileRouter = require('./profile');
const loginRouter = require('./login');
const staffDashRouter = require('./staffDashboard');
const pageRoutesRouter = require('./pageRoutes');

module.exports = (app) => {
  app.use('/', pageRoutesRouter);
  app.use('/api/employee', employeeRouter);
  app.use('/api/flights', flightsRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/passenger', passengerRouter);
  app.use('/api/auth', loginRouter);
  app.use('/api/staffDashboard', staffDashRouter);
};
