import { QueryClient } from "@tanstack/react-query";
import queryClientConfig from "./config";

const createQueryClient = () => {
  return new QueryClient(queryClientConfig);
};

let browserQueryClient: QueryClient = null!;

export default function getQueryClient() {
  if (typeof window === "undefined") {
    return createQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
}
