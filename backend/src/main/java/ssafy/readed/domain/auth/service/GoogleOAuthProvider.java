package ssafy.readed.domain.auth.service;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@Repository
@RequiredArgsConstructor
public class GoogleOAuthProvider implements OAuthProvider {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String GOOGLE_REDIRECT_URI;
    private final String GOOGLE_BASE_URL = "https://oauth2.googleapis.com";

    @Override
    public String getToken(String code) {

        WebClient googleWebClient = WebClient.builder()
                .baseUrl(GOOGLE_BASE_URL)
                .build();

        String uri = oauthAccessTokenUri(code); //토큰 가져오는 uri

        Map result = googleWebClient.post()
                .uri(uri)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (result == null) {
            throw new GlobalRuntimeException("구글 access token을 받아오지 못함", HttpStatus.BAD_REQUEST);
        }

        return (String) result.get("access_token");
    }

    @Override
    public String oauthAccessTokenUri(String code) {
        StringBuilder sb = new StringBuilder();
        final String URI_PREFIX = "/token";

        sb.append(URI_PREFIX)
                .append("?client_id=").append(GOOGLE_CLIENT_ID)
                .append("&client_secret=").append(GOOGLE_CLIENT_SECRET)
                .append("&redirect_uri=").append(GOOGLE_REDIRECT_URI)
                .append("&grant_type=").append("authorization_code")
                .append("&code=").append(code);
        return sb.toString();
    }

    @Override
    public OAuthDetailDto getOAuthDetail(String token) {

        return null;
    }


}
