let mongoose = require('mongoose');
let express = require('express');
const bcrypt = require('bcrypt'); 
let router = express.Router();

let userSchema = require("../models/user");
let foodSchema = require("../models/blog");

router.route("/login").post(async (req, res, next) => {
    let matchedAccount = await userSchema.findOne({
        email: req.body.email,
    });
    bcrypt.compare(req.body.password, matchedAccount.password, (err, result) => {
        if(result) {
            res.json({
                data: matchedAccount,
                message: "Data successfully uploaded",
                status: 200,
            });
            console.log("USER ACCOUNT LOGGED IN."); 
        } else{
            res.json({
                success: false,
                message: "Passwords do not match",
            });
        }
    });
});

// router.route("/profile/:userId").get(async (req, res, next) => {
//     try {
//         const userResult = await userSchema.findById(userID);
//         const blogResults = await foodSchema.find({ author: userResult.username })
//         // const blogPromises = blogResults.map(async (e) => {
//         //   const otherResult = await userSchema.findOne({ author: userResult.username });
//         //   return otherResult;
//         // });
//         // const blogs = await Promise.all(blogPromises);
//         res.json({
//           data: userResult,
//           blogs: blogResults,
//           message: "All items successfully fetched",
//           status: 200,
//         });
//     } catch (err) {
//         return next(err);
//     }
// });

router.route("/profile/:userId").get(async (req, res, next) => {
    const userID = req.params.userId;
    await userSchema
        .findById(userID)
        .then((result) => {
            foodSchema
                .find({ author: result.username })
                .then((otherResult) => {
                    res.json({
                        data: result,
                        blogs: otherResult,
                        message: "All items successfully fetched",
                        status: 200,
                    });
                    console.log(otherResult)
                })
                .catch(err => {
                    return next(err);
                });
        // console.log("result: " + result);
        })
        .catch(err => {
        return next(err);
        });
});

router.route("/find-profile-by-author/:author").get(async (req, res, next) => {
    const author = req.params.author;
    await userSchema
        .findOne({ username: author })
        .then((result) => {
        res.json({
            data: result,
            message: "All items successfully fetched",
            status: 200,
        });
        // console.log("result: " + result);
        })
        .catch(err => {
        return next(err);
        });
});

router.route("/signup").post(async (req, res, next) => {
    let hash = await bcrypt.hash(req.body.password, 10);
    await userSchema
        .create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            confirmpassword: hash,
        })
        .then((result) => {
            res.json({
                data: result,
                message: "Data successfully uploaded",
                status: 200,
            });
        })
        .catch(err => {
            console.log(err)
            return next(err);
        });
});

router.route("/:userId").get(async (req, res, next) => {
    await userSchema
        .findById(req.params.userId)
        .then((result) => {
            res.json({
                data: result,
                message: "All items successfully fetched",
                status: 200,
            });
            console.log(result.userBlogs)
        })
        .catch(err => {
            return next(err);
        });
});

router.route("/validate/:email").get(async (req, res, next) => { 
    await userSchema
        .findOne({email: req.params.email})
        .then((result) => {
            res.json({
                data: result,
                available: result ? false : true,
                message: "All items successfully fetched",
                status: 200,
            });
        })
        .catch(err => {
            return next(err);
        });
});

module.exports = router;