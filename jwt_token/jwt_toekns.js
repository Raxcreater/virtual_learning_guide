const j_jwt = require('jsonwebtoken')
let sectreteKey = "thisissecretkey098"
const generate_token = async function generatingToken(data) {
    console.log("data>>>ddd>>>>",data)

    const token = await j_jwt.sign(data, sectreteKey)
    console.log("token>>>>>>>>>", token)
    return token
}
module.exports = {
    generate_token
}