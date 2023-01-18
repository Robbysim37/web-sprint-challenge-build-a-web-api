// add middlewares here related to projects
const projectModelFunctions = require("./projects-model")

const validateProjectID = (req,res,next) => {
    const id = req.params.id
    projectModelFunctions.get(id).then(project => {
        if(project){
            req.foundProject = (project)
            next()
        }else{
            res.status(404).json({message: "Project with given ID not found."})
        }
    })
}

const validateProjectData = (req,res,next) => {
    if(req.body.name && req.body.description){
        next()
    }else{
        res.status(400).json({message: "Project needs a name and description."})
    }
}

const validateProjectCompleted = (req,res,next) => {
    if(req.body.completed){
        next()
    }else{
        res.status(400).json({message: "Project must be completed."})
    }
}

module.exports = {
    validateProjectID,
    validateProjectData,
    validateProjectCompleted
}