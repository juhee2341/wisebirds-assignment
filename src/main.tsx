import App from "./App.tsx";
import "./reset.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function enableMocking() {
  const { worker } = await import("./mocks/browser.js");

  return worker.start({
    onUnhandledRequest: (request, print) => {
      if (!request.url.includes("/api/")) {
        console.log("/api/ 가 포함되지 않은 요청 url", request.url);
        return;
      }

      // 그 외의 처리되지 않은 요청에 대해서는 경고 출력
      print.warning();
    },
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
});
