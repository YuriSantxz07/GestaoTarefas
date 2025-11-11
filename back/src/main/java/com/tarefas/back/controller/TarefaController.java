package com.tarefas.back.controller;

import com.tarefas.back.model.Tarefa;
import com.tarefas.back.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas") // Define o caminho base da API
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do seu frontend React (Vite)
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    // 1. GET /api/tarefas (READ: Listar todas as tarefas)
    @GetMapping
    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

    // 2. POST /api/tarefas (CREATE: Adicionar nova tarefa)
    @PostMapping
    public ResponseEntity<Tarefa> criarTarefa(@RequestBody Tarefa tarefa) {
        // Garante que o status seja 'false' (pendente) ao criar
        tarefa.setStatus(false);
        Tarefa novaTarefa = tarefaRepository.save(tarefa);
        return new ResponseEntity<>(novaTarefa, HttpStatus.CREATED);
    }

    // 3. PUT /api/tarefas/{id} (UPDATE: Atualizar status da tarefa)
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarStatusTarefa(@PathVariable Long id) {
        return tarefaRepository.findById(id)
                .map(tarefa -> {
                    // Inverte o status atual
                    tarefa.setStatus(!tarefa.getStatus());
                    tarefaRepository.save(tarefa);
                    return ResponseEntity.ok(tarefa);
                })
                .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrar
    }

    // 4. DELETE /api/tarefas/{id} (DELETE: Remover tarefa)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        if (!tarefaRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // Retorna 404 se não existir
        }
        tarefaRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // Retorna 204 (No Content)
    }
}