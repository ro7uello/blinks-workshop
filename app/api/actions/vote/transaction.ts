import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl } from "@solana/web3.js";

type TransferSolTransactionParam = {
    from: string,
    amount: number,
}

export const transferSolTransaction = async (params: TransferSolTransactionParam): Promise<Transaction> => {
    const { from, amount } = params;

    const fromPubkey = new PublicKey(from);
    const toPubkey = new PublicKey('A3Ma8NKBda1rLkgLp4oZye4dJaqXoQFKjf2c83bcuQSs'); // Example static receiver

    const connection = new Connection(
        process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    if (amount * LAMPORTS_PER_SOL <= minimumBalance) {
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

    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    return transaction;
};
