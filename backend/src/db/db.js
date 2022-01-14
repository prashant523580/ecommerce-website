const mongoose = require('mongoose');
const mongodb = require("mongodb").MongoClient;
// mongoose.Promise = global.Promise;
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err)
})