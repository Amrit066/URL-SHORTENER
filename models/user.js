const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema(
    {
        name:
        {
            type: String
        },
        mobile:
        {
            type: Number
        },
        email:
        {
            type:String
        },
        password:
        {
            type:String
        },
        reEnterPassword:
        {
            type: String

        },
        tokens:
        [
            {
            token:
            {
                type: String
            }
        }
    ]
        

    }
)

userSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,12);
        this.reEnterPassword = await bcrypt.hash(this.password,12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function()
{
    try
    {
        let myToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:myToken});
        await this.save();
        return myToken;

    }
    catch(err)
    {
        console.log(err);
    }
}

const User = mongoose.model('User',userSchema);
module.exports = User;


