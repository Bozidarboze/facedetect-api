import Clarifai from "clarifai";

const apiKey = process.env.API_CLARIFAI;

const app = new Clarifai.App({ apiKey });

const handleApiCall = (req, res) =>
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then((data) => {
    res.json(data);
  });

const handleImage = (db) => (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("No entries found");
    });
};

export default { handleImage, handleApiCall };
