package com.example.anketv2.entities.concretes;

import java.util.List;
import java.util.Set;

import com.example.anketv2.entities.abstracts.Soru;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class AnketSoru {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToMany
    @JoinTable(
        name = "anket_soru", // Bağlantı tablosunun adı
        joinColumns = @JoinColumn(name = "anket_soru_id"), // Bu sınıfın foreign key’i
        inverseJoinColumns = @JoinColumn(name = "soru_id") // Karşı sınıfın foreign key’i
    )
    private Set<Soru> sorular;

    @ManyToMany(mappedBy = "sorular")
    private Set<Anket> anketler;
}
