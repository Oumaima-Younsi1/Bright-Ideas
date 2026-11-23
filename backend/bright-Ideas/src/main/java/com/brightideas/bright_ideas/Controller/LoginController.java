package com.brightideas.bright_ideas.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brightideas.bright_ideas.Dto.LoginRequest;
import com.brightideas.bright_ideas.Model.User;
import com.brightideas.bright_ideas.Service.LoginService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            User user = loginService.login(request);

            return ResponseEntity.ok("Connexion réussie !");

        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(e.getMessage());
        }
    }
}
