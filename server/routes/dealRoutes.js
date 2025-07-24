const express = require('express');
const router = express.Router();
const { admin, db } = require('../config/firebaseAdmin');

router.get('/', async (req, res) => {
    try {
        const dealsRef = db.collection('deals');
        const snapshot = await dealsRef.get();

        console.log("Deals Snapshot: ", snapshot);
    
        const deals = [];
        snapshot.forEach(doc => {
          deals.push({ id: doc.id, ...doc.data() });
        });
    
        res.json(deals);
      } catch (error) {
        console.error('Error fetching deals:', error);
        res.status(500).json({ error: 'Failed to fetch deals' });
      }
})

module.exports = router;