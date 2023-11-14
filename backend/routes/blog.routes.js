let mongoose = require('mongoose');
let express = require('express');
const bcrypt = require('bcryptjs');
let router = express.Router();

let foodSchema = require("../models/blog");
let userSchema = require("../models/user");

router.route("/").get(async (req, res, next) => {
  await foodSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched",
        status: 200,
      });
    })
    .catch(err => {
      return next(err);
    });
});

/*  */
router.route("/latest").get(async (req, res, next) => {
  try {
    const foodResults = await foodSchema.find();
    const userPromises = foodResults.map(async (e) => {
      const otherResult = await userSchema.findOne({ username: e.author });
      return otherResult;
    });
    const users = await Promise.all(userPromises);

    res.json({
      data: foodResults,
      users: users,
      message: "All items successfully fetched",
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
});

/* old /latest route (had problems b/c of async & await; promises) */
// router.route("/latest").get(async (req, res, next) => {
//   await foodSchema
//     .find()
//     .then((result) => {
//       const users = [];
//       result.forEach((e) => {  
//         userSchema
//           .findOne({ username: e.author})
//           .then((otherResult) => {
//             users.push(otherResult);
//           })
//           .catch(err => {
//             return next(err);
//           });
//       });
//       console.log(users)
//       res.json({
//         data: result,
//         users: users,
//         message: "All items successfully fetched",
//         status: 200,
//       });
//     })
//     .catch(err => {
//       return next(err);
//     });
// });

router.route("/Indblog/:blogId").get(async (req, res, next) => {
  const food = req.params.blogId;
  await foodSchema
    .findById(food)
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched",
        status: 200,
      });
    })
    .catch(err => {
      return next(err);
    });
});

router.route("/profile/:blogId").get(async (req, res, next) => {
  const blogId = req.params.blogId;
  await foodSchema
    .findById(blogId)
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched",
        status: 200,
      });
    })
    .catch(err => {
      return next(err);
    });
});

router.route("/matchid").post(async (req, res, next) => {
  const blogId = req.body._id;
  res.json({
    data: blogId,
  });
});

router.route("/create-blog").post(async (req, res, next) => {
  await foodSchema
    .create({
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      dishOrigin: req.body.dishOrigin,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    })
    .then((blog) => {
      // *Saves blog._id into database 
      userSchema.findOne({username: req.body.author}).then((user) => {
        user.blogsIds.push(blog._id)
        user.save()
      })
      res.json({
        data: blog,
      });
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;