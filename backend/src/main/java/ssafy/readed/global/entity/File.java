package ssafy.readed.global.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@NoArgsConstructor
public abstract class File extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long id;

    private String originalFilename;

    private String savedFilename;

    private String savedPath;

    public File(String originalFilename, String savedFilename, String savedPath) {
        this.originalFilename = originalFilename;
        this.savedFilename = savedFilename;
        this.savedPath = savedPath;
    }

}
