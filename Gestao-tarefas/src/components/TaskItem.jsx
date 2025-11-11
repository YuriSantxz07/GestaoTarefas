function TaskItem({ task, onToggle, onDelete }) {
  // Define o estilo baseado no status
  const itemStyle = {
    textDecoration: task.status ? "line-through" : "none",
    opacity: task.status ? 0.6 : 1,
  };

  return (
    <div className="task-item" style={itemStyle}>
      <div className="task-info">
        <h3>{task.titulo}</h3>
        <span>Categoria: {task.categoria}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)} className="toggle-btn">
          {task.status ? "Reabrir" : "Concluir"}
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
