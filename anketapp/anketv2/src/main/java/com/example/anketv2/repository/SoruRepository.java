package com.example.anketv2.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.anketv2.entities.abstracts.Soru;

public interface SoruRepository extends JpaRepository<Soru, Integer> {
	public abstract List<Soru> findAllByIdIn(List<Long> ids);


}