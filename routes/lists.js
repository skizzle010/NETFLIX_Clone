const express = require("express");
const router = express.Router();
const List = require("../models/List");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {

    const newList = new List(req.body);
  try {
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) { 
    res.status(500).json(err);
    console.log(err)
  }
});


//Delete
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await List.findByIdAndDelete(req.params.id)
        res.status(200).json("List has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//Get
router.get("/",verifyTokenAndAuthorization,async(req,res)=>{
    const typeQuery = req.query.type
    const genreQuery = req.query.genre
    let list = []
    try{
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample: {size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}}
                ])
            }
            else{
                list = await List.aggregate([
                    {$sample: {size:10}},
                    {$match:{type:typeQuery}}
                ])
            }
        }
        else{
            list = await List.aggregate([{$sample:{size:10}}])
        }
        res.status(200).json(list)
    }catch(err){
        res.status(500).json(err)
    }

})




module.exports = router;