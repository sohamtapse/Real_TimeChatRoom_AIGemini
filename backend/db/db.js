import mongoose from "mongoose";

function connect(){
    mongoose.connect("mongodb+srv://tapsesoham:soham123@prectices1.rupa5.mongodb.net/AI_ChatRoom")
        .then(()=>{
            console.log("Connected to database")
        })
        .catch(err => {
            console.log(err);
        })
}


export default connect;