package com.learnbridge.learn_bridge_back_end.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/home")
    public String home() {
        return "Hello World";
    }
}
