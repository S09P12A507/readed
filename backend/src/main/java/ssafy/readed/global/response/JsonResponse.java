package ssafy.readed.global.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;

public class JsonResponse {

    public static ResponseEntity<BaseResponse<Nullable>> fail(HttpStatus status, String message) {
        BaseResponse<Nullable> failureResponse = new BaseResponse<>(false, message, null);
        return ResponseEntity.status(status).body(failureResponse);
    }

    public static ResponseEntity<BaseResponse<Nullable>> ok(String message) {
        BaseResponse<Nullable> successResponse = new BaseResponse<>(true, message, null);
        return ResponseEntity.ok(successResponse);
    }

    public static <T> ResponseEntity<BaseResponse<T>> ok(String message, T data) {
        BaseResponse<T> successResponse = new BaseResponse<>(true, message, data);
        return ResponseEntity.ok(successResponse);
    }
}
