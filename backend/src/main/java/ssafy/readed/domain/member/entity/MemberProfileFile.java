package ssafy.readed.domain.member.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.File;

@DiscriminatorValue("MemberProfile")
@Getter
@Entity
@NoArgsConstructor
public class MemberProfileFile extends File {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public MemberProfileFile(String originalFilename, String savedFilename, String savedPath,
            Member member) {
        super(originalFilename, savedFilename, savedPath);
        this.member = member;
    }
}
