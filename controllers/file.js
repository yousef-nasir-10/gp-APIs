const { text } = require('express');
const multer = require('multer');
const PdfParse = require('pdf-parse');



const getFile = async(req, res) => {  
    try {
        // const {file} = req.body
        let sampleFile;
        // console.log(req.body);
        // console.log(req.method);
        sampleFile = req.files.avatar;

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