// criar o arquivo de rotas para nao entulhar o server,js
const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);



routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);


// req.query acessar query params (usar em filtros)
// routes.get('/users', (req, res) => {
//   return res.json(
//     { idade: req.query.idade }
//   );
// });

//req.param acessar route params para editar/deletar
// routes.put('/users/:id', (req, res) => {
//   return res.json(
//     { id: req.params.id }
//   );
// });



// routes.delete('/users/:id', (req, res) => {
//   return res.json(
//     { message: "Deletado" }
//   );
// });

module.exports = routes;