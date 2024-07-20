import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { ColorGameBet } from "./colors/transaction"; // Assuming this is the correct path

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "Color Game",
        icon: "https://i.imgur.com/VmX0PfW.jpeg",
        description: "Bet your SOL to a color",
        label: "Try",
        links: {
            actions: [
                {
                    label: "RED",
                    href: "/api/actions/bet?color=red" // Adjusted to include query parameter for color
                },
                {
                    label: "BLUE",
                    href: "/api/actions/bet?color=blue"
                },
                {
                    label: "YELLOW",
                    href: "/api/actions/bet?color=yellow"
                },
                {
                    label: "WHITE",
                    href: "/api/actions/bet?color=white"
                },
                {
                    label: "PINK",
                    href: "/api/actions/bet?color=pink"
                },
                {
                    label: "GREEN",
                    href: "/api/actions/bet?color=green"
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
        const { account } = body; // Assuming 'account' is part of ActionPostRequest

        // Extract 'color' from query parameters or body, depending on how it's passed
        const queryParams = new URLSearchParams(req.url.split('?')[1]); // Extract query params
        const color = queryParams.get('color') || ''; // Get 'color' from query params

        // Validate 'color' if necessary

        // Perform transaction with ColorGameBet function
        const transaction = await ColorGameBet({ from: account, amount: 1, color: color });

        // Create response payload
        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: `Send 1 SOL to ${color.toUpperCase()}`, // Example message showing selected color
            },
        });

        // Send response with CORS headers
        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
        });
};
