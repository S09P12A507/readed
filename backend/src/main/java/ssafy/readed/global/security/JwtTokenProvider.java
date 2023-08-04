package ssafy.readed.global.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import ssafy.readed.domain.auth.vo.Token;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import ssafy.readed.global.exception.GlobalRuntimeException;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret.key}")
    private String accessTokenSalt;

    @Value("${jwt.secret.refresh}")
    private String refreshTokenSalt;

    private final long EXPIRATION_TIME_OF_ACCESS_TOKEN = 1000L * 60 * 60;
    private final long EXPIRATION_TIME_OF_REFRESH_TOKEN = 1000L * 60 * 60 * 24 * 30;

    private final MemberRepository memberRepository;

    public Token createToken(String email) {
        Claims claims = Jwts.claims().setSubject(email);
        //claims.put("roles", roles);
        Date now = new Date();
        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + EXPIRATION_TIME_OF_ACCESS_TOKEN))
                .signWith(SignatureAlgorithm.HS256, accessTokenSalt)
                .compact();
        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + EXPIRATION_TIME_OF_REFRESH_TOKEN))
                .signWith(SignatureAlgorithm.HS256, refreshTokenSalt)
                .compact();

        return Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    public Authentication getAuthentication(String token) {
        Member member = memberRepository.findByEmail(this.getEmail(token));
        Collection<? extends GrantedAuthority> authorities = new ArrayList<>(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        return new UsernamePasswordAuthenticationToken(member, "",
                authorities);
    }

    private String getEmail(String token) {
        return Jwts.parser().setSigningKey(accessTokenSalt).parseClaimsJws(token).getBody()
                .getSubject();
    }

    private String getEmailFromRefreshToken(String token) {
        return Jwts.parser().setSigningKey(refreshTokenSalt).parseClaimsJws(token).getBody()
                .getSubject();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-READED-ACCESSTOKEN");
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        return request.getHeader("X-READED-REFRESHTOKEN");
    }

    public boolean validateAccessToken(String accessToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(accessTokenSalt)
                    .parseClaimsJws(accessToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(refreshTokenSalt)
                    .parseClaimsJws(refreshToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String refreshAccessToken(String refreshToken){
        if(validateRefreshToken(refreshToken)){
            String email = getEmailFromRefreshToken(refreshToken);
            return reCreationAccessToken(email);
        } else {
            throw new GlobalRuntimeException("유효하지 않은 리프레시 토큰입니다.", HttpStatus.FORBIDDEN);
        }
    }

    public String reCreationAccessToken(String email) {
        Claims claims = Jwts.claims().setSubject(email);
        //claims.put("roles", roles);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + EXPIRATION_TIME_OF_ACCESS_TOKEN))
                .signWith(SignatureAlgorithm.HS256, accessTokenSalt)
                .compact();
    }

}
