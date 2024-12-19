import {
    defaultShouldDehydrateQuery,
    QueryClientConfig,
  } from "@tanstack/react-query";
  
  const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery(query) {
          return (
            defaultShouldDehydrateQuery(query) || query.state.status === "pending"
          );
        },
      },
    },
  };
  
  export default queryClientConfig;
  