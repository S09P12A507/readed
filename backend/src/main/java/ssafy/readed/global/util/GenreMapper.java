package ssafy.readed.global.util;

import java.util.HashMap;
import java.util.Map;

public class GenreMapper {

    private static final Map<Integer, String> genreMapper = new HashMap<>() {
        {
            put(1, "종교");
            put(2, "과학");
            put(3, "자기계발");
            put(4, "역사");
            put(5, "경제|경영");
            put(6, "만화");
            put(7, "추리|미스테리");
            put(8, "SF|판타지");
            put(9, "문학");
            put(10, "에세이");
        }
    };

    public static String getGenre(Integer genreId) {
        return genreMapper.get(genreId);
    }

}
