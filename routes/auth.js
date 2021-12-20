const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Lunks = require("../models/links");
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");


require("../Databases/db");


router.get('/', (req,res)=>
{
    res.render("index");
}
)

router.get("/link", (req, res)=>{
    res.render("shortener");
})


// -------------User registration and Login ------------------//




// Creating new account in the database //


router.post('/register', async (req,res)=>{
    
    try{
        // res.send(req.body.Name);
        // console.log(req.body.Name);
        // console.log(req.body.Email);

        if (await User.findOne({email:req.body.Email}))
        {
            res.send("Please try to login, You are already registered.");
        }
        else
        {
            const register = new User({
                name:req.body.Name,
                email:req.body.Email,
                password:req.body.Password
            })
            const registered = await register.save();
            res.status(201).render("index");

        }

        


    }
    catch(error)
    {
        console.log(error);
        res.status(400).send("Something's Wrong");
    }



})

// Getting and checking the user email and password //

router.post("/login",async (req, res)=>
{
    try
    {
        const emailId = req.body.Emails;
        const password = req.body.Passwords;

        // console.log(emailId);
        // console.log(password);

        const userMail = await User.findOne({email:emailId});

        if(userMail)
        {
            const isMatch = await bcrypt.compare(password,userMail.password);

            const token = await userMail.generateAuthToken();

            res.cookie("jwtoken",token,
            {
                expires: new Date(Date.now() + 86400000),
                httpOnly: true
            });

            if(isMatch)
            {
                res.status(201).render("shortener");

            }
            else
            {
                res.send("Invalid Password");
            }
        }
        else
        {
            res.send("Invalid Credentials");
        }

    //     if(userMail.password === password)
    //     {
    //         // res.send("Alright");
            
    //     }
    //     else
    //     {
    //         res.send("Invalid Password");
    //     }

    }
    catch(err){
        console.log(err);
        res.status(404).send("404");
    }
})

// ----------------------------------------------------------------------------------------------- //



// -------------------------------URL Shortener---------------------------------------------------- //


app.post("/sLink", authenticate ,async (req, res)=>
{
    const baseURL = config.get('baseURL')
    const urlCode=shortid.generate();
    try
    {
        const urlIsThere = await Lunks.findOne({longURL: req.body.url});

        if(urlIsThere)
        {
            res.status(201).send("Url Already Exist");
        }
        else
        {
            const insert = new Lunks({
                user:req.rootUser.email,
                longURL: req.body.url,
                urlCode: urlCode,
                shortURL: baseURL+urlCode,
            })
            const doneLink = await insert.save();
            res.status(201).render("shortener");
        }
        
        

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("500");
    }

})








// ----------------------------------------------------------------------------------------------- //





// ---------------------------------Log Out--------------------------------------------------------//

router.get('/logout', authenticate ,async (req,res)=>
{
    try
    {
        req.rootUser.tokens = req.rootUser.tokens.filter((curr)=>
        {
            return curr.token !== req.token;
        });

        res.clearCookie("jwtoken");

        await req.rootUser.save();
        
        res.render("index");

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Error!");
    }
})



// ------------------------------------------------------------------------------------------------//

// -------------------------Re-Direct------------------------------------------------------------//

router.get('/:code', async (req, res)=>
{
    try{

        const rdUrl = await Lunks.findOne({urlCode: req.params.code});

        if(rdUrl)
        {
            res.redirect(rdUrl.longURL);
        }
        else
        {
            res.status(404).send("Not a valid URL");
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send("Oops");
    }
})



// -----------------------------------------------------------------------------------------------//

module.exports = router;