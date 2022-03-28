const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = ()=>{
    return mongoose.connect("mongodb+srv://rushpandav96:7249840809r@cluster0.acime.mongodb.net/Firstdbs?retryWrites=true&w=majority");
}

//Section schema

const sectionSchema = new mongoose.Schema({

    section: {type:String, required:true},
},

{
    versionKey: false,
    timestamps: true,
}
);

const secton = mongoose.model("section", sectionSchema);

//book schema

const bookSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        sectionId: {type:mongoose.Schema.Types.ObjectId, ref:"section", required:true },
        authorId: {type:mongoose.Schema.Types.ObjectId, ref:"author", required:true}
    },
    {
        versionKey: false,
        timestamp: true,
    }
);

const Book = mongoose.model("book",bookSchema);


// author schema

const authorSchema = new mongoose.Schema(
    {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        bookId:{type:mongoose.Schema.Types.ObjectId, ref:"book"}
    },
    {
        versionKey: false,
        timestamp: true,
    }
);

const Author = mongoose.model("model",authorSchema);

//// CRUD operation 

app.get("/sections", async(res,req)=>{

    try {
        const sections = await Section.find().lean().exec();

        return res.status(200).send(sections);

    } catch (error) {
        return res.status(500).send(error);
    }
});

app.post("/sections", async(res,req)=>{

    try {
        const sections = await Section.create(req.body);

        return res.status(200).send(sections);

    } catch (error) {
        return res.status(500).send(error);
    }
});

app.patch("/sections/:id", async(res,req)=>{

    try {
        const sections = await Section.findByIdAndUpdate(req.body ,req.params.id,{new:true}).lean().exec();

        return res.status(200).send(sections);

    } catch (error) {
        return res.status(500).send(error);
    }
});


app.get("/sections/:id", async(res,req)=>{

    try {
        const sections = await Section.findById().lean().exec();

        return res.status(200).send(sections);

    } catch (error) {
        return res.status(500).send(error);
    }
});


app.delete("/sections/:id", async(req, res)=>{
    try{
        const sections = await Section.findByIdAndUpdate(req.params.id);
        return res.send(sections);
    }catch(err){
        return res.send(err);
    }
});


app.listen(1010, async(res,req)=>{
    try{
        await connect();
        console.log("hearing to port 1010");
    }
    catch(err){
        console.log(err);
    }
}
);

