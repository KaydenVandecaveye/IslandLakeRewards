const { admin } = require("../config/firebaseAdmin");

const verifyAuthToken = async (req, res, next) => {
    console.log("Hit verifyAuthToken middleware...");

    // get id token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const idToken = authHeader.split(" ")[1];

    // verify passed id token
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        console.log("Decoded token for user: ", decodedToken);
        next();
    }
    catch(e) {
        console.error("Error verifying token:", e);
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = verifyAuthToken;