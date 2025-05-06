import { randomBytes } from 'crypto';

class Shard {
    constructor(public id: string, public nodes: string[]) {}
}

export class Sharding {
    private shards: Shard[] = [];
    private readonly shardCount: number;

    constructor(shardCount: number, nodes: string[]) {
        this.shardCount = shardCount;
        this.initializeShards(nodes);
    }

    private initializeShards(nodes: string[]) {
        for (let i = 0; i < this.shardCount; i++) {
            this.shards.push(new Shard(`shard-${i}`, []));
        }
        this.distributeNodes(nodes);
    }

    private distributeNodes(nodes: string[]) {
        nodes.forEach((node, index) => {
            const shardIndex = index % this.shardCount;
            this.shards[shardIndex].nodes.push(node);
        });
    }

    public getShardForFile(fileId: string): Shard {
        const hash = this.hashFileId(fileId);
        const shardIndex = hash % this.shardCount;
        return this.shards[shardIndex];
    }

    private hashFileId(fileId: string): number {
        const hash = randomBytes(4).readUInt32BE(0);
        return hash ^ this.simpleHash(fileId);
    }

    private simpleHash(input: string): number {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash = (hash << 5) - hash + input.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}