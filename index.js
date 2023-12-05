const express = require('express')
const app = express()
const projects = require('./routes/project')
const connectDB = require('./db/connect')
const cors = require('cors')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const user = require('./routes/user')
const files = require('./routes/file')
const issue = require('./routes/issue')
require('./pdfExtraction')





// midleware 
app.use(express.json())
app.use(cors({
    origin: ["https://gradution-project-vite.vercel.app"],
   
    

}))    
  


 
// routes
app.use('/api/v1/projects', projects)  
app.use('/api/v1/user-login', user)   
app.use('/api/v1/files', files)   
app.use('/api/v1/issue', issue)   
app.use(notFound)  
app.use(errorHandler)

  
const port = process.env.PORT || 2000     

const start = async () =>{
    try {
        await connectDB(process.env.MANGO_URI)
        .then(()=> console.log('Connected to the DB...'))
        .catch((err)=> console.log(err)) 
        app.listen(port, console.log(`Server running on port ${port}`))
        

    } catch (error) {
        console.log(error); 
    }  
}
 
start()      