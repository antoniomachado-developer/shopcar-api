import { Router } from 'express';
import multer from 'multer';
import AgendamentoController from './app/controllers/AgendamentoController';
import FileController from './app/controllers/FicheiroController';
import SigninController from './app/controllers/SignIn';
import SignupController from './app/controllers/SignupController';
import AgendaController from './app/controllers/AgendasController';
import authMiddleware from './app/middleware/auth';
import multerConfig from './config/multer';

const routes = new Router();

routes.get('/', async (req, res) =>
  res.status(200).json({
    autor: 'Freelancer Developer Of Angola',
    appName: 'ShopCar',
    version: '1.0',
    email: 'ulundoantonio@gmail.com',
  }),
);
routes.post('/signup', SignupController.store);
routes.post('/signin', SigninController.store);
routes.use(authMiddleware);
routes.put('/usuario/edit', SignupController.update);
const upload = multer(multerConfig);
routes.post('/agendamentos', AgendamentoController.store);
routes.get('/agendamentos', AgendamentoController.index);
routes.post('/file/upload', upload.single('file'), FileController.store);
routes.get('/agendas', AgendaController.index);
export default routes;
