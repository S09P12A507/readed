package ssafy.readed.domain.member.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.File;

import javax.persistence.*;

@DiscriminatorValue("MemberProfile")
@Getter
@Entity
@NoArgsConstructor
public class MemberProfileFile extends File {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public MemberProfileFile(String originalFilename, String savedFilename, String savedPath, Member member) {
        super(originalFilename, savedFilename, savedPath);
        this.member = member;
    }
}
