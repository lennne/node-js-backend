const mongoose = require('mongoose');


console.log(`MONGOO URI is ${process.env.MONGO_URI}`)
mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => console.log("database connected successfully"))

 //create user schema
 const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    tags: [String],
    createdAt: { type: Date, default: Date.now},
    isActive: Boolean,

 })
 // create new user Model
 const User = mongoose.model("User", userSchema);

 async function runQueryExamples(){
    try{
            const newUser = await User.create({
            name: 'Naruto Uzumaki',
            email: 'NarutoUzumaki@Doe.com',
            age: 23,
            isActive: false,
            tags: ['developer', 'Designer']
        })

        //create a new document
        // const newUser = await User.create({
        //     name: 'John Doe',
        //     email: 'John@Doe.com',
        //     age: '40',
        //     isActive: true,
        //     tags: ['developer', 'Designer']
        // })

        console.log('Created new user', newUser); 

        // const newUser = new User({
        //     name: 'Raj Doe',
        //     email: 'Raj@Doe.com',
        //     age: '40',
        //     isActive: true,
        //     tags: ['developer', 'Designer']
        // })

        // await newUser.save()
        // console.log('Created new user', newUser)

        // const allUsers = await User.find() //empty parameter means get all users
        // console.log("All users", allUsers)

        // const getUserOfActiveFalse = await User.find({ isActive: false })
        // console.log(getUserOfActiveFalse)
        // const getFirstUserWithTagDeveloper = await User.findOne({ tags: 'developer'})
        // console.log(getFirstUserWithTagDeveloper)

        // const getLastCreatedUserByUserId = await User.findById(newUser._id)
        // console.log(getLastCreatedUserByUserId)

        // const selectedFields = await User.find().select('name email -_id')
        // console.log("Selected fields -> ", selectedFields)

        // //example usecase is pagination
        // const limitedUsers = await User.find().limit(5).skip(1) //menaing skip the first result and get next 5 results
        // console.log("Limited users -> ", limitedUsers)

        //sorted
        // const sortedUsers = await User.find().sort({age: -1}) //-1 for descending order, 1 for ascending order
        // console.log("Sorted users -> ", sortedUsers)

        //count
        // const countDocuments = await User.countDocuments({ isActive: false })
        // console.log("Count of documents where isActive is false -> ", countDocuments)

        //delete
        // const deletedUser = await User.findByIdAndDelete(newUser._id)
        // console.log("Deleted User -> ", deletedUser)

        //update
        const updatedUser = await User.findByIdAndUpdate(newUser._id, {
            $set: {age: 100}, $push: {tags: 'updated'}}, 
            {new: true}
        )
        console.log("Updated User -> ", updatedUser)
    }catch(error){
        console.error("Error -> ", error)
    }finally {
        await mongoose.connection.close()
    }
 }

 runQueryExamples()