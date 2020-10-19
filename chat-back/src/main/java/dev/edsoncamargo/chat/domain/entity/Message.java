package dev.edsoncamargo.chat.domain.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Message {
  String id;
  String user;
  String senderId;
  String receiverId;
  String message;
  String date;
}
