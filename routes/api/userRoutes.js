const router = require("express").Router();
const { User, Project, Status } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




//get all users
router.get("/", (req, res) => {
    User.findAll()
        .then((userData) => {
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json({ msg: "An error has occurred", err });
        });
});

router.get("/getuserfromtoken", (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: userData });
    } catch (error) {
        res.status(500).json({ user: false });
    }
});

// create new user
router.post("/", (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        school: req.body.school,
        city: req.body.city,
        state: req.body.state,
        language: req.body.language,
        profile_picture: req.body.profile_picture,
    })
        .then((newUser) => {
            const token = jwt.sign(
                {
                    id: newUser.id,
                    email: newUser.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            return res.json({
                token,
                user: newUser,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});


// login user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(401).json({ msg: 'username incorrect!' })
        } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json({ msg: 'password incorrect!' })
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // console.log(foundUser.email);

                const token = jwt.sign({
                    email: foundUser.email,
                    id: foundUser.id
                },
                    process.env.JWT_SECRET
                    , {
                        expiresIn: "2h"
                    })
                res.json({
                    token: token,
                    user: foundUser
                });
                //delete this (it was causing it to crash)
                // User.update({where:{id:foundUser.id}})
            } else {
                res.json("Incorrect Credentials")
            }
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err });
    })
})

//get user and their projects by id
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, {
        include: [Project],
    })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

//update user info
router.put("/:id", (req, res) => {
    User.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            school: req.body.school,
            city: req.body.city,
            state: req.body.state,
            language: req.body.language,
            profile_picture: req.body.profile_picture,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedUser) => {
            if (updatedUser[0] === 0) {
                return res.status(404).json({ err });
            }
            res.json(updatedUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err: err });
        });
});

//logout user
// router.get("/logout", (req, res) => {
//   // logout
//   if (req.session.loggedIn) {
//     req.session.destroy();
//     res.redirect("/");
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
