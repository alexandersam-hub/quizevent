class StatisticDto{

    id
    quiz
    user
    count
    dates
    description
    ip

    constructor(model) {
        this.id = model.id? model.id.toString():''
        this.quiz = model.quiz.toString();
        this.user = model.user.toString();
        this.count = model.count;
        this.dates = model.dates;
        this.description = model.description;
        this.ip = model.ip
    }

}

module.exports = StatisticDto