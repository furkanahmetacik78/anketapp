package com.example.anketv2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anketv2.entities.concretes.BooleanSoru;

public interface BooleanSoruRepository extends JpaRepository<BooleanSoru, Integer> {
    // BooleanSoru'ya özel sorgular burada yer alabilir.
}
