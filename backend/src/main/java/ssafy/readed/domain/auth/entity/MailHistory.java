package ssafy.readed.domain.auth.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MailHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "mail_history_id")
    private Long id;
    private String email;
    private String code;
    private boolean isAuthed;
    private LocalDateTime sendDate;

    public static MailHistory defaultMailHistory(String email, String code) {
        return MailHistory.builder()
                .email(email)
                .code(code)
                .isAuthed(false)
                .sendDate(LocalDateTime.now())
                .build();
    }

    public boolean checkAuthCode(String code) {
        if (this.code.equals(code)) {
            isAuthed = true;
        }
        return isAuthed;
    }

    public boolean isOverTimeLimit(LocalDateTime curDate) {
        final int TIME_LIMIT = 5;
        LocalDateTime timeLimit = sendDate.plusMinutes(TIME_LIMIT);
        return curDate.isAfter(timeLimit);
    }
}
