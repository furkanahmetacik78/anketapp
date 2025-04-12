package com.example.anketv2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.anketv2.entities.concretes.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person,Integer> {

}
