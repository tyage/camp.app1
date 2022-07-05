package seccamp.notification;

import java.util.Random;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class HomeController {
  @RequestMapping("/{username}")
  public String user(@PathVariable String username) {
    return "新しいメッセージ: システム「" + username + "さんこんにちは。」";
  }

  @RequestMapping("/admin")
  public String admin() {
    return adminNotification();
  }

  private String adminNotification() {
    String[] dishes = {
        "チーズダッカルビ", "鮭のレモンバターソース", "唐辛子の旨辛から揚げ", "麻婆茄子", "チキンのガーリックオイル焼き"
    };
    int number = (new Random()).nextInt(dishes.length);

    return "新しいメッセージ: 今日のご飯は" + dishes[number] + "です。";
  }
}
