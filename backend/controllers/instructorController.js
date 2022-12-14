
const instructor = require('../models/instructorModel')
const courses = require('../models/coursesModel')
const question = require('../models/questionModel')
const exercise = require('../models/exerciseModel')

const mongoose = require('mongoose')
const course = require('../models/coursesModel')

//create inst
const getMyRating = async(req,res)=>{
    const{id} = req.params
    const data= await instructor.find({_id:id}).select('rating ratings')
    if(!data){
        return res.status(404).json({error: "instructor not found"})
    }
    res.status(200).json(data)
}
const createinst = async (req,res) => {
    //add course to DB 
    const{name,username,email,miniBio,password,country} = req.body
    try{
        const data= await instructor.create({name,username,email,miniBio,password,country}) //change
        res.status(200).json(data)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}
const createQuestion = async (req,res) => {
    //add course to DB 
    const{exercisee,questionOptions} = req.body
    try{
        const data= await exercise.create({exercise,questionOptions}) //change
        res.status(200).json(data)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}


const changePassword = async (req,res) => {
    const { id } = req.params
    const{password}=req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such individual trainee" })
    }

    const data = await instructor.findOneAndUpdate({_id : id},{
        password : password
    },{new:true})
    if(!data){
        return res.status(404).json({error: "Not found"})//redundant prob
    }
    res.status(200).json(data)
    
}
//get a single admin 
 const getCourseTitle = async (req,res) => {
    //for future use
   const {id} = req.params
   const name = await instructor.find({_id:id}).select('name')
   //fix name in the future 
     const data= await courses.find({Instructor :name}).select('title')
     if(!data){
         return res.status(404).json({error: "Course not found"})
     }
     res.status(200).json(data)
 }
 const getCourseRating = async (req,res) => {
    //for future use
   const {id} = req.params
   const name = await instructor.find({_id:id}).select('name')
   //fix name in the future 
     const data= await courses.find({Instructor :name}).select('title rating ratings')
     if(!data){
         return res.status(404).json({error: "Course not found"})
     }
     res.status(200).json(data)
 }

 //get all instructors
const getinstructor = async (req,res) => {
    const data = await instructor.find({})
    res.status(200).json(data)
}

//filter by subject or price
const filterSubjectOrPrice = async (req,res) => {
    const { name } = req.params
    const { subject } = req.params
    const { price } = req.params
    const data = await courses.find({$and: [{$or: [{subject: subject},{price: price}]},{Instructor:"aly"}]})//desc order

    res.status(200).json(data)
}

//search subject or title
const searchSubjectOrTitle = async (req,res) => {

    const { input } = req.params
    const data = await courses.find({$and: [{$or : [{subject: {$regex:input}},{title: {$regex:input}}]},{Instructor:"aly"}]})
    if(!data){
        return res.status(404).json({error: "No results!"})
    }
    res.status(200).json(data)
}

 const createcourse = async (req,res) => {
    //add course to DB 
    const{title,subtitle,totalHours,price,rating,subject,instructor,exercises,discount,shortSummary} = req.body
    try{
        const data= await courses.create({title,subtitle,totalHours,price,rating,subject,instructor,exercises,discount,shortSummary}) //change
        res.status(200).json(data)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}
//add country 
const updateCountry = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such instructor" })
    }

    const data = await instructor.findOneAndUpdate({_id : id},{
        country : "Egypt",
        ...req.body
    })
    if(!data){
        return res.status(404).json({error: "Not found"})//redundant prob
    }
    res.status(200).json(data)
    
}
//edit mini biography 
const editBio = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such instructor" })
    }
    const data = await instructor.findOneAndUpdate({_id : id},{
        miniBio : "I am a software engineer",
        ...req.body
    }, {new: true})
    if(!data){
        return res.status(404).json({error: "Not found"})//redundant prob
    }
    res.status(200).json(data)
}
//edit mini biography 
const editEmail = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such instructor" })
    }
    const data = await instructor.findOneAndUpdate({_id : id},{
        email : "null",
        ...req.body
    }, {new: true})
    if(!data){
        return res.status(404).json({error: "Not found"})//redundant prob
    }
    res.status(200).json(data)
}
//get all course with title, total hrs ,rating
const getcourse = async (req,res) => {
    //const data = await courses.find({},{projection : {title:1,totalHours:1,rating:1}});
    const data = await courses.find({}).select('title totalHours rating')
    res.status(200).json(data)
}
//get price of each course
const getpriceof1course = async (req,res) => {
    const { title } = req.params
    const data = await courses.find({title:title}).select('title price')
    res.status(200).json(data)
}
//filter courses by price
const getcoursebyprice = async (req,res) => {
    const { price } = req.params
    // const search = req.params.price
    const data = await courses.find({price: price})//desc order

    res.status(200).json(data)
}
//filter courses by subject and rating 
const getcoursebysubjectRating = async (req,res) => {
    const { subject } = req.params
    const { rating } = req.params
    const data1 = await courses.find({$and: [{subject:subject},{rating: rating}]})

    res.status(200).json(data1)
}

//edit email 

//filter courses by subject or rating 
const getcoursebysubjectorRating = async (req,res) => {
    const { subject } = req.params
    const { rating } = req.params
    const data1 = await courses.find({$or: [{subject:subject},{rating: rating}]})

    res.status(200).json(data1)
}
const searchawy = async (req,res) => {
    const { input } = req.params
    const data = await courses.find({$or:[{title:{$regex:input}},{subject:{$regex:input}},{Instructor:{$regex:input}}]})

    if(!data){
        return res.status(404).json({error: "No results!"})
    }
    res.status(200).json(data)
}


 //add route f instructors 
 //new 
module.exports = {
    getCourseTitle,
    createcourse,
    filterSubjectOrPrice,
    searchSubjectOrTitle,
//yasm
    getinstructor,
    updateCountry,
    getcourse,
    getcoursebyprice,
    getcoursebysubjectRating,
    getcoursebysubjectorRating,
    getpriceof1course,
    searchawy,
    editBio,
    createinst,
    editEmail,
    createQuestion,
    changePassword,
    getMyRating,
    getCourseRating
}