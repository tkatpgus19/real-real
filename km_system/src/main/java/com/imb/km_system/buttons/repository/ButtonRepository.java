package com.imb.km_system.buttons.repository;

import com.imb.km_system.buttons.entity.Buttons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ButtonRepository extends JpaRepository<Buttons, Long> {

    @Query(value =
            "SELECT * FROM buttons WHERE dept_id = :deptId ", nativeQuery = true)
    List<Buttons> findAllByDeptId(@Param("deptId") Long deptId);
}
