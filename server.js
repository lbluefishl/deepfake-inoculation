const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}


connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});



app.post('/submit-summary', async (req, res) => {
  const { age,sex,handedness,shortFormVideoHours,smartphoneHours,studyFamiliarity,digitalDeviceHours,comments,prolificPID,studyID,sessionID,group,condition,wordsAll,words1,words2,words3,correct1,correct2,incorrect1,incorrect2 } = req.body;
  const db = client.db('IdeaGeneration');
  const collection = db.collection('pilot');

  try {
    const existingDocument = await collection.findOne({ prolificPID });
    if (existingDocument) {
      const result = await collection.updateOne(
        { prolificPID },
        { $set: { age, sex, handedness, shortFormVideoHours, smartphoneHours, studyFamiliarity, digitalDeviceHours, comments, prolificPID, studyID, sessionID, group, condition, wordsAll, words1, words2, words3, correct1, correct2, incorrect1, incorrect2 } }
      );
      console.log('Survey data updated:', result.modifiedCount);
    } else {
      const result = await collection.insertOne({
        age,
        sex,
        handedness,
        shortFormVideoHours,
        smartphoneHours,
        studyFamiliarity,
        digitalDeviceHours,
        comments,
        prolificPID,
        studyID,
        sessionID,
        group,
        condition,
        wordsAll,
        words1,
        words2,
        words3,
        correct1,
        correct2,
        incorrect1,
        incorrect2
      });
      console.log('Survey data inserted:', result.insertedId);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error('Error inserting/updating survey data:', err);
    res.sendStatus(500);
  }
});




