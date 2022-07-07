
class DescriptionGameDto{
    id
    name
    img

    constructor(dateGame) {

        this.id = dateGame.id?dateGame.id.toString():'new'
        this.name = dateGame.name
        this.img = dateGame.img
    }

}
module.exports = DescriptionGameDto