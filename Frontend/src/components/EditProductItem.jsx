import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../utils/uploadImage.js";
import toast from "react-hot-toast";
import { errorToast } from "../utils/ToastHandler.js";
import axiosInstance from "../config/AxiosInstance";
import { updateProductUrl } from "../config/ApiUrl";
import { updateProduct } from "../redux/productSlice";
import MoreFields from "../components/MoreFields";

function EditProductItem({ productItemData, close }) {
    const [data, setData] = useState({
        id: productItemData._id,
        ...productItemData,
    });
    const [loading, setLoading] = useState(false);
    const [openMoreFields, setOpenMoreFields] = useState(false);
    const [fieldName, setFieldName] = useState("");

    const categories = useSelector((state) => state.product.categories);
    const subCategories = useSelector((state) => state.product.subCategories);

    const dispatch = useDispatch();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const uploadImageHandler = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            toast.error("Please select at least one file");
            return;
        }
        setLoading(true);
        try {
            const uploadedImages = [];

            for (const file of files) {
                const response = await uploadImage(file);
                if (!response) {
                    toast.error("Failed to upload " + file.name);
                    continue;
                }
                uploadedImages.push(response.data.data.image);
            }
            setData((prev) => ({
                ...prev,
                image: [...prev.image, ...uploadedImages],
            }));
            toast.success("All images uploaded successfully!");
        } catch (error) {
            toast.error("Error uploading files");
        }
        setLoading(false);
    };

    const addFieldHandler = () => {
        setData((prev) => {
            return {
                ...prev,
                more_details: {
                    ...prev.more_details,
                    [fieldName]: "",
                },
            };
        });
        setFieldName("");
        setOpenMoreFields(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put(updateProductUrl, data);
            if (!response) {
                toast.error(response.data.message);
                return;
            }
            if (response.data.success) {
                dispatch(updateProduct(response.data.data));
                toast.success("Product updated successfully");
                close()
                setData(() => {
                    return {
                        name: "",
                        image: [],
                        category: [],
                        subCategory: [],
                        unit: "",
                        stock: "",
                        price: "",
                        discount: "",
                        description: "",
                        more_details: {},
                        publish: true,
                    };
                });
            }
        } catch (error) {
            errorToast(error);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 p-4 bg-neutral-800 z-50 bg-opacity-70 flex justify-center items-center">
            <div className="max-w-4xl w-full bg-white p-4 rounded-xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
                {/* upper part */}
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 p-2 border-b">
                    <p className="text-xl font-semibold">Edit Product</p>
                    {/* Exit button  */}
                    <button className="text-neutral-700 ml-auto block" onClick={close}>
                        <IoIosCloseCircle size={28} />
                    </button>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="overflow-y-auto max-h-[75vh] w-full bg-blue-100 px-4 py-6 rounded-md mb-40">
                        <div className="w-full sm:grid sm:grid-cols-2 gap-4 place-content-center">
                            {/* Product Name */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Product Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 outline-none rounded"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Product Name"
                                    value={data.name}
                                    onChange={changeHandler}
                                    autoFocus={true}
                                />
                            </div>

                            {/* Upload Images */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Product Images
                                </label>
                                {loading ? (
                                    <div className="w-fit bg-gray-400 px-4 py-2 rounded font-semibold cursor-default">
                                        Uploading ...
                                    </div>
                                ) : (
                                    <input
                                        className="w-full py-2 outline-none rounded"
                                        type="file"
                                        name="productImage"
                                        onChange={uploadImageHandler}
                                        multiple
                                    />
                                )}
                            </div>

                            {/* images preview */}
                            <div
                                className={`w-full mb-2 col-span-2 flex flex-wrap gap-4 justify-center items-center ${data.image.length === 0 && "hidden"
                                    }`}
                            >
                                {/* Sample Images (Replace with dynamic previews using state) */}
                                {data?.image.map((imge, idx) => (
                                    <div key={idx} className="bg-white relative">
                                        <img
                                            className="w-24 h-24 object-cover"
                                            src={imge}
                                            alt={`Preview ${idx + 1}`}
                                        />
                                        <div
                                            className="text-red-500 hover:text-red-700 cursor-pointer absolute top-1 right-1"
                                            onClick={() => {
                                                setData((prev) => {
                                                    return {
                                                        ...prev,
                                                        image: data.image.filter((_, i) => i !== idx),
                                                    };
                                                });
                                            }}
                                        >
                                            <IoIosCloseCircle size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Category */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Category
                                </label>

                                {/* display category */}
                                <div className="mt-1">
                                    {/* Selected Options Display */}
                                    <div className="mb-4 space-y-1 flex flex-wrap items-center gap-2">
                                        {data?.category?.map((option, index) => (
                                            <div
                                                className="w-fit flex items-center gap-2 bg-blue-100 px-2 py-2 rounded-md"
                                                key={index}
                                            >
                                                <span className="text-blue-800 font-medium text-sm">
                                                    {option.name}
                                                </span>
                                                <div
                                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                                    onClick={() => {
                                                        setData((prev) => {
                                                            return {
                                                                ...prev,
                                                                category: [
                                                                    ...data.category.filter(
                                                                        (cate) => cate.name !== option.name
                                                                    ),
                                                                ],
                                                            };
                                                        });
                                                    }}
                                                >
                                                    <IoIosCloseCircle size={20} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* select category dropdown  */}
                                <select
                                    className="w-full px-3 py-2 outline-none rounded"
                                    name="category"
                                    value=""
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const categoryDetails = categories.find(
                                            (category) => category.name === value
                                        );
                                        const isprevSelected = data.category.find(
                                            (cat) => cat.name === value
                                        );
                                        if (!isprevSelected) {
                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    category: [...data.category, categoryDetails],
                                                };
                                            });
                                        }
                                    }}
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    {categories.map((category, idx) => {
                                        return (
                                            <option key={"category" + idx} value={category.name}>
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {/* Sub Category */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Sub Category
                                </label>

                                {/* display sub category */}
                                <div className="mt-1">
                                    {/* Selected Options Display */}
                                    <div className="mb-4 space-y-1 flex flex-wrap items-center gap-2">
                                        {data?.subCategory?.map((option, index) => (
                                            <div
                                                className="w-fit flex items-center gap-2 bg-blue-100 px-2 py-2 rounded-md"
                                                key={index}
                                            >
                                                <span className="text-blue-800 font-medium text-sm">
                                                    {option.name}
                                                </span>
                                                <div
                                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                                    onClick={() => {
                                                        setData((prev) => {
                                                            return {
                                                                ...prev,
                                                                subCategory: [
                                                                    ...data.subCategory.filter(
                                                                        (subCate) => subCate.name !== option.name
                                                                    ),
                                                                ],
                                                            };
                                                        });
                                                    }}
                                                >
                                                    <IoIosCloseCircle size={20} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* select sub category dropdown  */}
                                <select
                                    className="w-full px-3 py-2 outline-none rounded"
                                    name="subCategory"
                                    value=""
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const subCategoryDetails = subCategories.find(
                                            (subCategory) => subCategory.name === value
                                        );
                                        const isprevSelected = data.subCategory.find(
                                            (subCat) => subCat.name === value
                                        );
                                        if (!isprevSelected) {
                                            setData((prev) => {
                                                return {
                                                    ...prev,
                                                    subCategory: [
                                                        ...data.subCategory,
                                                        subCategoryDetails,
                                                    ],
                                                };
                                            });
                                        }
                                    }}
                                >
                                    <option value="" disabled>
                                        Select Sub Category
                                    </option>
                                    {subCategories.map((subCategory, idx) => {
                                        return (
                                            <option
                                                key={"subCategory" + idx}
                                                value={subCategory.name}
                                            >
                                                {subCategory.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {/* Unit */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">Unit</label>
                                <input
                                    className="w-full px-3 py-2 outline-none rounded"
                                    type="text"
                                    name="unit"
                                    placeholder="Enter Unit"
                                    value={data.unit}
                                    onChange={changeHandler}
                                />
                            </div>

                            {/* Stock */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">Stock</label>
                                <input
                                    className="w-full px-3 py-2 outline-none rounded"
                                    type="number"
                                    name="stock"
                                    placeholder="Enter Stock"
                                    value={data.stock}
                                    onChange={changeHandler}
                                    min={0}
                                />
                            </div>

                            {/* Price */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input
                                    className="w-full px-3 py-2 outline-none rounded"
                                    type="number"
                                    name="price"
                                    placeholder="Enter Price"
                                    value={data.price}
                                    onChange={changeHandler}
                                    min={0}
                                />
                            </div>

                            {/* Discount */}
                            <div className="w-full mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Discount
                                </label>
                                <input
                                    className="w-full px-3 py-2 outline-none rounded"
                                    type="number"
                                    name="discount"
                                    placeholder="Enter Discount"
                                    value={data.discount || 0}
                                    onChange={changeHandler}
                                    min={0}
                                />
                            </div>

                            {/* Description */}
                            <div className="w-full mb-2 col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 outline-none rounded"
                                    rows="3"
                                    name="description"
                                    placeholder="Enter Description"
                                    value={data.description}
                                    onChange={changeHandler}
                                ></textarea>
                            </div>

                            {/* More Details */}
                            {Object?.keys(data?.more_details)?.map((fieldName, index) => {
                                return (
                                    <div
                                        className="w-full mb-1 col-span-2"
                                        key={fieldName + index}
                                    >
                                        <label className="block text-sm font-medium mb-1">
                                            {fieldName}
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 outline-none rounded"
                                            name={fieldName}
                                            placeholder={`Enter ${fieldName}`}
                                            value={data?.more_details[fieldName]}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setData((prev) => {
                                                    return {
                                                        ...prev,
                                                        more_details: {
                                                            ...data.more_details,
                                                            [fieldName]: value,
                                                        },
                                                    };
                                                });
                                            }}
                                        ></input>
                                    </div>
                                );
                            })}

                            <div className="w-full col-span-2 flex justify-end mb-2">
                                <div
                                    className="w-fit px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                                    onClick={() => setOpenMoreFields(true)}
                                >
                                    Add Fields
                                </div>
                            </div>

                            {/* Publish */}
                            <div className="mb-4 flex items-center">
                                <input
                                    className="mr-2 outline-none"
                                    type="checkbox"
                                    name="publish"
                                    id="publish"
                                    checked={data.publish}
                                    onChange={(e) => {
                                        setData((prev) => {
                                            return {
                                                ...prev,
                                                publish: e.target.checked,
                                            };
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="publish"
                                    className="text-sm font-medium cursor-pointer"
                                >
                                    Publish Product
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                className={`w-full mb-3 p-2 text-white rounded outline-none ${data.name &&
                                    data.image[0] &&
                                    data.category[0] &&
                                    data.subCategory[0] &&
                                    data.unit &&
                                    data.stock &&
                                    data.price &&
                                    data.description
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-400"
                                    }`}
                            // disabled={!(data.name && data.image[0] && data.category[0] && data.subCategory[0] && data.unit && data.stock && data.price && data.description)}
                            >
                                {loading ? "Updating..." : " Update Product"}
                            </button>
                        </div>
                    </div>
                </form>
                {openMoreFields && (
                    <MoreFields
                        close={() => setOpenMoreFields(false)}
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        submit={addFieldHandler}
                    />
                )}
            </div>
        </div>
    );
}

export default EditProductItem;
