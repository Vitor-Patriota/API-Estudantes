import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  matricula: String,
  curso: String,
  situacao: String
});

export default mongoose.model("Student", StudentSchema);
