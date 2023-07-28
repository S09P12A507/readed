package ssafy.readed.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsUtils;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    //private final JwtAuthenticationFilter jwtAuthenticationFilter;

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return web -> {
//            web.ignoring()
//                    .antMatchers(
//                            "/images/**",
//                            "/js/**",
//                            "/css/**",
//                            "/api/members/sign-up"
//                    );
//        };
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable(); //csrf disable

        http
                .cors()
                .and()
                .authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .anyRequest().permitAll();
        http.formLogin()
                .disable();
        return http.build();
    }
}
