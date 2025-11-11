import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa cadastrada ainda.</p>;
  }

  // Ordena as tarefas: pendentes primeiro, depois concluídas
  const sortedTasks = [...tasks].sort((a, b) => a.status - b.status);

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
