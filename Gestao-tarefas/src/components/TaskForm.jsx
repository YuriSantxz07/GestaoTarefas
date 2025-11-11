import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !categoria) {
      alert("Por favor, preencha o título e a categoria.");
      return;
    }
    // Chama a função do App.jsx
    onAddTask(titulo, categoria);

    // Limpa os campos
    setTitulo("");
    setCategoria("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <input
          type="text"
          placeholder="Título da tarefa"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Categoria (ex: Reciclagem)"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}

export default TaskForm;
