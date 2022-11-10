const { log } = require('console')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 5050
const names = ["lior","tal","nati","shlomo","nitay","bracha"]
const students = [
    {f_name:"danie",l_name:"malede",id:1,age:25},
    {f_name:"lior",l_name:"david",id:2,age:26},
    {f_name:"natan",l_name:"belay",id:1,age:25},
    {f_name:"abay",l_name:"asaye",id:1,age:27},
]
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/names',(req,res)=>{
    res.send(names)
})

app.post('/newName',(req,res)=>{
    const data = req.body.data
    names.push(data)
    res.send('ok')
})

app.get('/students',(req,res)=>{
    res.send({students,success:"Great"})    
})

app.post('/newStudents',(req,res)=>{
    const data = req.body.data
    students.push(data)
    res.send("students add")
})

app.get('/searchById/:id',(req,res)=>{
    const resultStudentId = students.find(student => student.id===req.params.id)
    resultStudentId ? res.send(resultStudentId) : res.send("not exist")
})

app.post('/addTeacher',(req,res)=>{
    const data = req.body.data
    const addTeacher = fs.appendFile('teacher.json',JSON.stringify(data),(err)=>{
        if(err) return res.send(err)
    })
    res.send(addTeacher)
})

app.get('/teachers',(req,res)=>{
    fs.readFile('teacher.json',{encoding:'utf-8'},(err,data)=>{
        if(err) return res.send(err)
        res.send(data)
    })
})
app.listen(port,()=>{
    log(`thats the server ${port}`)
})