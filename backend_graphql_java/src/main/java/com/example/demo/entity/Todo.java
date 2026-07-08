package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="todos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private boolean checked;
}