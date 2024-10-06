import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatMessage {
  senderId: string;
  receiverId: string;
  message: string;
}

class ChatService {
  private client: Client | null;

  constructor() {
    this.client = null;
  }

  connect(userId: string, onMessageReceived: (message: ChatMessage) => void): void {
    const socket = new SockJS('http://localhost:8080/ws');
    this.client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.client?.subscribe(`/user/${userId}/queue/messages`, (message: IMessage) => {
          if (onMessageReceived) {
            onMessageReceived(JSON.parse(message.body));
          }
        });
      },
      debug: (str: string) => {
        console.log(str);
      },
      // Optional: handle error
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers.message);
      },
    });

    this.client.activate();
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }

  sendMessage(chatMessage: ChatMessage): void {
    this.client?.publish({
      destination: '/app/chat',
      body: JSON.stringify(chatMessage),
    });
  }
}

export default new ChatService();