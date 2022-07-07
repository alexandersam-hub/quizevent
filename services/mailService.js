const mailer = require('nodemailer')
require('dotenv').config()

class MailService {
    constructor() {
        this.transporter = mailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendInformationUser(toMail) {
        try{

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: toMail,
            subject: 'Родные игры.ч ',
            text: '',
            html: `
            <div>
                <h1>Команда Родные Игры</h1>
                <div>Ваша заявка принята</div>
            </div>
            `
        })
        return {warning: false}
        }catch (e) {
            return {warning:true, message:'Ошибка отправки письма ользователю'}
        }
    }

    async sendInformationSupportService(name, text, mail, isWarning) {
        try {

            const messageToUser = isWarning ? 'Сообщение о подтверждении заявки пользователю не удалось отправить' : 'Подтверждение отправлено пользователю'
            await this.transporter.sendMail({
                from: process.env.MAIL_SUPPORT,
                to: process.env.MAIL_SUPPORT,
                subject: 'Викторина. Обратная связь.',
                text: '',
                html: `
            <div>
            <h1>Поступила заявка через форму обратной связи</h1>
            <div>Имя пользователя: ${name}</div>
             <div>Электронная почта: ${mail}</div>
             <div>Текст сообщения:</div>
             <div>${text}</div>
             <hr/>
             <div>${messageToUser}</div>
</div>
            `
            })
            return {warning: false}
        } catch (e) {
            return {warning: true, message: 'Ошибка отправки письма в службу тех поддержки'}
        }
    }

}

module.exports = new MailService()