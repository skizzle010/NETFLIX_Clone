const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Random
router.get("/random", verifyTokenAndAuthorization, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
