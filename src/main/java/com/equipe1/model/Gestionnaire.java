package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gestionnaire extends User {

    {
        this.desc = "Gestionnaire";
    }

    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;
}
