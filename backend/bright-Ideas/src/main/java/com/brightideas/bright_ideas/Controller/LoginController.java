package com.brightideas.bright_ideas.Controller;

import com.brightideas.bright_ideas.Dto.LoginRequest;
import com.brightideas.bright_ideas.Dto.LoginResponse;
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
            LoginResponse response = loginService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(e.getMessage());
        }
    }
}
