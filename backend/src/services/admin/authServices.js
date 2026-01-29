var supabase = require("../../lib/supabase");


async function login(email, password) {
    
    var consulta = await supabase.auth.signInWithPassword({
        email: email ,
        password: password 
    })
    return consulta
    
}

async function logout(req, res) {
    return res.clearCookie('access_token', "", {
        httpOnly: true, 
        secure: true, 
        sameSite: 'lax', 
        path: "/"
    });

}
module.exports = {
    login,
    logout
};
