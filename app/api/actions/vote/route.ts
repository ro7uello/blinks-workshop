import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { vote } from "./transaction";

export const GET = async (req: Request) => { // Assuming `req` is of type `Request` or similar
    const payload: ActionGetResponse = {
        icon: "https://i.imgur.com/6FS0nIp.jpeg",
        title: "VOTE FOR YOUR PRESIDENT",
        description: "Vote for your President",
        label: "vote",
        links: {
            actions: [
                { //trial
                    label: "President A",
                    href: "api/jupiter/swap/USDC-SOL/10"
                },
                {
                    label: "President B",
                    href: "api/jupiter/swap/USDC-SOL/100"
                }
            ]
        }
    };

    // Adding a console.log statement to log the received GET request URL
    console.log("GET request received:", req.url);

    // Returning the response with the payload and CORS headers
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};

export const OPTIONS = GET; // OPTIONS method mirrors the GET method

export const POST = async (req: Request) => { // Assuming `req` is of type `Request` or similar
  
        const body: ActionPostRequest = await req.json();

        // Logging the incoming POST request body
        console.log("POST request received. Body:", body);

        // Simulating a transaction (functionality not fully shown)
        const transaction = await vote({ from: body.account, amount: 0 });

        // Creating a response payload
        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: `Your vote is submitted!`,
            },
        });

        // Returning the response with the payload and CORS headers
        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
    });
};
