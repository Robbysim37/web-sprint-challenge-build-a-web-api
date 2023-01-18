// add middlewares here related to projects
const projectModelFunctions = require("./projects-model")

const validateProjectID = (req,res,next) => {
    const id = req.params.id
    projectModelFunctions.get(id).then(project => {
        if(!project){
            res.status(404).json({message: "Project with given ID not found."})
        }else{
            req.foundProject = (project)
            next()            
        }
    })
}

const validateProjectData = (req,res,next) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: "Project needs a name and description."})
    }else{
        next()
    }
}

module.exports = {
    validateProjectID,
    validateProjectData
}