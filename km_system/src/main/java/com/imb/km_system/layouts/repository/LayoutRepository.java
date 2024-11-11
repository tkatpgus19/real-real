package com.imb.km_system.layouts.repository;

import com.imb.km_system.buttons.entity.ButtonItems;
import com.imb.km_system.layouts.entity.Layouts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LayoutRepository extends JpaRepository<Layouts, Long> {

    @Query(value =
            "SELECT * FROM layouts WHERE dept_id = :deptId ", nativeQuery = true)
    List<Layouts> findAllByDeptId(@Param("deptId") Long deptId);

}
