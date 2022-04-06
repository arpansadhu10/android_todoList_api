const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL
console.log(DB_URL, "FBDHFBBDFBFKJBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");

exports.connect = async () => await mongoose.connect(DB_URL, {
    useNewUrlPArser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected Successfully...");
}).catch((e) => {
    console.log("DB connection failure");
    console.log(e);
    process.exit(1);
})