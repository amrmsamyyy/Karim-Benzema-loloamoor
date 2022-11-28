const express = require('express')
const {
    getCourseTitle,
    createcourse,
    filterSubjectOrPrice,
    searchSubjectOrTitle,
    //yasm
    updateCountry,
    getcourse,
    getinstructor,
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
} = require('../controllers/instructorController') //new
const router = express.Router()

router.get('/name/:id', getCourseTitle)
router.get('/get',getinstructor)
router.get('/getMyCourseRating/:id',getCourseRating)
router.get('/getMyRating/:id',getMyRating)

router.get('/filter/:subject', filterSubjectOrPrice) //change /:price to filter by price until we connect to frontend

router.get('/search', searchSubjectOrTitle) //change /:title to search by title until we connect to frontend

router.post('/createcourse',createcourse )
//yasm
router.patch('/updateCountry/:id', updateCountry)
router.patch('/changePassword/:id', changePassword)

router.get('/viewcourses', getcourse)

router.get('/prices', getcoursebyprice)

router.get('/subjectRating/:subject/:rating', getcoursebysubjectRating)

router.get('/subjectorRating/:subject/:rating', getcoursebysubjectorRating)

router.get('/getpriceof1course/:title', getpriceof1course)

router.get('/search2/:input', searchawy)

router.post('/createinst',createinst )
router.post('/createQuestion',createQuestion )

router.patch('/editBio/:id', editBio)
editEmail
router.patch('/editEmail/:id', editEmail)
module.exports = router 


