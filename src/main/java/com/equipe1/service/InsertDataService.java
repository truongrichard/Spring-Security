package com.equipe1.service;

import com.equipe1.model.*;
import com.equipe1.repository.EmployeurRepository;
import com.equipe1.repository.EtudiantRepository;
import com.equipe1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Component
public class InsertDataService {

    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private EmployeurRepository employeurRepository;
    @Autowired
    private StageService stageService;
    @Autowired
    private GestionnaireService gestionnaireService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;

    @Transactional
    public void insertEtudiant(){
        Etudiant e1 = new Etudiant();
        e1.setAdresse("123456");
        e1.setEmail("richard@email.com");
        e1.setMatricule("1772397");
        e1.setPassword(encoder.encode("12345"));
        e1.setPrenom("richard");
        e1.setNom("truong");
        e1.setStatutStage("possede stage");
        e1.setTelephone("555-555-5555");
        e1.setProgramme("TI");

        e1.setUsername("truongrichard");
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);

        etudiantRepository.save(e1);

        Etudiant e2 = new Etudiant();
        e2.setAdresse("123456");
        e2.setEmail("alex@email.com");
        e2.setMatricule("1501279");
        e2.setPassword(encoder.encode("12345"));
        e2.setPrenom("alex");
        e2.setNom("truong");
        e2.setStatutStage("aucun stage");
        e2.setTelephone("555-444-4444");
        e2.setProgramme("Secondaire 3");

        e2.setUsername("truongalex");
        roles = new HashSet<>();
        role = roleRepository.findByName(ERole.ROLE_ETUDIANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e2.setRoles(roles);

        etudiantRepository.save(e2);
    }

    @Transactional
    public void insertStage(){

        Employeur e1 = new Employeur();
        e1.setEmail("banque2@email.com");
        e1.setPassword(encoder.encode("12345"));
        e1.setAdresse("12345");
        e1.setNomEntreprise("banque2");
        e1.setTelephone("888-888-8888");

        e1.setUsername("banque02");
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_EMPLOYEUR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        e1.setRoles(roles);

        employeurRepository.save(e1);

        Stage stage1 = new Stage();
        stage1.setTitre("stage_1");
        stage1.setDescription("stage informatique ");
        stage1.setNbAdmis(2);
        stage1.setDateDebut(LocalDate.now());
        stage1.setDateFin(LocalDate.of(2020,12,12));
        stage1.setDateLimiteCandidature(LocalDate.of(2020,12,11));
        stage1.setExigences("aucune exigence");
        stage1.setProgramme("informatique");
        stage1.setNbHeuresParSemaine(35);
        stage1.setVille("Montreal");
        stage1.setEmployeur(e1);

        stageService.saveStage(stage1);
    }

    @Transactional
    public void insertGestionnaire(){
        Gestionnaire g1 = new Gestionnaire();
        g1.setNom("toto");
        g1.setPrenom("toto");
        g1.setEmail("toto@toto.to");
        g1.setPassword(encoder.encode("12345"));
        g1.setTelephone("12345");

        g1.setUsername("admin01");
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_GESTIONNAIRE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);

        g1.setRoles(roles);

        gestionnaireService.saveGestionnaire(g1);
    }
}
