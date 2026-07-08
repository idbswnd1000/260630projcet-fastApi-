package com.example.demo.channel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "channels")
@Getter
@Setter
@NoArgsConstructor
public class Channel {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "channel_name")
    private String channelName;
}