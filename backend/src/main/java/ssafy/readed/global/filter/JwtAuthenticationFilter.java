package ssafy.readed.global.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.security.JwtTokenProvider;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

        logger.info("Req URI : " + ((HttpServletRequest) request).getRequestURI());

        String requestURI = ((HttpServletRequest) request).getRequestURI();

        if (requestURI.equals("/api/members/sign-up")) {
            chain.doFilter(request, response);
            return;
        }

        if (requestURI.equals("/api/auth/sign-in")) {
            chain.doFilter(request, response);
            return;
        }

        if (token == null) {
            //토큰 정보 없음
            throw new GlobalRuntimeException("토큰 요청 정보가 없습니다.", HttpStatus.BAD_REQUEST);
        }

        if (!jwtTokenProvider.validateToken(token)) {
            //유효성 체크 실패
            throw new GlobalRuntimeException("유효하지 않은 토큰입니다.", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        chain.doFilter(request, response);

    }
}
