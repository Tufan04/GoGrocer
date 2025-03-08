import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

export const uploadImageController = async (req, res) => {
    try {
        const image = req.file       //from multer middleware
        if (!image) {
            return res.status(400).json({
                message: "Please select a file",
                success: false
            })
        }
        const upload = await uploadImageCloudinary(image)
        if (!upload) {
            return res.status(500).json({
                message: "Image upload Failed",
                success: false
            })
        }

        return res.status(201).json({
            message: "Image upload Successful",
            success: true,
            data: {
                image: upload.url
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}



// If a previous image exists, delete it
// if (previousImagePublicId) {
//     await cloudinary.uploader.destroy(previousImagePublicId);
// }