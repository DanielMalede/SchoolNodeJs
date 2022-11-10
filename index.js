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
    {f_name:"natan",l_name:"belay",id:3,age:25},
    {f_name:"abay",l_name:"asaye",id:4,age:27},
]
const courses = [
    {
        id:1,
        courseName:"tech",
        img:"eyze tmona",
        description:"teor colshehuu"
    },
    {
        id:2,
        courseName:"career",
        img:"eyze tmona",
        description:"teor colshehuu"
    },
    {
        id:3,
        courseName:"jon",
        img:"eyze tmona",
        description:"teor colshehuu"
    },
    {
        id:4,
        courseName:"brice",
        img:"eyze tmona",
        description:"teor colshehuu"
    },
    {
        id:5,
        courseName:"machsava",
        img:"eyze tmona",
        description:"teor colshehuu"
    },
]
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())

function studentIndexFind(req) {
    const userId = students.find(user => user.id==req.params.id)
    const userIndex = students.indexOf(userId)
    return userIndex
}
function courseIndexFind(req) {
    const courseId = courses.find(course => course.id==req.params.id)
    const courseIndex = courses.indexOf(courseId)
    return courseIndex
}

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

app.put('/students/update/:id',(req,res)=>{
    const theStudentIndex = studentIndexFind(req)
    if (theStudentIndex > -1) {
        students[theStudentIndex] = req.body.data
        return res.send(students)
    }
})

app.delete('/deleteStudent/:id',(req,res)=>{
    const studentIndex = studentIndexFind(req)
    const removeStudent = students.splice(studentIndex,1)
    removeStudent ? res.send(students):res.send("has been some error in delete")
})

app.get('/course',(req,res)=>{
    res.send(courses)
    log("success")
})

app.post('/course/add',(req,res)=>{
    const data = req.body.data
    courses.push(data)
    res.send("hacourse nosaf")
})

app.put('/course/update/:id',(req,res)=>{
    const courseIndex = courseIndexFind(req)
    if(courseIndex>-1){
        courses[courseIndex] = req.body.data
    }
    res.send('successfully add')
})

app.delete('/course/delete/:id',(req,res)=>{
    const courseIndex = courseIndexFind(req)
    const deletedCourse = courses.splice(courseIndex,1)
    res.send(courses)
})

app.delete('/course/remove/:id',(req,res)=>{
    const courseIndex = courseIndexFind(req)
    const removedCourse = courses.splice(courseIndex,1)
    res.send(courses)
})

app.get('/course/:id',(req,res)=>{
    const getCourseByIndex = courses.find(course => course.id==req.params.id)
    res.send(getCourseByIndex)
})
app.listen(port,()=>{
    log(`thats the server ${port}`)
})