import loginRouter from './login';
import strategyRouter from './strategy';

export default  function loadRoutes (app) {
    app.use('/login', loginRouter)
    app.use('/strategy', strategyRouter)
};