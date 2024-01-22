const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment');

router.get('/appointments', appointmentController.getAppointment);
router.get('/appointments/:id', appointmentController.getAppointmentById);
router.post('/appointments', appointmentController.createAppointment);
router.put('/appointments/:id', appointmentController.editAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;