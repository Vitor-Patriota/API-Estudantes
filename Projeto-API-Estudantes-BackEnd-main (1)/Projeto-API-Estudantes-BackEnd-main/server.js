import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Student from "./models/student.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.log(err));


app.post("/estudantes", async (req, res) => {
  try {
    const estudante = await Student.create(req.body);
    res.status(201).json(estudante);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


app.get("/estudantes", async (req, res) => {
  const estudantes = await Student.find();
  res.json(estudantes);
});


app.put("/estudantes/:id", async (req, res) => {
  try {
    const estudante = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    res.json(estudante);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});



app.patch("/estudantes/:id", async (req, res) => {
  try {
    const estudante = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(estudante);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});



app.delete("/estudantes/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ mensagem: "Estudante removido" });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
