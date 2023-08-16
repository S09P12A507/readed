package ssafy.readed.domain.bookclub.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.Date;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.repository.BookclubRepository;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class BookclubServiceImplTest {

    @Autowired
    BookclubRepository bookclubRepository;

    public static void bookclubCreate(){
        Bookclub bookclub = Bookclub.builder()
                .bookclubTitle("title1")
                .bookclubContent("content1")
                .startTime(LocalDateTime.now())
                .participantCount(5)
                .isPublic(true)
                .bookclubPassword("")
                .isFinished(false)
                .build();
    }

}