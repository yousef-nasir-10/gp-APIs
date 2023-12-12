const { text } = require('express');
const multer = require('multer');
const PdfParse = require('pdf-parse');



const getFile = async(req, res) => {  
    try {
        let sampleFile = req.files.pdfPoject;
        console.log(sampleFile);
        PdfParse(sampleFile).then(function (data){ 
            // console.log(data.numrender);
            console.log(data.text);
            
            res.status(200).json({msg: "ok", data:data.text }) 
             
        })  
  
    } catch (error) {
        res.status(500).json({msg: error}) 
 
    }

}

module.exports = {
    getFile,
}