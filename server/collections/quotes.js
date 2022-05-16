const mongoose = require("mongoose");
const {Schema} = mongoose;

const qSchema = new Schema(
    {
        quote: String,
        author: String,
        source: String,
        date: {type: Date, default: Date.now},
    },
    {
        versionKey: false, // Removing Mongoose's "__v" field. This key value contains the internal revision of the document.
    }
);

mongoose.pluralize(null);
mongoose.model("quotes", qSchema);
