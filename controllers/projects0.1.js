const Project = require('../models/project')
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({})
        //res.status(200).json({projects})
        //res.status(200).json({projects, amount:projects.length})
        res.status(200).json({status: 'sucess', data:{ projects ,nbHits:projects.length } })
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
        const{id:projectId} = req.params
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

module.exports = {
    getAllProjects,
    createProject,
    getProject,
    deleteProject,
    updateProject
}