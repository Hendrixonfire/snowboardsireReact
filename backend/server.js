const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override')
const session = require('express-session');
const bodyParser = require('body-parser');
const initializePassport = require('./passportConfig');
const User = require('./user')
const Snowlesson = require('./snowLessons.js')
const Review = require('./userReview')
const Shopitems = require('./shopItems')
const flash = require('express-flash')
const multer = require('multer');
//-----Import ends--------///


const app = express();
mongoose.connect(
    'mongodb+srv://myAdmin:adminmongo@cluster0.3xljeby.mongodb.net/',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
)
.then(() => console.log("MongoDB ok"))
.catch((err) => console.log("DB err", err));;

initializePassport(
    passport, 
    email =>  User.findOne({email: email}),
    username =>  User.findOne({username: username})
    );


//Middleware

//Multer
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "uploads");
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });
  app.use("/uploads", express.static("uploads"));

app.set('view-engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.use(methodOverride('_method'))
app.use(cors({
    origin:"https://snowboardaddictionreactfront.onrender.com",// react app app.listen()

}));

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(cookieParser('somesecret'))
app.use(passport.initialize());
app.use(passport.session());


//-----Middleware ends--------///



//Routes
/*
app.post('/login', (req,res,next)=>{
   passport.authenticate('local', (err,user,info)=>{
     if(err) throw err;
     if(!user) res.send('No user Exists');
     else{
        req.login(user, err =>{
            if(err) throw err;
            res.send('Successfully Authenticated');
            console.log(req.user);
        })
     }
   })(req,res,next)
})
*/
app.get('/api/logged',  (req, res)=>{

  res.render('index.ejs',  { name: req.user});   



});

app._router.get('/api/notloged', (req, res)=>{

res.render('indexBase.ejs');   


});
app._router.get('/api/login', (req,res)=>{
    res.redirect('/Login');
});
app._router.post('/api/login',  
    passport.authenticate('local'), (req,res) => {
          
            console.log(req.session.passport.user);
     
         
            return res.json({user: req.user.username, email:req.user.email, message:'Loggin successfull', isLogged: true});
        } 

       
    
    )

// app._router.get('/api/register', checkNotAuthenticated, (req,res)=>{
//     res.render('register.ejs');
// });

app.post('/api/register', async (req,res) =>{
    try{

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
     User.findOne({username: req.body.username})
        if (res){
       
            const newUser = new User({
                username: req.body.username,
                email:req.body.email,
                password: hashedPassword
            });
            await  newUser.save();
            console.log("New user registered")
            res.json({status:"registered"})
        } 
       
    
    
} catch(error){
   console.log(error);
}
});
app.post('/api/joinLesson', async (req,res) =>{
    try{
        console.log(req.body.lessonDate);
       await Snowlesson.updateOne({lessonDate: req.body.lessonDate, lessonType:req.body.lessonType},
            { $push:  {lessonUsers: req.body.username}})
        if (res){
       
          
            console.log(`New user registered for a lesson on ${req.body.lessonDate}`)
            res.json({status:"registered for a lesson"})
        } 
       
    
    
} catch(error){
   console.log(error);
}
});
app.post('/api/leaveLesson', async (req,res) =>{
    try{
        console.log(req.body.lessonDate);
       await Snowlesson.updateOne({lessonDate: req.body.lessonDate, lessonType:req.body.lessonType},
            { $pull:  {lessonUsers: req.body.username}})
        if (res){
       
          
            console.log(`${req.body.username} left a ${req.body.lessonType} lesson on ${req.body.lessonDate}`)
            res.json({status:"left a lesson"})
        } 
       
    
    
} catch(error){
   console.log(error);
}
});
app.post('/api/review', async (req, res) => {
    try {
        

      User.findOne({username: req.body.username});
        if (res){
        const newReview = new Review({
            username:req.body.username,
            content: req.body.content
        });
        await  newReview.save();
        res.json({message:'Review Posted'});
        // my posts
    }
        

      
       

    } catch (error) {
        res.status(500).json({ error: error, message: 'drrr' })
    }
})
// app.post('/joinLesson', async (req, res) => {
//     try {
        

//       User.findOne({lessonType: req.body.lessonType,lessonDate: req.body.lessonDate});
//         if (res){
//         const newReview = new Review({
//             username:req.body.username,
//             content: req.body.content
//         });
//         await  newReview.save();
//         res.json({message:'Review Posted'});
//         // my posts
//     }
        

      
       

//     } catch (error) {
//         res.status(500).json({ error: error, message: 'drrr' })
//     }
// })
app.post('/api/sessions', async (req, res) => {
    try {
        
        console.log(`Getting ${req.body.username}'s sessions`);
        let result = await Snowlesson.find( { lessonUsers: { $ne: req.body.username }});
     
        if(res){
            res.send(result);
        }

        

      
       

    } catch (error) {
        res.status(500).json({ error: error, message: 'drrr' })
    }
})
app.get('/api/getshopitems', async (req, res) => {
  try {
      
      console.log(`Getting shopitems`);
      let result = await Shopitems.find();
   
      if(res){
          res.send(result);
      }

      

    
     

  } catch (error) {
      res.status(500).json({ error: error, message: 'drrr' })
  }
})
app.post('/api/joinedSessions', async (req, res) => {
    try {
        
        console.log(`Getting ${req.body.username}'s sessions`);
        let result = await Snowlesson.find( { lessonUsers: req.body.username });
     
        if(res){
            res.send(result);
        }

        

      
       

    } catch (error) {
        res.status(500).json({ error: error, message: 'drrr' })
    }
})
app.post('/api/userReviews', async (req, res) => {
    try {
        
        console.log(`Getting ${req.body.username}'s reviews`);
        let result =  await Review.find( { username: req.body.username });
   
        if(result.length != 0){
            console.log(`${req.body.username} has posted reviews`)
            res.send([true, result]);
        } else {
            console.log(`${req.body.username} has no reviews`)
            res.send(false);
        }

        

      
       

    } catch (error) {
        res.status(500).json({ error: error, message: 'drrr' })
    }
})
app.post("/api/upload", upload.single("image"), (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });

app.post('/api/member', async (req, res) => {
    try {
      console.log(req.body.username);
      const user = await User.findOne({username: req.body.username},
        );
      
   
      res.json(user);
    } catch (err) {
      res.status(500).json({
        message: "Не удалось получить профиль пользователя",
      });
    }
  })
  app.post('/api/getlastorder', async (req, res) => {
    try {
      console.log("getting last order");
      const user = await User.findOne({username: req.body.username},
       );
      
   
      res.json(user);
    } catch (err) {
      res.status(500).json({
        message: "Не удалось получить профиль пользователя",
      });
    }
  })
app.post('/api/placeorder', async (req, res) => {
  try {
    //проверка на наличее.
      await User.findOneAndUpdate({username: req.body.username},
        { $push:  {orders: req.body.data}})
    
    if (res){
       
          
      console.log(`${req.body.username} placed an order `)
      res.json({status:"order placed"})
  } 

  } catch (err) {
    res.status(500).json({
      message: "Не удалось получить профиль пользователя",
    });
  }
}) 

app.patch('/api/update/:username', async (req, res) => {
  try {
    const memberAddress = req.params.username;

    await User.updateOne(
      { username: memberAddress },
      {
   
        avatar: req.body.avatar,
     
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось изменить профиль",
    });
  }
}); 
// const { data } = await axios.patch(`/api/update/${username}`, fields)

app._router.delete('/api/logout', (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})
// function checkAuthenticated(req, res, next){
//     if (req.isAuthenticated()){
//         return next();
//     } 

//     res.redirect('/notloged')
    
// }

// function checkNotAuthenticated(req, res, next){
//     if (req.isAuthenticated()){
//       return  res.redirect('/');
//     } 

//    next();
    
// }
//Server start
app.listen(4000, ()=>{
    console.log('Backend Server has started');
})
