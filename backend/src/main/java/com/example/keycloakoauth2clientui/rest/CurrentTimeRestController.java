package com.example.keycloakoauth2clientui.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class CurrentTimeRestController {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

    @GetMapping(path = "/api/currentTime")
    public ResponseEntity<String> currentTime() {
        return ResponseEntity.ok(dateFormat.format(new Date()));
    }
}
