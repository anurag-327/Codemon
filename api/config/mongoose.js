const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database connected sucessfully"))
.catch(err => console.log("error setting up database"));

// mongodb+srv://anurag-327:yZMFEZ9zq5a6YLzN@codemon.mtoc0me.mongodb.net/codemon?retryWrites=true&w=majority