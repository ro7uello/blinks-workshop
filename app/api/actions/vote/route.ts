import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

export const GET = async (req: Request) => { // Assuming `req` is of type `Request` or similar
    const payload: ActionGetResponse = {
        title: "VOTE FOR YOUR PRESIDENT",
        icon: "https://i.imgur.com/6FS0nIp.jpeg",
        description: "Vote for your President",
        label: "vote",
        links: {
            actions: [
                {
                    label: "President A",
                    href: "https://blinks-workshop-one.vercel.app/api/actions/vote?president=PresidentA"
                },
                {
                    label: "President B",
                    href: "https://blinks-workshop-one.vercel.app/api/actions/vote?president=PresidentB"
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
        const transaction = await transferSolTransaction({ from: body.account, amount: 0 });

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
