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
                    href: "/api/actions/vote?president=PresidentA"
                },
                {
                    label: "President B",
                    href: "/api/actions/vote?president=PresidentB"
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
        const body: ActionPostRequest = await req.json();
        const transaction = await transferSolTransaction({ from: body.account, amount: 0 });

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                message: `Your vote is submitted!`,
            },
        });
        console.log("pasok to");
        return Response.json(payload, {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (error) {
        console.error('Error processing request:', error);

        if (error instanceof SyntaxError) {
            console.log("invalid");
            return Response.json({ error: 'Invalid JSON input' }, {
                status: 400,
                headers: ACTIONS_CORS_HEADERS,
            });
        } else {
            console.log("error dito");
            return Response.json({ error: 'Unexpected error processing request' }, {
                status: 500,
                headers: ACTIONS_CORS_HEADERS,
            });
        }
    }
};
