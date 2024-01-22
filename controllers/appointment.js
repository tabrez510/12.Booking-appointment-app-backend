const Appointment = require('../models/appointment');

exports.getAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json([...appointments.map((appointment) => appointment.dataValues)]);
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

exports.getAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findByPk(appointmentId);

        if(appointment){
            res.json({success: true, ...appointment.dataValues});
        } else {
            res.status(404).json({success: false, message: 'Appointment not found'});
        }
    } catch (err) {
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.createAppointment = async (req, res) => {
    const { name, phone, email} = req.body;

    try {
        const newAppointment = await Appointment.create({name, phone, email});
        res.json({success: true, ...newAppointment.dataValues});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.editAppointment = async (req, res) => {
    const appointmentId = req.params.id;
    const { name, phone, email } = req.body;

    try {
        const updateAppointment = await Appointment.update({ name, phone, email }, {
            where: {
                id: appointmentId
            }
        });

        if(updateAppointment[0]){
            res.json({success: true, message: 'Appointment updated successfully', ...updateAppointment[0].dataValues});
        } else {
            res.status(404).json({success: false, message: 'Appointment not found'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

exports.deleteAppointment = async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const deleteAppointment = await Appointment.destroy({
            where: {
                id: appointmentId
            }
        })

        if(deleteAppointment) {
            res.json({success: true, message: 'Appointment deleted successfully', ...deleteAppointment.dataValues});
        } else {
            res.status(404).json({success: false, message: 'Appointment not found'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({success: true, message: 'Internal Server Error'});
    }
}