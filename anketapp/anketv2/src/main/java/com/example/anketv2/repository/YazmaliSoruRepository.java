package com.example.anketv2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anketv2.entities.concretes.YazmaliSoru;

public interface YazmaliSoruRepository extends JpaRepository<YazmaliSoru, Integer> {
    // YazmaliSoru'ya özel sorgular burada yer alabilir.
}
