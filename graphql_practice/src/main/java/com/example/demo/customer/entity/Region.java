package com.example.demo.customer.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "regions")
@Getter
@Setter
@NoArgsConstructor
public class Region {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "province")
    private String province;

    @Column(name = "city_district")
    private String cityDistrict;

    @Column(name = "region_name")
    private String regionName;
}