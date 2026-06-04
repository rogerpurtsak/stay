package com.stay.auth;

import com.stay.users.User;
import com.stay.users.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setDisplayName(request.displayName());
        user.setUpdatedAt(Instant.now());

        User saved = userRepository.save(user);
        String token = jwtService.generate(saved.getId(), saved.getEmail());

        return new AuthResponse(token, saved.getId(), saved.getDisplayName());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
        .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            String token = jwtService.generate(user.getId(), user.getEmail());
            return new AuthResponse(token, user.getId(), user.getDisplayName());
        } else {
            throw new IllegalArgumentException("invalid credentials");
        }

    }
}
