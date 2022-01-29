const mongoose = require("mongoose");
const {Schema} = mongoose;

const ytSchema = new Schema(
    {
        link: String,
        name: String,
        date: {type: Date, default: Date.now}, // Inserting current date.
        status: {type: Number, default: 1},
    },
    {
        versionKey: false, // Removing Mongoose's "__v" field. This key value contains the internal revision of the document.
    }
);

mongoose.pluralize(null);
mongoose.model("yt", ytSchema);
