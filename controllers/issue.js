const Issue = require('../models/issues')

const creatIssue = async(req, res) =>{
    try {
        const issue = await Issue.create(req.body)
        res.status(200).json({issue})
    } catch (error) {
        res.status(500).json({msg: error})
    } 

}

const try1 = async(req, res) =>{
    try { 
        const issue = await Issue.
        findOne({title: "go2"})
        .populate('sentBy')
        .exec()

        let res1 = {
            title: issue.title,
            description: issue.description,
            date: issue.date,
            sentBy: {
                id: issue.sentBy.id,
                firstName: issue.sentBy.firstName,
                lastName: issue.sentBy.lastName,
                email: issue.sentBy.email
            }
        }
 
        res.status(200).json({res: res1})
        
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


module.exports = {
    creatIssue,
    try1
}