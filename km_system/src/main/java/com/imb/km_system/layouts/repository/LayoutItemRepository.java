package com.imb.km_system.layouts.repository;

import com.imb.km_system.buttons.entity.Buttons;
import com.imb.km_system.layouts.entity.LayoutItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LayoutItemRepository extends JpaRepository<LayoutItems, String> {

    @Query(value =
            "SELECT * FROM layout_items WHERE layout_id = :layoutId ", nativeQuery = true)
    List<LayoutItems> findAllByLayoutId(@Param("layoutId") Long layoutId);
}
