package com.veille.technologique;

import com.veille.technologique.service.InsertDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringBootSecurityApplication {

	@Autowired
	private InsertDataService service;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(){
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				service.insertEtudiant();
				service.insertEmployeur();
				service.insertGestionnaire();
			}
		};
	}
}
