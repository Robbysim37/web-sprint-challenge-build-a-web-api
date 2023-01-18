// Write your "projects" router here!
const express = require("express")
const router = express.Router()
const projectModelFunctions = require("./projects-model")
const customMiddleware = require("./projects-middleware")

const validateProjectID = customMiddleware.validateProjectID
const validateProjectData = customMiddleware.validateProjectData
const validateProjectCompleted = customMiddleware.validateProjectCompleted

router.get("/", (req, res) => {
    console.log("hits the endpoint")
    projectModelFunctions.get().then(projectsArr => {
        res.status(200).json(projectsArr)
    })
})

router.post("/", validateProjectData, (req, res) => {
    projectModelFunctions.insert(req.body).then(newProject => {
        res.status(201).json(newProject)
    })
})

router.get("/:id", validateProjectID, (req, res) => {
    res.status(200).json(req.foundProject)
})

router.put("/:id", validateProjectID, validateProjectData, (req, res) => {
    const id = req.params.id
    projectModelFunctions.update(id,req.body).then(changedProject => {
        res.status(200).json(changedProject)
    })
})

router.delete("/:id", validateProjectID, (req, res) => {
    const id = req.params.id
    projectModelFunctions.remove(id)
})

module.exports = router