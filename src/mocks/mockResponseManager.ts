import { HttpStatusCode } from "axios";
import { HttpResponse } from "msw";

export const getMockResponseManager = async ({
  statusCode,
  successData,
  errorData,
}: {
  statusCode: HttpStatusCode;
  successData?: object;
  errorData?: object;
}) => {
  if (statusCode.toString().startsWith("2")) {
    console.log("==== 요청 성공 ====");
    return HttpResponse.json(successData || { message: "Success" }, {
      status: statusCode,
    });
  }

  if (statusCode.toString().startsWith("4")) {
    console.log("==== 클라이언트 오류 ====");
    return HttpResponse.json(
      errorData || { resultCode: statusCode, resultMessage: "클라이언트 오류" },
      { status: statusCode }
    );
  }

  if (statusCode.toString().startsWith("5")) {
    console.log("==== 서버 오류 ====");
    return HttpResponse.json(
      errorData || { resultCode: statusCode, resultMessage: "서버 오류" },
      { status: statusCode }
    );
  }
};
