export const generateTokenAndSetCookie = (user, res) => {

    const token = user.generateToken(user._id);
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensures cookie security in production
        sameSite: "strict",
        maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
    }

    //set cookie in response so that this token can be sent with every request and we can autheticate user on basis of this token stored in cookie
    res.cookie("token", token, options);

}