class Quiz{
    id
    title
    description
    category
    img
    isActive


    constructor(model) {
        this.id = model.id? model.id.toString():''
        this.title = model.title;
        this.description = model.description;
        this.category = model.category
        this.img = model.img
        this.isActive = model.isActive

    }
}

module.exports = Quiz