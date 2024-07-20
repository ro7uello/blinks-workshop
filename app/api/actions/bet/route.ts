import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from "@solana/actions";
import { transferSolTransaction } from "./colors/transaction";

export const GET = async (req: Request) => {
    const payload: ActionGetResponse = {
        title: "Color Game",
        icon: "https://i.imgur.com/VmX0PfW.jpeg",
        description: "bet your sol to a color",
        label: "Try",
        "links": {
        "actions": [
            {
                "label": "RED",
                "href": "/"
            },
            {
                "label": "BLUE",
                "href": "/"
            },
            {
                "label": "YELLOW",
                "href": "/"
            },
            {
                "label": "WHITE",
                "href": "/"
            },
            {
                "label": "PINK",
                "href": "/"
            },
            {
                "label": "GREEN",
                "href": "/"
            }
        ]
    }
    }

    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();
    const transaction = await transferSolTransaction({ from: body.account, amount: 1 })

    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: `Send 1 SOL`,
        },
    });
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
    });
}