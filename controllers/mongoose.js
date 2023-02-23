const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://anurag-327:yZMFEZ9zq5a6YLzN@codemon.mtoc0me.mongodb.net/codemon?retryWrites=true&w=majority")
.then(()=> console.log("Database connected sucessfully"))
.catch(err => console.log("error setting up database"));