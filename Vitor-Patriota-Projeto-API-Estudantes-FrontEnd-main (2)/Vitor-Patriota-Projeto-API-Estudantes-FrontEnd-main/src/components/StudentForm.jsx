import { useState, useEffect } from "react";
import api from "../services/api";

function StudentForm({ onSave, onCancel, student }) {
  const [name, setName] = useState("");
  const [curso, setCurso] = useState("");
  const [matricula, setMatricula] = useState("");
  const [situacao, setSituacao] = useState("Matriculado");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setCurso(student.curso || "");
      setMatricula(student.matricula || student.matriculaNumber || "");
      setSituacao(student.situacao || "Matriculado");
    } else {
      setName("");
      setCurso("");
      setMatricula("");
      setSituacao("Matriculado");
    }
  }, [student]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !curso.trim()) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      const payload = { name, curso, matricula, situacao };
      if (student) {
        const id = student._id || student.id;
        await api.put(`/estudantes/${id}`, payload);
        alert("✓ Estudante atualizado com sucesso!");
      } else {
        await api.post("/estudantes", payload);
        alert("✓ Estudante cadastrado com sucesso!");
      }
      setName("");
      onSave();
    } catch (error) {
      setError("Erro ao salvar estudante: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setName("");
    setCurso("");
    setMatricula("");
    setSituacao("Matriculado");
    setError("");
    if (onCancel) onCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-header">
        <h2>
          {student ? "✏️ Editar Estudante" : "➕ Cadastrar Novo Estudante"}
        </h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nome Completo *</label>
        <input
          id="name"
          type="text"
          placeholder="Ex: João Silva"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="curso">Curso *</label>
        <input
          id="curso"
          type="text"
          placeholder="Ex: Engenharia de Software"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="matricula">Matrícula (nº)</label>
        <input
          id="matricula"
          type="text"
          placeholder="Ex: 20241234"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="situacao">Situação</label>
        <select
          id="situacao"
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          disabled={loading}
        >
          <option>Matriculado</option>
          <option>Trancado</option>
          <option>Concluído</option>
          <option>Evadido</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Salvando..." : student ? "Atualizar" : "Cadastrar"}
        </button>
        {(student || name || curso || matricula) && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="btn-secondary"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;
