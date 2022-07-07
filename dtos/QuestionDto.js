class QuestionDto{

    id
    title
    text
    quiz
    img
    price
    type
    answer
    video
    isActive

    constructor(model) {
        this.id = model.id? model.id.toString():'';
        this.title = model.title;
        this.text = model.text;
        this.quiz = model.quiz? model.quiz.toString():''
        this.img = model.img;
        this.type = model.type;
        this.price = model.price?model.price:0;
        this.answer = model.answer;
        this.video = model.video;
        this.isActive = model.isActive
    }

}

module.exports = QuestionDto