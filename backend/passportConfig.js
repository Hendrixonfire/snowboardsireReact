
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


function initialize(passport, getUserByEmail, getUserByUsername) {
    const  authenticateUser = async (email, password, done) =>{
        const user = await getUserByEmail(email)
        if(user == null){
            return done(null, false, { message: 'No user with that Email'});
        } 

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Password incorect'})
            }
        } catch (e) {
            return done(e)
        }
    }


passport.use(new LocalStrategy({ usernameField:'email'}, authenticateUser))
passport.serializeUser((user,done) => done(null, JSON.stringify(user.username)))
passport.deserializeUser((username,done) => {
    return done(null, JSON.parse(username))
})

}

module.exports = initialize



/*

module.exports = function(passport){
passport.use(
    new localStrategy((username, password, done) => {
        User.findOne({username: username})
            
            if(!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) =>{
              
                if(result===true){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
             });
            })
    
);
passport.serializeUser((user, cb) =>{
    cb(null, user.id)
});
passport.deserializeUser((id, user, cb)=>{
    User.findOne({_id: id})
        const userInformation ={
            username: user.username
        }
        cb(err, userInformation);
    })


 
};
*/