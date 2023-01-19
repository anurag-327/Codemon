const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/Codemon")
.then(()=> console.log("Database connected sucessfully"))
.catch(err => console.log("error setting up database"));