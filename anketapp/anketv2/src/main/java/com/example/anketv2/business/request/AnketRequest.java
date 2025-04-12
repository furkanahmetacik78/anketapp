package com.example.anketv2.business.request;

import com.example.anketv2.entities.concretes.BooleanSoru;
import com.example.anketv2.entities.concretes.ÇoktanSeçmeliSoru;

import lombok.AllArgsConstructor;

import com.example.anketv2.entities.concretes.YazmaliSoru;

import java.util.List;
import java.util.Set;


public class AnketRequest {
    private Set<BooleanSoru> booleanSorular;
    private Set<ÇoktanSeçmeliSoru> coktanSecmeliSorular;
    private Set<YazmaliSoru> yazmaliSorular;

    // Getter ve Setter metodları
    public Set<BooleanSoru> getBooleanSorular() {
        return booleanSorular;
    }

    public void setBooleanSorular(Set<BooleanSoru> booleanSorular) {
        this.booleanSorular = booleanSorular;
    }

    public Set<ÇoktanSeçmeliSoru> getCoktanSecmeliSorular() {
        return coktanSecmeliSorular;
    }

    public void setCoktanSecmeliSorular(Set<ÇoktanSeçmeliSoru> coktanSecmeliSorular) {
        this.coktanSecmeliSorular = coktanSecmeliSorular;
    }

    public Set<YazmaliSoru> getYazmaliSorular() {
        return yazmaliSorular;
    }

    public void setYazmaliSorular(Set<YazmaliSoru> yazmaliSorular) {
        this.yazmaliSorular = yazmaliSorular;
    }
}
