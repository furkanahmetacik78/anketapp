package com.example.anketv2.business.abstracts;

import java.util.List;

import com.example.anketv2.business.request.saveÇoktanSeçmeliSoruRequest;
import com.example.anketv2.business.response.GetallÇoktanSeçmeliSoruResponse;
import com.example.anketv2.entities.concretes.ÇoktanSeçmeliSoru;
import com.example.anketv2.business.request.saveBooleanSoruRequest;
import com.example.anketv2.business.response.GetallBooleanSoruResponse;
import com.example.anketv2.entities.concretes.BooleanSoru;
import com.example.anketv2.business.request.saveYazmaliSoruRequest;
import com.example.anketv2.business.response.GetallYazmaliSoruResponse;
import com.example.anketv2.entities.concretes.YazmaliSoru;
public interface SoruService {

	
	public ÇoktanSeçmeliSoru saveSeçmeliSoru(saveÇoktanSeçmeliSoruRequest saveÇoktanSeçmeliSoruRequest);
	public List<GetallÇoktanSeçmeliSoruResponse> getallÇoktanSeçmeliSoruResponses();
	public BooleanSoru saveBooleanSoru(saveBooleanSoruRequest saveBooleanSoruRequest);
    public List<GetallBooleanSoruResponse> getallBooleanSoruResponses();
    public YazmaliSoru saveYazmaliSoru(saveYazmaliSoruRequest saveYazmaliSoruRequest);
    public List<GetallYazmaliSoruResponse> getallYazmaliSoruResponses();

}
