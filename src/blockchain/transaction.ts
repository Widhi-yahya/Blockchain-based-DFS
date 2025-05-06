class Transaction {
    sender: string;
    recipient: string;
    amount: number;

    constructor(sender: string, recipient: string, amount: number) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }
}