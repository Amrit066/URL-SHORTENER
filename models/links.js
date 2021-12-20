const mongoose = require("mongoose");

const linkSchema =  new mongoose.Schema({
    user:{
        type: String
    },
    longURL:{
        type: String

    },

    shortURL:
    {
        type: String
    },

    clicks:
    {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('link',linkSchema);
