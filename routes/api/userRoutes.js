const router = require("express").Router();
const { User, Project, Status } = require("../../models");
const bcrypt = require("bcrypt");

//get all users
router.get('/',(req,res)=>{
    User.findAll().then(userData=>{
        res.json(userData)
    }).catch(err=>{
        res.status(500).json({msg:"An error has occurred",err})
    })
  })

  //get user and their projects by id
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{
      include:[Project]
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
      });
  });

// create new user
router.post('/', (req,res)=>{
    User.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        school:req.body.school,
        city:req.body.city,
        state:req.body.state,
        language:req.body.language,
        profile_picture:req.body.profile_picture,
    }).then(newUser=>{
        req.session.userId=newUser.id;
        req.session.loggedIn=true;
        res.json(newUser)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

//update user info
router.put('/:id',(req,res)=>{
    User.update(
        {
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:req.body.password,
            school:req.body.school,
            city:req.body.city,
            state:req.body.state,
            language:req.body.language,
            profile_picture:req.body.profile_picture,
        },
        {
            where:{
                id: req.params.id
            }
        }
    ).then((updatedUser) => {
        if (updatedUser[0] === 0) {
          return res.status(404).json({err});
        }
        res.json(updatedUser);
      }).catch((err) => {
        console.log(err);
        res.status(500).json({ err: err });
      });
})

// login user
router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:'username incorrect!'})
        }else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:'password incorrect!'})
        }else{
            req.session.userId=foundUser.id;
            req.session.loggedIn=true;
            res.json(foundUser);
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err});
    })
})

//logout user
router.get('/logout', (req, res) => {
    // logout
    if (req.session.loggedIn) {
      req.session.destroy();
      res.redirect("/")
    } else {
      res.status(404).end();
    }
});

module.exports = router