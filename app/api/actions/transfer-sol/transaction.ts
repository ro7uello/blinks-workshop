import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl } from "@solana/web3.js";

type ColorGameBet = {
    from: string,
    amount: number,
    color: string,  // New field for color
}

export const transferSolTransaction = async (params: ColorGameBet): Promise<Transaction> => {
    const { from, amount, color } = params;

    // Define receiver addresses for each color
    let toPubkey: PublicKey;
    switch (color.toUpperCase()) {
        case 'RED':
            toPubkey = new PublicKey('your-red-receiver-address');
            break;
        case 'BLUE':
            toPubkey = new PublicKey('your-blue-receiver-address');
            break;
        case 'YELLOW':
            toPubkey = new PublicKey('your-yellow-receiver-address');
            break;
        case 'WHITE':
            toPubkey = new PublicKey('your-white-receiver-address');
            break;
        case 'PINK':
            toPubkey = new PublicKey('your-pink-receiver-address');
            break;
        case 'GREEN':
            toPubkey = new PublicKey('5MaVSc3pAWv6XLYndqeMLd4HNp5smEe4xrnvq94KxEPu'); // Example: static receiver for GREEN
            break;
        default:
            throw new Error(`Unsupported color: ${color}`);
    }

    const fromPubkey = new PublicKey(from);

    const connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
        0, // note: simple accounts that just store native SOL have `0` bytes of data
    );
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
        throw new Error(`Account may not be rent exempt: ${toPubkey.toBase58()}`);
    }

    const transaction = new Transaction();
    transaction.feePayer = fromPubkey;

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: fromPubkey,
            toPubkey: toPubkey,
            lamports: amount * LAMPORTS_PER_SOL,
        }),
    );

    transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
    ).blockhash;

    return transaction;
}
