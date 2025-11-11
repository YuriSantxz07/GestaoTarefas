import { useState, useEffect } from "react";
import "./App.css"; // Seu CSS

// Vamos criar esses componentes
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

// URL da sua API Java (Spring Boot roda na porta 8080 por padrão)
const API_URL = "http://localhost:8080/api/tarefas";

function App() {
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas
  const [error, setError] = useState(null); // Estado para mensagens de erro

  // useEffect para buscar as tarefas da API quando o componente montar
  useEffect(() => {
    fetchTasks();
  }, []);

  // 1. Função para buscar (READ) as tarefas
  const fetchTasks = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Não foi possível buscar as tarefas.");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // 2. Função para adicionar (CREATE) uma tarefa
  const handleAddTask = async (titulo, categoria) => {
    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, categoria }), // O 'status' é definido como 'false' no backend
      });
      if (!response.ok) {
        throw new Error("Não foi possível adicionar a tarefa.");
      }
      const novaTarefa = await response.json();
      // Adiciona a nova tarefa no estado
      setTasks([novaTarefa, ...tasks]);
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Função para alternar status (UPDATE)
  const handleToggleTask = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Não foi possível atualizar o status.");
      }
      const tarefaAtualizada = await response.json();
      // Atualiza o estado local
      setTasks(tasks.map((task) => (task.id === id ? tarefaAtualizada : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  // 4. Função para deletar (DELETE) uma tarefa
  const handleDeleteTask = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Não foi possível deletar a tarefa.");
      }
      // Remove do estado local
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>EcoTasks — Gestão de Tarefas (Java + React)</h1>
      <div className="card">
        {/* Componente do Formulário */}
        <TaskForm onAddTask={handleAddTask} />
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Componente da Lista de Tarefas */}
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}

export default App;
