package com.veille.technologique.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/etudiant")
    @PreAuthorize("hasRole('ETUDIANT') or hasRole('EMPLOYEUR') or hasRole('GESTIONNAIRE')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/employeur")
    @PreAuthorize("hasRole('EMPLOYEUR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/gestionnaire")
    @PreAuthorize("hasRole('GESTIONNAIRE')")
    public String adminAccess() {
        return "Admin Board.";
    }
}
