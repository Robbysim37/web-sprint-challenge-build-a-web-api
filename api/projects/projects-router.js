// Write your "projects" router here!
const express = require("express")
const router = express.Router()
const projectModelFunctions = require("./projects-model")
const customMiddleware = require("./projects-middleware")

const validateProjectID = customMiddleware.validateProjectID
const validateProjectData = customMiddleware.validateProjectData

router.get("/", (req, res) => {
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

module.exports = router