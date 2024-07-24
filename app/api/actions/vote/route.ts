import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        icon: "https://i.imgur.com/6FS0nIp.jpeg",
        title: "VOTE FOR YOUR PRESIDENT",
        description: "Vote for your President",
        label: "vote",
        links: {
            actions: [
                {
                    label: "President A",
                    href: "/api/actions/vote/president-a" // Endpoint for voting President A
                },
                {
                    label: "President B",
                    href: "/api/actions/vote/president-b" // Endpoint for voting President B
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

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();

    let amount = 0;

    // Determine the amount based on the label received in the request body
    if (body.account === "President A") {
        // Log the vote in the console
        console.log(`User voted for President A`);
    } else if (body.account === "President B") {
        // Log the vote in the console
        console.log(`User voted for President B`);
    } else {
        // Handle error or default case
        amount = 0; // Default amount, if necessary
        console.log(`Invalid vote option`);
    }

    // Simulating a transaction (functionality not fully shown)
    const transaction = await transferSolTransaction({ from: body.account, amount });

    // Creating a response payload
    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: `Your vote for ${body.account} is submitted!`,
        },
    });

    // Returning the response with the payload and CORS headers
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};
