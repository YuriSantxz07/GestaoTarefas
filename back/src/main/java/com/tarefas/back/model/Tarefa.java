package com.tarefas.back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Marca esta classe como uma entidade JPA
@Table(name = "tarefas") // Mapeia para a tabela 'tarefas'
@Data // Anotação do Lombok (gera getters, setters, toString, etc.)
@NoArgsConstructor // Lombok: construtor sem argumentos
@AllArgsConstructor // Lombok: construtor com todos os argumentos
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID (gerado automaticamente)

    private String titulo; // Título da tarefa
    private String categoria; // Categoria (ex: reciclagem, economia)
    private Boolean status; // Status (pendente/concluída)
}
