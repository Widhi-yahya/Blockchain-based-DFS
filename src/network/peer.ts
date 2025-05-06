import { Socket } from 'socket.io-client';

export class Peer {
    private socket: Socket;

    constructor(private id: string, private serverUrl: string) {
        this.socket = this.connectToServer();
    }

    private connectToServer(): Socket {
        const socket = new Socket(this.serverUrl);
        socket.on('connect', () => {
            console.log(`Connected to server as ${this.id}`);
        });
        socket.on('disconnect', () => {
            console.log(`Disconnected from server`);
        });
        return socket;
    }

    public broadcastTransaction(transaction: any): void {
        this.socket.emit('transaction', transaction);
    }

    public onTransactionReceived(callback: (transaction: any) => void): void {
        this.socket.on('transaction', (transaction: any) => {
            callback(transaction);
        });
    }

    public connectToPeer(peerId: string): void {
        this.socket.emit('connectPeer', peerId);
    }

    public onPeerConnected(callback: (peerId: string) => void): void {
        this.socket.on('peerConnected', (peerId: string) => {
            callback(peerId);
        });
    }
}