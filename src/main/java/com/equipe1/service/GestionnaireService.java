package com.equipe1.service;

import com.equipe1.model.ERole;
import com.equipe1.model.Gestionnaire;
import com.equipe1.model.Role;
import com.equipe1.repository.GestionnaireRepository;
import com.equipe1.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GestionnaireService {

    @Autowired
    private GestionnaireRepository gestionnaireRepository;

    @Autowired
    RoleRepository roleRepository;

    public GestionnaireService(GestionnaireRepository gestionnaireRepository){
        this.gestionnaireRepository = gestionnaireRepository;
    }

    public List<Gestionnaire> getGestionnaires(){
        return gestionnaireRepository.findAll();
    }

    public Optional<Gestionnaire> findGestionnaireById(Long idGestionnaire){
        return gestionnaireRepository.findById(idGestionnaire);
    }

    public Gestionnaire saveGestionnaire(Gestionnaire gestionnaire){

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(ERole.ROLE_GESTIONNAIRE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        gestionnaire.setRoles(roles);

        gestionnaireRepository.save(gestionnaire);
        return gestionnaire;
    }

    public Gestionnaire updateGestionnaire(Gestionnaire newGestionnaire, long id){
        Optional<Gestionnaire> optionalGestionnaire = gestionnaireRepository.findById(id);
        optionalGestionnaire.get().setEmail(newGestionnaire.getEmail());
        optionalGestionnaire.get().setTelephone(newGestionnaire.getTelephone());
        return gestionnaireRepository.save(optionalGestionnaire.get());
    }
}
