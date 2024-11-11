package com.imb.km_system.buttons.repository;

import com.imb.km_system.buttons.entity.ButtonItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ButtonItemRepository extends JpaRepository<ButtonItems, Long> {

    @Query(value =
            "SELECT * FROM button_items WHERE btn_id = :btnId ", nativeQuery = true)
    List<ButtonItems> findAllByBtnId(@Param("btnId") Long btnId);
}
