package ssafy.readed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ReadedApplication {

    //google.yml 을 프로젝트 실횅시 호출 할 수 있도록 넣어주기
//	private static final String GOOGLE_PROPERTIES = "spring.config.location=classpath:/google.yml";
    public static void main(String[] args) {
        SpringApplication
                .run(ReadedApplication.class, args);
    }

}