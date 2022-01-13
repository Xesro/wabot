const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {

    let LocalStrategy = require('passport-local').Strategy;
    let User = user;

    passport.use('local-signin', new LocalStrategy(

        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },


        function(req, username, password, done) {

            let User = user;

            let isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                if (!user) {

                    return done(null, false, {
                        message: 'username does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                let userinfo = user.get();
                return done(null, userinfo);


            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });
        }
    ));

    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user
    passport.deserializeUser(function(id, done) {

        User.findByPk(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });
    });
}

