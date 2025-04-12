package com.example.anketv2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.anketv2.entities.concretes.ÇoktanSeçmeliSoru;

@Repository
public interface ÇoktanSeçmeliSoruRepository extends JpaRepository<ÇoktanSeçmeliSoru,Integer> {

}
