package com.example.anketv2.entities.concretes;

import com.example.anketv2.entities.abstracts.Soru;
import com.fasterxml.jackson.annotation.JsonTypeName;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "yazmaliSoru")
@Data
@JsonTypeName("YazmaliSoru")

public class YazmaliSoru extends Soru{

}
