const express= require ("express");
const router= express.Router();
const projects= require("./projects-model")

router.get("/",(req,res)=>{
    projects.get(req.query.id)
    .then(project=>{
        console.log("api/projects functional")
        res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"Projects not found."})
    })
})
router.get("/:id", (req, res) => {
    const project = projects.get( req.params.id )
    if( project ){
        project.then( project => {
            res.status( 404 ).json( project )
        })
    }else{
        project.catch( () => {
            res.status( 404 ).json({
                message: `project with id of ${req.params.id} not found.`
            })
        })
    }
})

router.get("/:id/actions",((req,res)=>{
    if(!req.params.id){
        
    res.status(404).json({error:"Could not find project with this ID."})}
    projects.getProjectActions(req.params.id)
    .then(project=>{res.status(200).json(project)})
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"server error occured"})
    })
}))

router.post("/",((req,res)=>{
    if(!req.body.name || !req.body.description){res.status(400).json({error:"description and name required"})}
    projects.insert(req.body)
    .then(project=>{
        console.log('this is working')
        res.status(201).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Server error"})
    })
}))

router.put("/:id", (req, res ) => {
    const project = projects.get(req.params.id)
    if( !project ){
        res.status( 404 ).json({message: 'project not found'})
    }else{
        if(!req.body.name || !req.body.description){
            res.status(400).json({message:"no bueno senor"})
        }else{
            projects.update(req.params.id, req.body)
            .then(project =>{
                res.status( 200 ).json(project)
            })
            .catch( () => {
                res.status( 400 ).json({message:'server error'})
            })
        }
        
    }  
})

router.delete("/:id",((req,res)=>{
    const project = projects.get(req.params.id)
    if( !project ){
        res.status( 404 ).json({message: 'project not found'})
    }else{
        projects.remove(req.params.id)
            .then(() =>{
                res.status( 404 ).json({message: "project deleted."})
            })
            .catch( () => {
                res.status( 500 ).json({message:'server error'})
            })
    }
}))

module.exports = router;