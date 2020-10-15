package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.model.Etudiant;
import com.equipe1.service.EtudiantService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/etudiants")
public class EtudiantController {

    private EtudiantService etudiantService;

    public EtudiantController(EtudiantService service){
        this.etudiantService = service;
    }

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('ETUDIANT') or hasRole('GESTIONNAIRE')")
    public List<Etudiant> getAllEtudiant(){
        return etudiantService.getEtudiants();
    }

    @GetMapping("/get")
    @PreAuthorize("hasRole('ETUDIANT')")
    public Optional<Etudiant> getEtudiant(@RequestParam("idEtudiant") Long idEtudiant){
        return etudiantService.findEtudiantById(idEtudiant);
    }

    @PostMapping("/create")
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.saveEtudiant(etudiant);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ETUDIANT')")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant, @PathVariable Long id){
        //System.out.println(etudiant + " , id : " + id);
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @PutMapping("/saveCV/{id}")
    @PreAuthorize("hasRole('ETUDIANT')")
    public Etudiant saveCVEtudiant(@RequestParam("file") MultipartFile file, @PathVariable Long id) throws IOException {
        Optional<Etudiant> etudiantFound = etudiantService.findEtudiantById(id);
        Etudiant etudiant = etudiantFound.get();
        byte[] bytes = file.getBytes();
        System.out.println("BEFORE : " + etudiant.getCv());
        etudiant.setCv(bytes);
        System.out.println("AFTER : " + etudiant.getCv());
        //System.out.println(etudiant + " , id : " + id);
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @GetMapping("/matricule")
    @PreAuthorize("hasRole('ETUDIANT')")
    public Optional<Etudiant> getEtudiantByMatricule(@RequestParam("matricule") String matricule){
        return etudiantService.findEtudiantByMatricule(matricule);
    }

    @PutMapping("/update/cv/{id}")
    @PreAuthorize("hasRole('ETUDIANT')")
    public Etudiant updateEtudiantCV(@RequestBody Etudiant etudiant, @PathVariable Long id){
        return etudiantService.updateEtudiant(etudiant, id);
    }

    @GetMapping("/email")
    public Etudiant getEmployeurByEmail(@RequestParam("email") String email){
        return etudiantService.getEtudiantByEmail(email);
    }
}