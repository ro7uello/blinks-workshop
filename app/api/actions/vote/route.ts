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
    try {
        // Parse JSON data from request body
        const body: ActionPostRequest = await req.json();

        // Perform necessary operations with body data
        const transaction = await transferSolTransaction({ from: body.account, amount: 0 });

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: `Your vote is submitted!`,
            },
        });

        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (error) {
        console.error('Error processing request:', error);

        // Handle specific error scenarios
        if (error instanceof SyntaxError) {
            // JSON parsing error
            return Response.json({ error: 'Invalid JSON input' }, {
                status: 400, // Bad Request status code
                headers: ACTIONS_CORS_HEADERS,
            });
        } else {
            // General server error
            return Response.json({ error: 'Unexpected error processing request' }, {
                status: 500, // Internal Server Error status code
                headers: ACTIONS_CORS_HEADERS,
            });
        }
    }
};