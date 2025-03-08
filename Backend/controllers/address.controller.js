import AddressModel from "../models/address.model.js"
import UserModel from "../models/user.model.js"


// add address 
export const addAddressController = async (req, res) => {
    try {
        const { name, address_line, city, pincode, mobile } = req.body
        const userId = req.userId
        if (!name || !address_line || !city || !pincode || !mobile) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const addAddress = await AddressModel.create({
            userId,
            name,
            address_line,
            city,
            pincode,
            mobile
        })
        const updateUser = await UserModel.updateOne({ _id: userId }, {
            $push: { address_details: addAddress._id }
        })
        return res.status(200).json({
            message: "Address added successfully",
            success: true,
            data: addAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// get address 
export const getAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const getAddress = await AddressModel.find({ userId })
        return res.status(200).json({
            message: "Address fetched successfully",
            success: true,
            data: getAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// update address 
export const updateAddressController = async (req, res) => {
    try {
        const { _id, name, address_line, city, pincode, mobile } = req.body
        const userId = req.userId
        if (!name || !address_line || !city || !pincode || !mobile) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const updateAddress = await AddressModel.findByIdAndUpdate(_id, {
            name,
            address_line,
            city,
            pincode,
            mobile,
            userId
        }, { new: true })

        return res.status(200).json({
            message: "Address updated successfully",
            success: true,
            data: updateAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// delete address 
export const deleteAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const { _id } = req.body
        console.log(_id);
        const deleteAddress = await AddressModel.findByIdAndDelete({ _id })
        const updateUser = await UserModel.updateOne({ _id: userId }, {
            $pull: { address_details: deleteAddress._id }
        })
        return res.status(200).json({
            message: "Address deleted successfully",
            success: true,
            data: deleteAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}