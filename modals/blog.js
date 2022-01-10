const mongoose = require('mongoose');
const schema = mongoose.schema;

const blogsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,

    }
})