import { useEffect, useState } from "react";
import api from "./services/api";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadStudents() {
    try {
      setLoading(true);
      const response = await api.get("/estudantes");
      // Normaliza o id para `id` (compatível com `_id` ou `id` retornados pelo backend)
      const normalized = (response.data || []).map((s) => ({
        ...s,
        id: s._id || s.id,
      }));
      setStudents(normalized);
      setEditingStudent(null);
    } catch (error) {
      console.error("Erro ao carregar estudantes:", error);
      alert("Erro ao carregar estudantes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="app-container">
      <div className="app-header">
        <h1> Gerenciamento de Estudantes</h1>
        <p className="subtitle">Organize seus estudantes de forma simples e eficiente</p>
      </div>

      <div className="app-content">
        <div className="form-section">
          <StudentForm
            onSave={loadStudents}
            onCancel={() => setEditingStudent(null)}
            student={editingStudent}
          />
        </div>

        <div className="list-section">
          {loading ? (
            <div className="loading">Carregando...</div>
          ) : (
            <StudentList
              students={students}
              onEdit={setEditingStudent}
              onDelete={loadStudents}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
