import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers?.Authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json({
                message: "Token Access Failed",
                success: false
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return res.status(401).json({
                message: "Unauthorized Access",
                success: false
            })
        }

        req.userId = decode.id

        next()
    } catch (error) {
        return res.status(500).json({
            message: "Login Please",
            success: false
        })
    }
}

export default auth