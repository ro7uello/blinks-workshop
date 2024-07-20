import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./transaction";

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "VOTE FOR YOUR PRESIDENT",
        icon: "https://i.imgur.com/6FS0nIp.jpeg",
        description: "Vote for your President",
        label: "President A",
        links: {
            actions: [
                {
                    label: "President A",
                    href: "/api/actions/vote?president=PresidentA" // Adjusted endpoint with query parameter
                },
                {
                    label: "President B",
                    href: "/api/actions/vote?president=PresidentB" // Adjusted endpoint with query parameter
                }
            ]
        }
    };

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();

    // Check the query parameter to determine which president was voted for
    const president = req.url.includes('president=PresidentA') ? 'President A' : 'President B';

    // Log the vote
    console.log(`User voted for ${president}`);

    // Perform the transaction (transferSolTransaction)
    const transaction = await transferSolTransaction({ from: body.account, amount: 0 });

    // Create response payload
    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: `Your vote for ${president} is submitted!`,
        },
    });

    // Send response with CORS headers
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
};
