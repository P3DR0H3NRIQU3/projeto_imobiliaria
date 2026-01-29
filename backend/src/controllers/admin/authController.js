var authServices = require("../../services/admin/authServices");

async function login(req, res) {
    console.log("Me acessaram!!!");
    console.log(req.body);
    var email = req.body.email
    var password = req.body.password

    if (email == undefined) {
        return res.status(400).json({ erro: "O email está undefined" })
    } else if (password == undefined) {
        return res.status(400).json({ erro: "A senha está undefined" })
    } else {
        const resposta = await authServices.login(email, password)
        console.log("resposta:", resposta);
        
        if (resposta) {
            if (resposta.error) {
                return res.status(401).json({ message: error.message });
            }

            res.cookie('access_token', resposta.data.session.access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000,
                path: "/"
            });
            
            return res.status(200).json({
                message: "Login realizado com sucesso!",
                user: resposta.data.user
            });
        }
    }
}
function logout(req, res) {
    authServices.logout(req, res)
    return res.status(200).json({ message: "Deslogado com sucesso" });
}
module.exports = {
    login,
    logout
};
