const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path');

class ImagesController{

    async uploadImages(req,res){
        try{
            const randomString = uuid();
            const localStoragePath =   path.join(__dirname, '../', '/public/images')
        // console.log(req.body)
            const stream = fs.createWriteStream(`${localStoragePath}/${randomString}.png`);
            stream.on('finish', function () {
                return res.json({warning:false, data:{img:`${process.env.URL_SERVER}/api/image/get/${randomString}.png`}});
            });
            stream.write(Buffer.from(req.body.img), 'utf-8');
            stream.end();
        }
        catch (e) {
            return  res.json({warning:false, message:'Не дулось загрузить картинку'});
        }

    }

    async uploadSvg(req,res){
        try{
            const randomString = uuid();
            const localStoragePath =   path.join(__dirname, '../', '/public/images')
            // console.log(req.body)
            const stream = fs.createWriteStream(`${localStoragePath}/${randomString}.svg`);

            stream.on('finish', function () {

                return res.json({warning:false, data:{img:`${process.env.URL_SERVER}/api/image/get/${randomString}.svg`}});


            });
            stream.write(Buffer.from(req.body.img), 'utf-8');
            stream.end();
        }
        catch (e) {
            return  res.json({warning:false, message:'Не удалось загрузить svg'});
        }

    }

    async getImages(req,res){
        // console.log('get image',req.params.id)
        try{
            fs.readFile('./public/images/'+req.params.id,(err, data)=>{
                if (err) {
                    // console.log(err)
                    return res.end('404')
                }
                res.statusCode = 200;
                const lastString = req.params.id.substr(req.params.id.length - 3); // => "Tabs1"
                if (lastString === 'png')
                    res.setHeader("Content-Type", "image/png");
                else if(lastString === 'svg')
                    res.setHeader("Content-Type", "image/svg+xml");
                // console.log(fileSize, data)
                res.end(data)
            })
        }catch (e) {
            return res.statusCode(404).json({warning:'not image'})
        }

    }


    async getImagesList(req,res){
        return res.end('hello')
    }
}

module.exports = new ImagesController()