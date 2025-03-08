const generateOtp = () => {
    // it gives 100000 to 999999
    return Math.floor(Math.random() * 900000) + 100000
}
export default generateOtp