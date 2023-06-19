import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;

  constructor(private stompService: Stomp) {
    this.stompClient = stompService;
  }

  public connect(): void {
    const socket = new SockJS('http://localhost:8080/chat-websocket');
    this.stompClient.webSocketFactory = () => socket;
    this.stompClient.activate();
  }

  /*
  public subscribeToPrivateMessages(username: string): Observable<Message> {
    return this.stompService.subscribe(`/user/${username}/queue/private`);
  }*/

  

  public sendMessage(destination: string, message: any): void {
    this.stompClient.publish({ destination, body: JSON.stringify(message) });
  }
}