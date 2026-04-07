import api from "../services/api";

function StudentList({ students, onEdit, onDelete }) {
  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este estudante?")) {
      try {
        await api.delete(`/estudantes/${id}`);
        alert("✓ Estudante removido com sucesso!");
        onDelete();
      } catch (error) {
        alert("Erro ao deletar estudante: " + error.message);
      }
    }
  }

  if (!students || students.length === 0) {
    return (
      <div className="student-list">
        <div className="list-header">
          <h2> Lista de Estudantes</h2>
        </div>
        <div className="empty-state">
          <p>Nenhum estudante cadastrado ainda</p>
          <p className="empty-hint">Cadastre seu primeiro estudante para começar!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <h2> Lista de Estudantes ({students.length})</h2>
      </div>

      <div className="table-responsive">
        <table className="students-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Matrícula</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id || student._id} className="student-row">
                <td className="name-cell">
                  <strong>{student.name}</strong>
                </td>
                <td className="email-cell">{student.curso || "—"}</td>
                <td className="email-cell">{student.matricula || "—"}</td>
                <td className="email-cell">{student.situacao || "—"}</td>
                <td className="actions-cell">
                  <button
                    onClick={() => onEdit(student)}
                    className="btn-edit"
                    title="Editar estudante"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(student.id || student._id)}
                    className="btn-delete"
                    title="Deletar estudante"
                  >
                    🗑️ Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
