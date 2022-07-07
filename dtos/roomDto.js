class RoomDto{

    id
    title
    description
    teamsName
    type
    user
    quiz
    countTeam
    progress
    isActive

    constructor(module) {

        this.id = module.id?module.id.toString():''
        this.title = module.title?module.title:''
        this.quiz = module.quiz?module.quiz:''
        this.user = module.user?module.user:''
        this.description = module.description?module.description:''
        this.teamsName = module.teamsName?module.teamsName:[]
        this.type = module.type?module.type:''
        this.countTeam = module.countTeam?module.countTeam:0
        this.progress = module.progress?module.progress:{}
        this.isActive = module.isActive?module.isActive:false

    }
}

module.exports = RoomDto