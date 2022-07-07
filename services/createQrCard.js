const pdf = require('html-pdf');
const pdfTemplate = require('../document');
const qr = require('qr-image');

class createQrCard{

    async generateQr(token){
        // const url = await QRCode.toDataURL('Hello World !')
        // return `<img src='${url}'/></div>`

        const  svg_string = qr.imageSync(token, { type: 'svg' });
        return svg_string
    }

    async createQrCard(username, password, token){
        const qr = await this.generateQr(token)
        pdf.create(pdfTemplate({username, password, qrCode:qr}), {
            "height": "100mm",        // allowed units: mm, cm, in, px
            "width": "60mm",


        }).toFile('./cards/'+ username +'.pdf', (err) => {

            if(err) {
                console.log(err)
               return false
            }
            return true
        });
    }

}

module.exports = new createQrCard()