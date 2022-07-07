const categoryService = require('../services/categoryService')

class CategoryController{

    async getCategory(req,res){
        try{
            const result = await categoryService.getCategory()
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async addCategory(req,res){
        try{
            const {category} = req.body
            if(category){
                const result = await categoryService.addCategory(category)
                return res.json(result)
            }else
                return res.json({warning:true, message:'Не все данные заполнены верно'})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async updateCategory(req,res){
        try{
            const {category} = req.body
            if(category){
                const result = await categoryService.updateCategory(category)
                return res.json(result)
            }else
                return res.json({warning:true, message:'Не все данные заполнены верно'})

        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async delCategory(req,res){
        try{
            const {id} = req.body
            if(id){
                const result = await categoryService.delCategory(id)
                return res.json(result)
            }else
                return res.json({warning:true, message:'Не все данные заполнены верно'})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

}

module.exports = new CategoryController()