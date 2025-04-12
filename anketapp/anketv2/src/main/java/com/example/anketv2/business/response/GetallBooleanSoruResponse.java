package com.example.anketv2.business.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetallBooleanSoruResponse {
    private String soruMetni;
    private String opt1;
    private String opt2;
}
