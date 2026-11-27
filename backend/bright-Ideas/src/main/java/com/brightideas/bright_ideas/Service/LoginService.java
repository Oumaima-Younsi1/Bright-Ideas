package com.brightideas.bright_ideas.Service;


import com.brightideas.bright_ideas.Dto.LoginRequest;
import com.brightideas.bright_ideas.Dto.LoginResponse;
import com.brightideas.bright_ideas.Model.User;
import com.brightideas.bright_ideas.Repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class LoginService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(UserRepository repository,
                        PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        User user = repository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email incorrect")
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Mot de passe incorrect");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                "Connexion réussie"
        );
    }
}
