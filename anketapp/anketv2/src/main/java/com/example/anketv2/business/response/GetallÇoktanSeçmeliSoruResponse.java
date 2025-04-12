package com.example.anketv2.business.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetallÇoktanSeçmeliSoruResponse {
	private String soruMetni;
	private String opt1;
	private String opt2;
	private String opt3;
	private String opt4;

}
