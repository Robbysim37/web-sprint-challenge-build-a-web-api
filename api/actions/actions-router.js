// Write your "actions" router here!
const express = require("express")
const router = express.Router()
const actionsModelFunctions = require("./actions-model")
const customMiddleware = require("./actions-middlware")

const validateActionID = customMiddleware.validateActionID
const validateActionData = customMiddleware.validateActionData


router.get("/", (req, res) => {
    actionsModelFunctions.get().then(actionsArr => {
        res.status(200).json(actionsArr)
    })
})

router.post("/", validateActionData, (req, res) => {
    actionsModelFunctions.insert(req.body).then(newAction => {
        res.status(201).json(newAction)
    })
})

router.get("/:id", validateActionID, (req, res) => {
    res.status(200).json(req.foundAction)
})

router.put("/:id", validateActionID, validateActionData, (req, res) => {
    const id = req.params.id
    actionsModelFunctions.update(id,req.body).then(changedAction => {
        res.status(200).json(changedAction)
    })
})

router.delete("/:id", validateActionID, (req, res) => {
    const id = req.params.id
    actionsModelFunctions.remove(id).then(response => {
        res.status(200).json()
    })
})

module.exports = router