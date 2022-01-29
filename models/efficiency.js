const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema(
    {
        log: {type: String},
        date: {type: Date, default: Date.now}, // Inserting current date.
    },
    {
        versionKey: false, // Removing Mongoose's "__v" field. This keys value contains the internal revision of the document.
    }
);

mongoose.pluralize(null);
mongoose.model("efficiency", productSchema);
