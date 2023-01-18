// add middlewares here related to actions
const actionsModelFunctions = require("./actions-model")

const validateActionID = (req,res,next) => {
    const id = req.params.id
    actionsModelFunctions.get(id).then(action => {
        if(!action){
            res.status(404).json({message: "Action with given ID not found."})
        }else{
            req.foundAction = action
            next()            
        }
    })
}

const validateActionData = (req,res,next) => {
    if(!req.body.notes || !req.body.description || !req.body.project_id){
        res.status(400).json({message: "Action needs a name and description."})
    }else{
        next()
    }
}

module.exports = {
    validateActionID,
    validateActionData
}

