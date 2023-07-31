package ssafy.readed.domain.member.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.readed.domain.member.entity.Member;

@Getter
@NoArgsConstructor
@ToString
public class SelectMemberResponseDto {

    private Long id;
    private String email;
    private String name;

    @Builder
    public SelectMemberResponseDto(Long id, String email, String name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public static SelectMemberResponseDto from(Member member) {
        return SelectMemberResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .build();
    }
}
