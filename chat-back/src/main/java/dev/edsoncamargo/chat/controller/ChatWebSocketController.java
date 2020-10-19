package dev.edsoncamargo.chat.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Log4j2
public class ChatWebSocketController {

  private final SimpMessagingTemplate template;

  public ChatWebSocketController(SimpMessagingTemplate template) {
    this.template = template;
  }

  @MessageMapping("/chat/{room}")
  public void onReceivedMessage(@DestinationVariable String room, @Payload String message) {
    log.info(message);
    this.template.convertAndSend("/queue/topic/" + room, message);
  }
}
