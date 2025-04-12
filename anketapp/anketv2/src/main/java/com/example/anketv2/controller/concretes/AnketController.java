package com.example.anketv2.controller.concretes;

import com.example.anketv2.business.abstracts.AnketService;
import com.example.anketv2.business.abstracts.SoruService;
import com.example.anketv2.business.request.saveAnketRequest;
import com.example.anketv2.entities.abstracts.Soru;
import com.example.anketv2.entities.concretes.Anket;
import com.example.anketv2.repository.AnketRepository;
import com.example.anketv2.repository.SoruRepository;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/anket")
@AllArgsConstructor
public class AnketController {
    
    @Autowired
    private SoruRepository soruRepository;
    @Autowired 
    AnketRepository anketRepository;

    @Autowired
    private AnketService anketService;
    

//    @PostMapping("/anket/olustur")
//    public ResponseEntity<?> olusturAnket(@RequestBody saveAnketRequest saveAnketRequest) {
//        // Anket adı ve soru ID'lerini al
//        String anketAdi = saveAnketRequest.getAnketAdi();
//        List<Integer> soruIds = saveAnketRequest.getSoruIds();
//        
//        // Soruları ID'lere göre al
//        List<Soru> secilenSorular = anketService.getSorularByIds(soruIds);
//        
//        // Anketi oluştur ve veritabanına kaydet
//        Anket anket = new Anket();
//        anket.setAnketAdi(anketAdi);  // Anket adını ekliyoruz
//        anket.setSorular(secilenSorular); // Seçilen soruları ekliyoruz
//        anketRepository.save(anket);
//        
//        return ResponseEntity.ok("Anket başarıyla oluşturuldu");
//    }
    @PostMapping("/create")
    public ResponseEntity<Anket> createAnket(@RequestBody saveAnketRequest request) {
        Anket anket = anketService.saveAnket(request);
        if (anket != null) {
            return ResponseEntity.status(201).body(anket);  // Başarılı bir şekilde anket oluşturuldu
        } else {
            return ResponseEntity.status(400).body(null);  // Hata oluştu
        }
    }




    @GetMapping("/{anketId}")
    public List<Anket> getAnketById(@PathVariable Integer anketId) {
        return anketService.getAnketById(anketId);
    }

    @GetMapping("/tum-sorular")
    public List<Soru> tumSorulariListele() {
        return anketService.tumSorulariListele();
    }
 // 1. Bütün Anket İsimlerini Yazdırma
    @GetMapping("/tum-anket-isimleri")
    public List<String> getAllAnketNames() {
        return anketService.getAllAnketNames();
    }

    // 2. İsmine Göre Anket İçeriğini Yazdırma
    @GetMapping("/anket/{anketAdi}")
    public ResponseEntity<Anket> getAnketByName(@PathVariable String anketAdi) {
        Anket anket = anketService.getAnketByName(anketAdi);
        if (anket != null) {
            return ResponseEntity.ok(anket);
        } else {
            return ResponseEntity.status(404).body(null);  // Eğer anket bulunamazsa 404 döner
        }
    }
}
