package com.imb.km_system.kiosks.repository;

import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.kiosks.entity.Kiosks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KioskRepository extends JpaRepository<Kiosks, String> {

    List<Kiosks> findAllByDeptId(Departments departments);
}
