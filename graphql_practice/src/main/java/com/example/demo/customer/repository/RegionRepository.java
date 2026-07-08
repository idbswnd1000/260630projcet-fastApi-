package com.example.demo.customer.repository;

import com.example.demo.customer.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region, Integer> {

}