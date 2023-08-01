package ssafy.readed.domain.auth.service;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
public class KakaoOAuthProvider implements OAuthProvider {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_CLIENT_KEY;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URI;
    private static final String KAKAO_BASE_URL = "https://kauth.kakao.com";
    private static final String KAKAO_USER_URL = "https://kapi.kakao.com/v2/user/me";


    @Override
    public String getToken(String code) {
        WebClient kakaoOAuthWebClient = getKakaoClient(KAKAO_BASE_URL);

        String uri = oauthAccessTokenUri(code); //토큰 가져오는 uri

        Map result = kakaoOAuthWebClient.post()
                .uri(uri)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (result == null) {
            throw new GlobalRuntimeException("카카오 access token을 받아오지 못함.", HttpStatus.BAD_REQUEST);
        }

        return (String) result.get("access_token");
    }

    @Override
    public String oauthAccessTokenUri(String code) {
        StringBuilder sb = new StringBuilder();
        final String URI_PREFIX = "/oauth/token";
        sb.append(URI_PREFIX)
                .append("?grant_type=authorization_code")
                .append("&redirect_uri=").append(KAKAO_REDIRECT_URI)
                .append("&client_id=").append(KAKAO_CLIENT_KEY)
                .append("&code=").append(code);
        return sb.toString();
    }

    @Override
    public OAuthDetailDto getOAuthDetail(String token) {

        WebClient kakaoUserDetailClient = getKakaoClient(KAKAO_USER_URL);

        Map user_info = kakaoUserDetailClient.get()
                .header("Authorization", "Bearer " + token)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        //System.out.println(user_info.toString());

        if (user_info == null) {
            throw new GlobalRuntimeException("카카오 사용자 정보를 받아오지 못함", HttpStatus.BAD_REQUEST);
        }

        String id = (String) user_info.get("id");
        Map<String, Object> properties = (Map<String, Object>) user_info.get("properties");
        Map<String, Object> kakao_account = (Map<String, Object>) user_info.get(
                "kakao_account");
        String nickname = (String) properties.get("nickname");
        String email = (String) kakao_account.get("email");

        OAuthDetailDto detailDto = new OAuthDetailDto(id, email, nickname);

        return detailDto;
    }

    private static WebClient getKakaoClient(String kakaoUrl) {
        return WebClient.builder()
                .baseUrl(kakaoUrl)
                .build();
    }
}
