package com.coen6313g2.demo;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
public class Configuration implements WebMvcConfigurer {
	
	
	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/*").allowedOrigins("*").allowedMethods("GET, POST, PUT, DELETE, OPTIONS");
	    }
	

}
