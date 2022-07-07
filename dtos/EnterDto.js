class EnterDto{

    id
    user
    dates
    description


    constructor(model) {
        this.id = model.id?model.id.toString():''
        this.user = model.user?model.user:'';
        this.dates = model.dates?model.dates:[];
        this.description = model.description?model.description:'';

    }

}

module.exports = EnterDto