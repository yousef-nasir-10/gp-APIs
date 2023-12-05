const express = require('express')
const router = express.Router()

const {
    getAllProjects,
    createProject,
    getProject,
    deleteProject,
    updateProject,
    likeProject,
    unLikeProject,
    viewedProject,
    comment,
    getProjectComments,
    getProjectById,
    numViewedProject,
    getAllProjects1,top3Projects
} = require('../controllers/project') 

router.route('/').get(getAllProjects).post(createProject)
router.route('/search').get(getAllProjects1)
router.route('/top3').get(top3Projects)  
router.route('/:id').patch(updateProject).delete(deleteProject)
router.route('/:title').get(getProject)
router.route('/id/:id').get(getProjectById)
router.route('/like/:id').patch(likeProject)
router.route('/unlike/:id').patch(unLikeProject) 
router.route('/view/:id').patch(viewedProject).get(numViewedProject)
router.route('/comment/:id').put(comment).get(getProjectComments)   

module.exports = router 