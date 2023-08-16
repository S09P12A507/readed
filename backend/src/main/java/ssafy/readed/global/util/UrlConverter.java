package ssafy.readed.global.util;

import java.util.HashMap;
import java.util.Map;

public class UrlConverter {

    private static Map<ItemType, String> urlMapper = new HashMap<>() {
        {
            put(ItemType.ALADIN, "https://www.aladin.co.kr/m/mproduct.aspx?ItemId=");
            put(ItemType.KYOBO, "https://product.kyobobook.co.kr/detail/");
            put(ItemType.YES24, "https://m.yes24.com/Goods/Detail/");
            put(ItemType.E_ALADIN, "https://www.aladin.co.kr/m/mproduct.aspx?ItemId=");
            put(ItemType.E_KYOBO, "https://ebook-product.kyobobook.co.kr/dig/epd/ebook/");
            put(ItemType.E_YES24, "https://m.yes24.com/Goods/Detail/");
            put(ItemType.E_RIDI, "https://ridibooks.com/books/");
            put(ItemType.E_MILLIE, "https://www.millie.co.kr/v3/bookDetail/");
        }
    };

    public static String getLinkUrl(ItemType itemType, String itemId) {
        return itemId != null ? urlMapper.get(itemType) + itemId : null;
    }
}
