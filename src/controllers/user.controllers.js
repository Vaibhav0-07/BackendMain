import { asyncHandler } from "../utils/asyncHandler.js";
const registerUser = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "OK",
        username: "Vaibhav Pandey",
        email: "vaibhavpandey2506@gmail.com",
    })
});

export {registerUser};