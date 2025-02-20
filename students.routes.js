var express=require("express")
var router=express.Router();
var fs=require('fs')

router.get("/",((req,res)=>{
    var reviews=JSON.parse(fs.readFileSync("reviews.txt").toString())
    // console.log(reviews)
     res.render("home.pug",{reviews})
  }))

router.get("/addpost",((req,res)=>{
    res.sendFile(__dirname+"/addpost.html")
 }))
 
 router.post("/addpost",((req,res)=>{
    // res.send("agu mama")
    var reviews=JSON.parse(fs.readFileSync("reviews.txt").toString())
        reviews.push(req.body)
        fs.writeFileSync("reviews.txt",JSON.stringify(reviews))
        res.redirect("/review")
    // console.log(req.body)
}))

router.get("/delete/:i",((req,res)=>{
    var reviews=JSON.parse(fs.readFileSync("reviews.txt").toString())
        reviews.splice(req.params.i,1)
        fs.writeFileSync("reviews.txt",JSON.stringify(reviews))
        res.redirect("/review")
    // console.log(req.body)
}))

router.get("/edit/:i",((req,res)=>{
    // console.log(req.params.id)
    var reviews=JSON.parse(fs.readFileSync("reviews.txt").toString())
    reviews.map((j,i)=>{
        if(i==req.params.i){
            res.render("edit.pug",{j:j,i:i})
            // console.log(req.body)
        }
    })
}))

router.post("/update/:i",((req,res)=>{
    // console.log(req.body)
    var reviews=JSON.parse(fs.readFileSync("reviews.txt").toString())
    reviews.splice(req.params.i,1,req.body)

    fs.writeFileSync("reviews.txt",JSON.stringify(reviews))
    res.redirect("/review")
    }))
module.exports=router;

