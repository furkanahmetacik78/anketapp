package com.example.anketv2.controller.concretes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.anketv2.business.abstracts.SoruService;
import com.example.anketv2.business.request.saveBooleanSoruRequest;
import com.example.anketv2.business.response.GetallBooleanSoruResponse;
import com.example.anketv2.entities.concretes.BooleanSoru;

@RestController
@RequestMapping("/api/booleanSoru")
public class BooleanSoruController {
    @Autowired
    private SoruService soruService;

    @PostMapping(path = ("/save"))
    public BooleanSoru saveBooleanSoru(@RequestBody saveBooleanSoruRequest saveBooleanSoruRequest) {
        return soruService.saveBooleanSoru(saveBooleanSoruRequest);
    }

    @GetMapping(path = "/getall")
    public List<GetallBooleanSoruResponse> getallBooleanSoruResponses() {
        return soruService.getallBooleanSoruResponses();
    }
}
