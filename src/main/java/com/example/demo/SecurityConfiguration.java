package com.example.demo;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfiguration {
  @Bean
  public FilterRegistrationBean<AuthFilter> auth() {
    FilterRegistrationBean<AuthFilter> bean = new FilterRegistrationBean<AuthFilter>();
    bean.setFilter(new AuthFilter());
    return bean;
  }

}
