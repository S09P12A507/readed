package ssafy.readed.domain.member.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_id")
    private Long id;
    private String email;
    @Column(name = "member_name")
    private String name;
    @Enumerated(EnumType.STRING)
    private Provider provider;
    private String nickname;
    private String profile_bio;
    private String profile_image;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "password_id")
    private Password password;

    @Builder
    public Member(Long id, String email, String name, Provider provider, String nickname,
            String profile_bio, String profile_image, Password password) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.nickname = nickname;
        this.profile_bio = profile_bio;
        this.profile_image = profile_image;
        this.password = password;
    }

    @Builder
    public Member(String email, String name, Provider provider, String nickname) {
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.nickname = nickname;
        this.password = password;
    }
}
