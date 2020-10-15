package com.equipe1.controller;

import com.equipe1.model.Employeur;
import com.equipe1.service.EmployeurService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employeurs")
public class EmployeurController {

    private EmployeurService employeurService;

    public EmployeurController(EmployeurService employeurService){
       this.employeurService=employeurService;
    }

    @GetMapping(value = "findAll")
    @PreAuthorize("hasRole('EMPLOYEUR')")
    public List<Employeur> getAllEmployeurs(){
        return employeurService.getEmployeurs();
    }

    @GetMapping("get")
    @PreAuthorize("hasRole('EMPLOYEUR')")
    public Employeur getEmployeurById(@RequestParam("idEmployeur") Long idEmployeur){
        return employeurService.getEmployeurById(idEmployeur);
    }

    @GetMapping("email")
    public Employeur getEmployeurByEmail(@RequestParam("email") String email){
        return employeurService.getEmployeurByEmail(email);
    }

    @PostMapping("createEmploye")
    public Employeur createEmployeur(@RequestBody Employeur employeur){
        return employeurService.saveEmployeur(employeur);
    }

    @PutMapping("update/{id}")
    @PreAuthorize("hasRole('EMPLOYEUR')")
    public Employeur updateEmployeur(@Valid @RequestBody Employeur employeur, @PathVariable Long id){
        return employeurService.updateEmployeur(employeur, id);
    }

}
