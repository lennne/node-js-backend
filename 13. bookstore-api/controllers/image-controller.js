const Image = require("../models/Image")
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper')
const cloudinary = require('../config/cloudinary');
const fs = require('fs')



const uploadImageController = async(req, res) => {
    try {
        //check if file is missing in request object
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "File is required! Please upload an image"
            })
        }

        //upload to cloudinary
        const { url, publicId} = await uploadToCloudinary(req.file.path)

        //store the image url and public ID along with the uploaded user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save()

        //delete the file from local storage
        // fs.unlinkSync(req.file.path)


        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        })

        
    }catch(error){
        console.log("Error uploading image -> ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again "
        })
    }
}

const getImagesController = async(req, res) => {
    try {
        const images = await Image.find({});

        if(images){
            return res.status(200).json({
                success: true,
                data: images
            })
        }
    } catch (error) {
        console.log("Error fetching image -> ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again "
        })
    }
}

const deleteImageController = async (req, res) => {
    try {
        //get the user which is deleting the image
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;



        //get the image id to find out whether the user deleting the image was the person that created the image
        const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

        if(!image){
            return res.status(400).json({
                success: false,
                message: "Resource not found"
            })
        }
        
        if(image.uploadedBy.toString() !== userId){
            return res.status(400).json({
                success: false,
                message: "You are not allowed to delete this resource because you did not upload it"
            })
        }

        //delete froom cloudinary storage, once that is successful then delete from database
        await cloudinary.uploader.destroy(image.publicId);

        //delete this image from mongodb database
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted)

        return res.status(200).json({
            success: false,
            message: "Deleted Image Successfully"
        })
                
    }catch(error){
           console.log("Error Deleting image -> ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again "
        })
    }
}

module.exports = {
    uploadImageController,
    getImagesController,
    deleteImageController
}