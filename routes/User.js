// Require necessary NPM Packages
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
// Require Mongoose Model for User
const User = require('./../models/User');
const fs = require('fs')
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'profile-uploads'),
    filename: (req, file, cb) => cb(null, file.originalname)
  })

const upload = multer({
    storage: storage
})

/*
Action:        SHOW
Method:        GET
URI:        /api/users
Description:    Get users by username
*/

router.get('/api/users/:username', (req, res) => {
    User.find({username: req.params.username})
    .then((user) => {
        if (user.length > 0) {
            console.log(user)
            res.status(200).json({user: user[0].username})
        } else {
            // Using seven characters here as all ussernames are 8-20 charas
            res.status(404).json({user: 'no-user'})
        }

    })
    .catch((error) => {
        res.status(500).json( { error: error } );
    });
});

/*
Action:        SHOW
Method:        GET
URI:        /api/user/:userID
Description:    Get user
*/
router.get('/api/user/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.params.userID)
    .populate('favoriteWeapons')
    .then((user) => {
        if (user) {
            res.status(200).json({ user: {
                username: user.username,
                favoriteWeapons: user.favoriteWeapons,
                _id: user._id,
                profileImg: user.profileImg
            } });
        } else {
            // If cannot find a document with a matching ID
            res.status(404).json({
                error: {
                    name: 'UserNotFound',
                    message: `User not found`
                }
            });
        }
    })
    .catch((error) => {
        res.status(500).json( { error: error } );
    });
});

/*
Action:        DESTROY
Method:        DELETE
URI:        /api/user/:userID
Description:    Delete user via user id
*/

router.delete('/api/user/:userID', passport.authenticate('jwt', { session: false }), (req,res) => {
    User.findById(req.params.userID)
    .then((user) => {
        if (user) {
            // Pass the result of Mongoose's `.remove` method to the next `.then`
            return user.remove();
        } else {
            // If we coudn't find a user with a matching ID
            res.status(404).json({
                error: {
                    name: 'UserNotFound',
                    message: 'User associated with this ID not found'
                }
            });
        }
    })
    .then(() => {
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error) => {
        // Catch any error that might occur
        res.status(500).json( { error: error } );
    });
});

/*
Action:        CREATE
Method:        POST
URI:        /api/user
Description:    Create A New User
*/
// ADD A CHECK THAT CHECKS IF THE USERNAME OF THE NEW USER IS ALREADY USED BY ANOTHER USER

// Rounds of salting
const saltRounds = 10;
router.post('/api/user', (req,res) => {
    if (req.body.user.username.length >=8 && req.body.user.username.length <=20 && req.body.user.password.length >= 8 && req.body.user.password.length <=20) {
        const { username, password } =req.body.user;
        bcrypt.hash(password, saltRounds).then((hash) => {
            User.create({
                username: username,
                password: hash
            })
        })
        // On successful create action respond with 201
        // and content of new User
        .then(() => {
            // Check that the username and password are all of correct length
            res.status(201).end();
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error: error });
        });
    }
    else {
        res.status(406).json({ error: {
            name: 'UsernameAndPasswordLengthsWrong',
            message: 'Username and Password must be between 8-20 characters (inclusive)'
        }});
    }

})

/*
Action:        UPDATE
Method:        PUT/PATCH
URI:        /api/user/:userID
Description:    Update user by user ID
*/

router.patch('/api/user/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.params.userID)
      .then((user) => {
        if (user) {
          // Pass the result of Mongoose's `.update` method to the next `.then`
          return user.update(req.body.user);
        } else {
          // If we coudn't find a user with the matching ID
          res.status(404).json({
            error: {
              name: 'DocumentNotFoundError',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(() => {
        // If the update succeded, return 204 and no JSON
        res.status(204).end();
      })
      // Catch any error that might occur
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

router.patch('/api/user/:userID/upload', passport.authenticate('jwt', { session: false }), upload.single('profileImage'), (req, res) => {
    User.updateOne({ _id: req.params.userID }, { 
        profileImg: {
        data: fs.readFileSync('profile-uploads/' + req.file.filename),
        contentType: 'image/jpeg'
        }
    })
    .then(res.send("successfully uploaded"))
    .catch((error) => console.log(error))
    }
)

// Export the router so we can use it in the 'server.js' file
module.exports = router;