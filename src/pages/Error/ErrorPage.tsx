import { useQuery } from "@tanstack/react-query";
import { callGetError } from "../../apis/data";

export const ErrorPage = () => {
  const { data } = useQuery({
    queryKey: ["getError"],
    queryFn: callGetError,
  });
  return <>잠시만 기다려주세요. 에러 페이지 입니다.</>;
};
