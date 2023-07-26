package ssafy.readed.global.exception;

import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.readed.global.response.JsonResponse;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(GlobalRuntimeException.class) // business Exception
    public ResponseEntity<?> handlingBusinessException(GlobalRuntimeException e) {
        log.warn(e.getMessage());
        return JsonResponse.fail(e.statusCode, e.getMessage());
    }


    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e)
            throws IOException {
        // 검증 실패시 발생.
        return JsonResponse.fail(HttpStatus.BAD_REQUEST, "잘못된 값입니다.");
    }

    // HttpMessageNotReadableException -> body의 타입이 잘못됨
    // HttpRequestMethodNotSupportedException-> method 지원 x
    @ExceptionHandler(value = {HttpMessageNotReadableException.class,
            HttpRequestMethodNotSupportedException.class})
    public ResponseEntity<?> handleDateTimeFormatException(HttpMessageNotReadableException e)
            throws IOException {
        return JsonResponse.fail(HttpStatus.BAD_REQUEST, "잘못된 요청입니다.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentHandlingException(MethodArgumentNotValidException e)
            throws IOException {
        return JsonResponse.fail(HttpStatus.BAD_REQUEST, "입력값 에러");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> internalServerException(Exception e) throws IOException {
        e.printStackTrace();
        return JsonResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러");
    }
}