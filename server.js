var express =require("express")
var app =express()
var students=require("./table.js")
var fs=require("fs")
app.set("view engine","pug")
var fs=require("fs")
var cors=require("cors")
var cookieParser=require("cookie-parser")
var bodyParser=require("body-parser")
var reviews=require("./routes/students.routes.js")
app.use(cors())
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
var users=JSON.parse(fs.readFileSync("user.txt").toString())

app.post("/login",(req,res)=>{
    res.cookie("username",req.body.username)
    res.cookie("password",req.body.password)
    res.redirect("/")
    })

app.use((req,res,next)=>{
    if(req.cookies.username){
        var user = users.find(usr=>usr.username === req.cookies.username && usr.password === req.cookies.password)
        console.log(req.cookies)
        console.log(user)
        if(user){
            next()
        }
        else{
            res.redirect("login.html")
        }
    }
    else{
        res.redirect("/login.html")
    }
})
app.use("/review",reviews)

app.get("/abc",((req,res)=>{
    res.cookie("mycookie","icecreem")
    res.cookie("myicecrem","dark")
    res.send("jooo")
}))

app.get("/emp",((req,res)=>{
    res.send("Employess here")
}))
app.get("/add/:fn/:ln",((req,res)=>{
    var a =+req.params.fn
    var b =+req.params.ln
    res.send(""+(a+b))  
}))


app.get("/data",((req,res)=>{
res.send(dt)
}))

app.get("/some",((req,res)=>{
    res.sendFile(__dirname+"/data.html")
}))




 app.get("/students",((res,data)=>{
    // console.log(data)
   
    var tb=""
    for(var i=0;i<=students.length-1;i++){
         tb = tb+`
        <tr>
        <td>${students[i].firstName}</td>
        <td>${students[i].lastName}</td>
        <td>${students[i].age}</td>
        <td> <a href="/students/${students[i].id}">view more</a></td>
        </tr>
        `
    }
    data.send(`<table border>${tb}</table>`)
 }))

 app.get('/students/:id',((req,res)=>{
    var studId = parseInt(req.params.id)
    var student = students.find(stp =>stp.id===studId)
    // console.log(studId)
   
            res.end(
                `<div>
                <h1>${student.firstName}</h1>
                <h1>${student.lastName}</h1>
                <h1>${student.age}</h1>b
            </div>`
            )
     res.send(req.params.id)
 }))
app.listen(8000) 
console.log("server runing on 8000 enjoy")

