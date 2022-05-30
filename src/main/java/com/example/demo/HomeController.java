package com.example.demo;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

  @RequestMapping("/{username}")
  public String home(@PathVariable String username) {
    return "Hello " + username;
  }

  @RequestMapping("/admin")
  public String admin() {
    return "Welcome to the admin panel!";
  }
}
