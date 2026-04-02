const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'TU_CORREO@gmail.com',
        pass: 'TU_PASSWORD'
    }
});

exports.sendEmail = async (to, book) => {
    await transporter.sendMail({
        from: 'BookApp',
        to,
        subject: 'Nuevo Libro',
        text: `Tu libro ${book} fue registrado`
    });
};