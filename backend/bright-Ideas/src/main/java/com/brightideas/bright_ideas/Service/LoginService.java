package com.brightideas.bright_ideas.Service;

import com.brightideas.bright_ideas.Dto.LoginRequest;
import com.brightideas.bright_ideas.Model.User;
import com.brightideas.bright_ideas.Repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User login(LoginRequest request) {

        // 1. Rechercher l'utilisateur par email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Email ou mot de passe incorrect."));

        // 2. Vérifier le mot de passe
        boolean passwordCorrect = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordCorrect) {
            throw new RuntimeException("Email ou mot de passe incorrect.");
        }

        // 3. Retourner l'utilisateur connecté
        return user;
    }
}
