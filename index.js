const express = require("express");
const configDb = require("./config");
const productModel = require("./productModel");
const multer = require("multer");

const app = express();

app.use(express.json());

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + "-" + Date.now() + ".jpg");
    },
  }),
}).single("file_upload");

app.get("/api/upload", uploadFile, async (req, res) => {
  res.send(req.body);
});

app.get("/api", async (req, res) => {
  let data = await productModel.find();
  res.send(data);
});

app.post("/api/create", async (req, res) => {
  let data = new productModel(req.body);
  let result = await data.save();
  res.send(result);
});

app.put("/api/update/:id", async (req, res) => {
  let data = await productModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  //   console.log(data);
  res.send(data);
});

app.delete("/api/delete/:id", async (req, res) => {
  let data = await productModel.deleteOne({ _id: req.params.id });
  res.send(data);
});

app.get("/api/search/:key", async (req, res) => {
  let data = await productModel.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

app.listen(4000);
