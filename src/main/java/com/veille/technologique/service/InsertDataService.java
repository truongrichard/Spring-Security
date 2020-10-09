package com.veille.technologique.service;

import com.veille.technologique.model.ERole;
import com.veille.technologique.model.Role;
import com.veille.technologique.model.User;
import com.veille.technologique.repository.RoleRepository;
import com.veille.technologique.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
public class InsertDataService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Transactional
    public void insertEtudiant(){
        User user = new User("truongrichard",
                "richard@email.com",
                encoder.encode("12345"));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        user.setRoles(roles);
        userRepository.save(user);
    }

    @Transactional
    public void insertEmployeur(){
        User user = new User("CIBC",
                "cibc@email.com",
                encoder.encode("banque"));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        user.setRoles(roles);
        userRepository.save(user);
    }

    @Transactional
    public void insertGestionnaire(){
        User user = new User("admin",
                "admin@email.com",
                encoder.encode("admin"));

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_GESTIONNAIRE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        user.setRoles(roles);
        userRepository.save(user);
    }
}
