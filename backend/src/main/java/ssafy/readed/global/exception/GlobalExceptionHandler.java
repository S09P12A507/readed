package ssafy.readed.global.exception;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.readed.global.mattermost.NotificationManager;
import ssafy.readed.global.response.JsonResponse;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@RestControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final NotificationManager notificationManager;

    @ExceptionHandler(GlobalRuntimeException.class) // business Exception
    public ResponseEntity<?> handlingBusinessException(GlobalRuntimeException e, HttpServletRequest req) {
        log.warn(e.getMessage());
        sendMattermost(e, req);
        return JsonResponse.fail(e.statusCode, e.getMessage());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e, HttpServletRequest req) {
        // 검증 실패시 발생.
        sendMattermost(e, req);
        return JsonResponse.fail(HttpStatus.BAD_REQUEST, "잘못된 값입니다.");
    }

    // HttpMessageNotReadableException -> body의 타입이 잘못됨
    // HttpRequestMethodNotSupportedException-> method 지원 x
    @ExceptionHandler({ HttpMessageNotReadableException.class, HttpRequestMethodNotSupportedException.class })
    public ResponseEntity<?> handleDateTimeFormatException(HttpMessageNotReadableException e, HttpServletRequest req) {
        sendMattermost(e, req);
        return JsonResponse.fail(HttpStatus.BAD_REQUEST, "잘못된 요청입니다.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentHandlingException(MethodArgumentNotValidException e, HttpServletRequest req) {
        sendMattermost(e, req);
        return JsonResponse.fail(HttpStatus.BAD_REQUEST, "입력값 에러");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> internalServerException(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        sendMattermost(e, req);
        return JsonResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러");
    }

    private void sendMattermost(Exception e, HttpServletRequest req) {
        notificationManager.sendNotification(e, req.getRequestURI(), getParams(req));
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append("\n");
        }
        return params.toString();
    }
}