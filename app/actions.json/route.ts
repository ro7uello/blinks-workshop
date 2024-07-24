import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/",
        apiPath: "/api/actions/transfer-sol", // Default action path
      }
      // ,
      // {
      //   pathPattern: "/",
      //   apiPath: "/api/actions/vote/president-a", // Endpoint for voting President A
      // },
      // {
      //   pathPattern: "/",
      //   apiPath: "/api/actions/vote/president-b", // Endpoint for voting President B
      // },
    ],
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// OPTIONS method mirrors the GET method for CORS compatibility
export const OPTIONS = GET;
