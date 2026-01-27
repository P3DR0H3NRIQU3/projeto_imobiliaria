var supabase = require("../../lib/supabase");

async function login(req, res) {
    console.log("Me acessaram!!!");
    console.log(req.body);

    var { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
    })
    if (error) {
        return res.status(401).json({ message: error.message });
    }


    res.cookie('access_token', data.session.access_token, {
        httpOnly: true, 
        secure: true, 
        sameSite: 'lax', 
        maxAge: 60 * 60 * 1000 
    });
    
    return res.status(200).json({
        message: "Login realizado com sucesso!",
        user: data.user
    });
}
module.exports = {
    login
};
