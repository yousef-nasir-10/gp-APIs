const  mongoose  = require('mongoose')
const Project = require('../models/project')

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({})
        res.status(200).json({projects})
        //res.status(200).json({projects, amount:projects.length})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
} 

const createProject = async(req, res) =>{
    try {
        const project = await Project.create(req.body)
        res.status(200).json({project})
    } catch (error) {
        res.status(500).json({msg: error})
    } 
    
}

const getProject = async(req, res) =>{
    try {
        const{title:projectTitle} = req.params
        console.log(projectTitle);
        const project = await Project.findOne({title: projectTitle})
        if(!project){
            return res.status(404).json({msg: `No task with id : ${taskID}}`})

        }
        res.status(200).json({project})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
} 
const getProjectById = async(req, res) =>{
    try { 
        const{id:projectId} = req.params
        console.log(projectId);
        const project = await Project.findOne({_id: projectId})
        if(!project){
            return res.status(404).json({msg: `No task with id : ${taskID}}`})

        }
        res.status(200).json({project})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
} 

const deleteProject = async(req, res) => {
    try {
        const{id:projectId} = req.params
        const project = await Project.findOneAndDelete({_id: projectId})
        if(!project){
            return res.status(404).json({msg: `No task with id : ${taskID}}`})

        }
        res.status(200).json({task: null, status: 'perfect'})
    } catch (error) {
        res.status(500).json({msg: error})
    }
    
}

const updateProject = async(req, res) =>{
    try {
        const{id:projectId} = req.params
        const project = await Project.findOneAndUpdate({_id: projectId}, req.body, {
            new: true,
            runValidators: true
        })

        if(!project){
            return res.status(404).json({msg: `No task with id : ${taskID}}`})

        }
        res.status(200).json({project})
    } catch (error) {
        res.status(500).json({msg: error})
    } 
}

const likeProject = async(req, res) =>{

    try {
        const{id:projectId} = req.params
        console.log(projectId);
        console.log(req.body.id);
        

        const project = await Project.findOneAndUpdate(
        {_id: projectId}, {
            
            $push: {like: req.body.id}
        }, {
            new: true,
            runValidators: true
        })

        if(!project){
            return res.status(404).json({msg: `No project with id : ${projectId}}`})

        }
         
        res.status(200).json({project})

    } catch (error) {
        res.status(500).json({msg: error})
    } 

}

const unLikeProject = async(req, res) =>{

    try {
        const{id:projectId} = req.params
        
        console.log(req.body.id);
        console.log(projectId);
        

        const project = await Project.findOneAndUpdate({_id: projectId}, {
            $pull: {like: req.body.id}
        }, {
            new: true,
            runValidators: true
        })

        

        if(!project){
            return res.status(404).json({msg: `No task with id : ${projectId}}`})

        }else{

        }
        
        res.status(200).json({project})

    } catch (error) {
        res.status(500).json({msg: error})
    } 

}

const viewedProject = async(req, res) =>{

    try {
        const{id:projectId} = req.params
        
        console.log(req.body.id);
        console.log(projectId);

        const project = await Project.findOneAndUpdate({_id: projectId},
            {
            $push: {view: req.body.id}
        }, {
            new: true,
            runValidators: true  
        })

        if(!project){
            return res.status(404).json({msg: `No task with id : ${projectId}}`})

        }
        
        res.status(200).json({project})

    } catch (error) {
        res.status(500).json({msg: error})
    } 

}
const numViewedProject = async(req, res) =>{

    try {
        const{id:projectId} = req.params
        
        console.log(req.body.id);
        console.log(projectId);
        const project = await Project.findOneAndUpdate({_id: projectId})
        console.log(project);
        if(!project){
            return res.status(404).json({msg: `No task with id : ${projectId}}`})

        }
        
        res.status(200).json({project})

    } catch (error) {
        res.status(500).json({msg: error})
    } 

}

const comment = async(req, res) =>{

    try {
        let comment = req.body
        // console.log(comment);
        const{id:projectID} = req.params
        const project = await Project.findOneAndUpdate({_id: projectID}, {
            $push: {comments: {
                text: req.body.text,
                sentBy:  req.body.sentBy 
            }}
        }, {
            new: true,
            runValidators: true
        })

        

        if(!project){
            return res.status(404).json({msg: `No task with id : ${projectTitle}}`})

        }
        
        res.status(200).json({project})
   


    } catch (error) {
        res.status(500).json({msg: error})
    } 

}
const top3Projects = async (req, res) => {
    try {
        
        const top3 = await Project.aggregate([
            {
              $addFields: {
                arrayLength: { $size: '$like' }, // Calculate array length
              },
            },
            { $sort: { arrayLength: -1 } }, // Sort by array length (descending)
            { $project: { arrayLength: 0 } }, // Remove the added field if not needed
          ]).limit(3)
          res.status(200).json({ top3, nbHits: top3.length })

    } catch (error) {
        res.status(500).json({msg: error})
    }


    
}

const getAllProjects1 = async (req, res) => {
    let projects = 'const'
    // 1. Find based on whatever passed in the query //
    projects = await Project.find(req.query)

    // 2. Find based on chosen parmaters //
    const {isCompleated, title, catagory, sort, fields, numericFilters} = req.query // the allowed set of parameters 
    const queryObject = {} // object that conatins all properties have been used initially no query is used

    // 2.1 find by company if comapny property exist 
    if(isCompleated){
        queryObject.isCompleated = isCompleated === 'true'? true: false 
    }

    // 2.2 find by company if company property exist 
    if(catagory){
        queryObject.catagory = catagory  
    }

    // 2.3 find by name if name property exist 
    if(title){
        queryObject.title = {$regex: title, $options: 'i'} // regex: to check if search value within a string
    }

    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`) 

        const options  = ['price', 'rating' ]
        filters = filters.split(',').forEach( item => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator] : Number(value) }
            }
        })
        console.log(filters);
    }


    console.log(queryObject);
    let result = Project.find(queryObject)
    // 2.4 sort based on the cratirea user went with. if no, then by defult sort based on creation date. 
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        
       
    }else{
        result = result.sort('createdAt')
    }
    // 2.5 fields chosen to be shown or displayed. 
    if(fields){
        fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit
    result = result.skip(skip).limit(limit)
    projects = await result

    res.status(200).json({ projects, nbHits: projects.length })


}






const getProjectComments = async(req, res) =>{
    const{id:projectID} = req.params
    console.log("here");

    try {
        const project = await Project.
        findOne({_id: projectID})
        .populate('comments.sentBy')
        .exec()
        let arr = []

        project.comments.forEach(comment => {
            let coment = {
                text: comment.text,
                created : comment.created,
                userId : comment.sentBy.id,
                firstName: comment.sentBy.firstName,
                lastName: comment.sentBy.lastName
            }

            arr.push(coment)
            
        });
        // console.log(project);

        res.status(200).json({comments: arr})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }

    

}





module.exports = {
    getAllProjects,
    createProject,
    getProject,
    getProjectById,
    deleteProject,
    updateProject,
    likeProject,
    unLikeProject, 
    viewedProject, 
    numViewedProject,
    comment,
    getProjectComments, 
    getAllProjects1,
    top3Projects
}