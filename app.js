const express = require("express");
const app = express();
const path = require("path");
const shortid = require("shortid");
const authenticate = require("./middleware/authenticate");
const bcrypt = require('bcryptjs');
const config = require('config');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

require("./Databases/db");

const User = require("./models/user")
const Lunks = require("./models/links");

app.set("view engine", "ejs");

// app.use(require('./routes/auth'));

const port = process.env.PORT || 3000 ;
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// const static_path = path.join(__dirname, './views');

// app.use(express.static(static_path));




app.get('/', (req,res)=>
{
    res.render("index");
}
)

app.get("/link", (req, res)=>{
    res.render("shortener");
})


// -------------User registration and Login ------------------//




// Creating new account in the database //


app.post('/register', async (req,res)=>{
    
    try{
        // res.send(req.body.Name);
        // console.log(req.body.Name);
        // console.log(req.body.Email);

        if (await User.findOne({email:req.body.email}))
        {
            res.send("Please try to login, You are already registered.");
        }
        else
        {
            if(req.body.password===req.body.reEnterPassword)
            {
                const register = new User({
                    name:req.body.name,
                    mobile:req.body.mobile,
                    email:req.body.email,
                    password:req.body.password,
                    reEnterPassword:req.body.reEnterPassword,
                })
                const registered = await register.save();
                res.status(201).render("index");
            }
            else
            {
                res.status(400).send("Password and confirm password should be same!");
            }
            

        }

        


    }
    catch(error)
    {
        console.log(error);
        res.status(400).send("Something's Wrong");
    }



})

// Getting and checking the user email and password //

app.post("/login",async (req, res)=>
{
    try
    {
        const emailId = req.body.emails;
        const password = req.body.passwords;

        //  console.log(emailId);
        //  console.log(password);

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
        const urlIsThere = await Lunks.findOne({oUrl: req.body.url});

        if(urlIsThere)
        {
            res.status(201).send("Url Already Exist");
        }
        else
        {
            const insert = new Lunks({
                user:req.rootUser.email,
                oUrl: req.body.url,
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

app.get('/logout', authenticate ,async (req,res)=>
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

app.get('/:code', async (req, res)=>
{
    try{

        const rdUrl = await Lunks.findOne({urlCode: req.params.code});

        if(rdUrl)
        {
            rdUrl.clicks ++;
            await rdUrl.save();
            res.redirect(rdUrl.oUrl);
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





app.listen(port);



