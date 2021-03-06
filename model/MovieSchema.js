
const mongoose=require('mongoose')

const Schema=mongoose.Schema

const movieSchema= new Schema({
    title:{type:String,required:true},
    category:String,
    country:String,
    year:Number,
    imdb_Score:Number,
    director_id:Schema.Types.ObjectId,
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Movie',movieSchema)