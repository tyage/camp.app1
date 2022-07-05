package seccamp.notification;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HomeController {
  @RequestMapping("/{username}")
  public String user(@PathVariable String username) {
    return username + "さんへのお知らせ: " + randomNotification();
  }

  @RequestMapping("/admin")
  public String admin() {
    return "管理者向けのお知らせ: " + adminNotification();
  }

  private String randomNotification() {
    return "";
  }

  private String adminNotification() {
    return "";
  }
}
