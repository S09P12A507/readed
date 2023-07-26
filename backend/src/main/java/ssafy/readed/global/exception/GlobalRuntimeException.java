package ssafy.readed.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GlobalRuntimeException extends RuntimeException {

    HttpStatus statusCode;

    public GlobalRuntimeException(String message, HttpStatus statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
