package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HomeController {
  @RequestMapping("/{username}")
  public String user(@PathVariable String username) {
    return "Nothing.";
  }

  @RequestMapping("/admin")
  public String admin() {
    return "Welcome to the admin panel!";
  }
}
