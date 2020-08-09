const express = require('express');
const router = express.Router();
const {toysModel,validToy} = require("../models/toys_model");
const { date } = require('@hapi/joi');

router.get('/', (req, res) =>
{
    toysModel.find({})
    .sort({_id:-1})
    .then(data =>
    {
        res.json(data)
    })
});

router.get('/single/:id', (req, res) =>
{
    toysModel.findOne({_id:req.params.id})
    .then(data =>
    {
        res.json(data)  
    })
    .catch(err =>
    {
        res.status(400).json(err)
    })
});

router.post("/add" , async(req,res) =>
{
    let dataBody = req.body;
    let toy = await validToy(dataBody);
    if(toy.error)
    {
        res.status(400).json(toy.error.details[0])
    }
    else
    {
        try
        {
            let saveData = await toysModel.insertMany([req.body]);
            res.json(saveData[0])     
        }
        catch
        {
            res.status(400).json({ message: "error insert new toy, already in data" })
        }
    }
})

router.post("/update",async(req,res) =>
{
    let dataBody = req.body;
    let toy = await validToy(dataBody);
    if(toy.error)
    {
        res.status(400).json(toy.error.details[0])
    }
    else
    {
        try
        {
            let updateData = await toysModel.updateOne({_id:req.body.id},req.body);
            res.json(updateData)      
        }
        catch
        {
            res.status(400).json({ message: "error cant find id" })
        }
    }
})

router.post("/del",(req,res) =>
{
    let delId = req.body.del
    toysModel.deleteOne({_id:delId})
    .then(data =>
    {
        if(data.deletedCount > 0 )
        {
            res.json({message:"deleted"});
        }
        else
        {
            res.status(400).json({error:"error id not found"});
        }
    })
})

router.get("/cat/:catId",(req,res) =>
{
    let catId = req.params.catId;
    toysModel.find({catcategory:catId})
    .then(data =>
    {
        res.json(data);
    })
    .catch(err =>
    {
        res.status(400).json(err)
    })
})

router.get("/search/",(req,res) =>
{
    const mySearch = new RegExp(`${req.query.q}`);
    toysModel.find({$or:[{name:mySearch},{cat:mySearch}]})
    .then(data =>
    {
        res.json(data)
    })
})

router.get("/price",(req,res) =>
{
    let min = req.body.min;
    let max = req.body.max;

    toysModel.find({price: {$gte:min , $lte:max}})
    .then(data =>
    {        
        res.json(data);
    })
})

module.exports = router;