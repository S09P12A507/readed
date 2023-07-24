package ssafy.readed.global.response;


import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PagableResponse<T> extends BaseResponse<T> {

    private PageInfo pageInfo;

}
