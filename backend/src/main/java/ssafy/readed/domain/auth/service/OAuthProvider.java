package ssafy.readed.domain.auth.service;


import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;

public interface OAuthProvider {

    String getToken(String code);

    String oauthAccessTokenUri(String code);

    OAuthDetailDto getOAuthDetail(String token);
}
