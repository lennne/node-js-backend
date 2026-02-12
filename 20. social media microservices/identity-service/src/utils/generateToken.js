const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const generateTokens = async (user) => {
    const accessToken = jwt.sign({
        userId : user._id,
        username : user.username
    }, process.env.JWT_SECRET, {expiriesIn : '60m'}) // we set it to a lower duration like 10 minutes,
    //  and rather on the client side after 5 minutes we do something like, show an alert, 
    // to know if the user is still active, if they're not we log them out, and they have to use
    //  their refresh token. if they are they would just move their mouse

    const refreshToken = crypto.randomBytes(40).toString('hex'); // this creates a very complex token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7) // refresh token expires in 7 days

    await RefreshToken.create({
        token : refreshToken,
        user : user._id,
        expiresAt
    })

    return {accessToken, refreshToken}
}

module.exports = generateTokens