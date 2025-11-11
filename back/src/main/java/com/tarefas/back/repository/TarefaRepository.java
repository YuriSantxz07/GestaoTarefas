package com.tarefas.back.repository;

import com.tarefas.back.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    // O JpaRepository já fornece todos os métodos CRUD (save, findById, findAll, deleteById)
    // Não precisamos adicionar nada aqui por enquanto.
}
