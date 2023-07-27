package ssafy.readed.domain.member.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Password {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "password_id")
    private Long id;
    private String passwordValue;
    @OneToOne(mappedBy = "password")
    private Member member;

    @Builder
    public Password(String passwordValue) {
        this.passwordValue = passwordValue;
    }
}
