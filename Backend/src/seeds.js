const mongoose = require('mongoose');
const User = require('./models/User');
const users = require('./seedsData');

mongoose.connect("mongodb://127.0.0.1:27017/Bliip", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));


const seedsData= async ()=>
{
     try {   
        await User.deleteMany({});
        console.log("Old users removed");
             
        await User.insertMany(users);
        console.log('Seed data inserted succesfully');
     } catch (error) {
        console.log('failed to insert seed data',error); 
     } 
}

seedsData();
