import express from "express";
import { Post } from "../models/Post.js";

const router = express.Router();

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({ status: "success", message: "post created!", data: savedPost });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message, data: null });
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({ status: "success", message: "updated successfully", data: updatedPost });
      } catch (err) {
        res.status(500).json({ status: "false", message: err.message, data: null });
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const deletedPost = await post.deleteOne();
        res.status(200).json({ status: "success", message: "deleted successfully", data: deletedPost });
      } catch (err) {
        res.status(500).json({ status: "false", message: err.message, data: null });
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { updatedAt, __v, ...others } = post._doc;
    res.status(200).json({ status: "success", message: "post returned successfully!", data: others });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message, data: null });
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  let posts;
  try {
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    // TODO: NOTE: as we want to skip some fields
    posts = posts.map((post) => {
      const { updatedAt, __v, ...others } = post._doc;
      return others;
    });
    res.status(200).json({
      status: "success",
      result: posts.length,
      message: "posts returned successfully!",
      data: posts,
    });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message, data: null });
  }
});

export { router as postRoute };
