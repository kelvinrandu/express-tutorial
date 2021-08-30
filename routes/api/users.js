const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const users = require("../../Users");


// get all users
router.get("/", (req, res) => res.json(users));

// get single user
router.get("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ message: `${req.params.id} is invalid ` });
  }
});

// create new user
router.post('/', (req,res) =>{
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status:'active'
    }

    if(!newUser.name || !newUser.email){
        return res.status(400).json({message: "please input email and name"});
    }

    users.push(newUser);

    res.json(users);
});

router.put("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users.forEach(user=>{

        if(user.id === parseInt(req.params.id)){
            user.name = updateUser.name ? updateUser.name : user.name;
            user.email = updateUser.email ? updateUser.email : user.email;

            res.json({message: 'user updated' , users});

        }

    });
  } else {
    res.status(400).json({ message: `${req.params.id} is invalid ` });
  }
});

// delete user
router.delete("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json({message : "user deleted",users:users.filter((user) => user.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ message: `${req.params.id} is invalid ` });
  }
});

module.exports = router;