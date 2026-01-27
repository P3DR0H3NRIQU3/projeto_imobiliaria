var supabase = require("../lib/supabase");

async function authMiddleware(req, res, next) {
    console.log("Validando token no middleware");
    
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ error: "Acesso negado. Você será redirecionado ao login!" });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: "Sessão inválida ou expirada." });
    }
    req.user = user

    next()
}
module.exports = authMiddleware;
