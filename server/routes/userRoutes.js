const express = require('express');
const router = express.Router();
const { admin, db } = require('../config/firebaseAdmin');
const verifyAuthToken = require('../middleware/verifyAuthToken');


function generate5DigitId() {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

async function createUserID() {
    let unique = false;
    let userId;

    while (!unique) {
        userId = generate5DigitId();
        const snapshot = await db.collection("users").where("userId", "==", userId).get();
        if (snapshot.empty) {
          unique = true;
        }
    }

    console.log("Created user id, ", userId);
    return userId;
};

router.post('/create-user', async (req, res) => {
    try {
        console.log("Calling create-user route...");
        const { uid, email } = req.body;

        if (!uid || !email) {
            return res.status(400).json({ error: "Missing uid or email" });
        }

        const userNumber = await createUserID();
        await db.collection("users").doc(uid).set({
            uid,
            email,
            userNumber,
            points: 0,
            createdAt: new Date().toISOString(),
        });
        res.status(200).json({ message: "User created" });
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/info', verifyAuthToken, async (req,res) => {
    console.log("Fetching user info...")
    
    const uid = req.user.uid;
    const userDoc = await db.collection("users").doc(uid).get();
    res.json(userDoc.data());
})

module.exports = router;