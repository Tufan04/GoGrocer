export const calculateDiscount = (price, discount) => {
    const discountAmount = (price * discount) / 100
    const discountedPrice = Math.floor(price - discountAmount)
    return discountedPrice
}
export const calculateTotalPrice = (cartProducts) => {
    return cartProducts.reduce((acc, curr) => acc + (curr?.productId?.price * curr.quantity), 0)
}
export const calculateTotalDiscountPrice = (cartProducts) => {
    return cartProducts.reduce((acc, curr) => acc + (calculateDiscount(curr?.productId?.price, curr?.productId?.discount) * curr?.quantity), 0)
}
export const calculateTotalItems = (cartProducts) => {
    return cartProducts.reduce((acc, curr) => acc + curr?.quantity, 0)
}

export const calculateAllTotalAmount = (totalWithDiscount, deliveryCharges) => Number(totalWithDiscount + deliveryCharges + 4)