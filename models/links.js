const mongoose = require("mongoose");

const linkSchema =  new mongoose.Schema({
    user:{
        type: String
    },
    oURL:{
        type: String

    },

    urlCode:
    {
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
