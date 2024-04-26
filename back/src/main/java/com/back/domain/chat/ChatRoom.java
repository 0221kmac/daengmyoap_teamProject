// ChatRoom.java
package com.back.domain.chat;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail1;

    @Column(nullable = false)
    private String userEmail2;

    @OneToMany(mappedBy = "chatRoom")
    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();


    private String lastMessage;

}