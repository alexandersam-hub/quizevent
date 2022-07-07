

class SupportDto{

    id
    userId
    username
    mail
    text
    description
    isSend
    isFinished

    constructor(model) {
        this.id = model.id? model.id.toString():''
        this.userId = model.userId
        this.username = model.username;
        this.mail = model.mail;
        this.text = model.text;
        this.description = model.description;
        this.isSend = model.isSend;
        this.isFinished = model.isFinished
    }

}

module.exports = SupportDto