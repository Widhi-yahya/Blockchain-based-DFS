import { Block } from './block';

export class Blockchain {
    private chain: Block[];
    private difficulty: number;
    private pendingTransactions: any[];

    constructor() {
        this.chain = [];
        this.difficulty = 4; // Example difficulty
        this.pendingTransactions = [];
        this.createGenesisBlock();
    }

    private createGenesisBlock(): void {
        const genesisBlock = new Block(0, Date.now(), [], "0");
        this.chain.push(genesisBlock);
    }

    public getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    public addBlock(newBlock: Block): void {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    public validateChain(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    public getChain(): Block[] {
        return this.chain;
    }

    public addTransaction(transaction: any): void {
        this.pendingTransactions.push(transaction);
    }
}