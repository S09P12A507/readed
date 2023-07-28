package ssafy.readed.global.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret.key}")
    private String salt;

    //private Key secretKey;

    private final long exp = 1000L * 60 * 60;

    private final MemberRepository memberRepository;

    public String createToken(String email) {
        Claims claims = Jwts.claims().setSubject(email);
        //claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + exp))

                .signWith(SignatureAlgorithm.ES256, salt)
                .compact();
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
        return Jwts.parser().setSigningKey(salt).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(salt).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

}
