
const findProductsByCategory = (categoryName, products) => {
    const categoryWiseProduct = products
        .filter(product => product.category[0]?.name === categoryName)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by oldest first

    return categoryWiseProduct.slice(0, 12);
};

export default findProductsByCategory;
