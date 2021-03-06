package seccamp.notification;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthFilter extends OncePerRequestFilter {
  // authと共有している秘密の鍵
  @Value("${notification.jwt_secret:superdupersecretkey}")
  private String JWT_SECRET_KEY;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    if (request.getMethod().equals("OPTIONS") || isJwtValid(request)) {
      chain.doFilter(request, response);
    } else {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
  }

  // このJWTでリクエストパスにアクセスする権限があるか確認
  private Boolean isJwtValid(HttpServletRequest request) {
    final String jwtToken = retrieveToken(request);
    if (jwtToken == null) {
      return false;
    }

    DecodedJWT jwt;
    try {
      Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET_KEY);
      JWTVerifier verifier = JWT.require(algorithm).build();
      jwt = verifier.verify(jwtToken);
    } catch (JWTVerificationException exception) {
      return false;
    }

    // JWTのaudienceがリクエストパスと一致していればOK
    List<String> audience = jwt.getAudience();
    if (audience == null) {
      return false;
    }
    Boolean matchAudience = audience.stream()
        .anyMatch(s -> s.equals(request.getRequestURI()));
    return matchAudience;
  }

  // トークン取得
  // Authorization: Bearer XXXXXXX
  private String retrieveToken(HttpServletRequest request) {
    final String tokenPrefix = "Bearer ";
    final String tokenHeader = request.getHeader("Authorization");
    if (tokenHeader == null || !tokenHeader.startsWith(tokenPrefix)) {
      return null;
    }
    return tokenHeader.substring(tokenPrefix.length());
  }

}
