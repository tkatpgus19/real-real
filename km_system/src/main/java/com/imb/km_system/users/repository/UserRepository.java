package com.imb.km_system.users.repository;

import com.imb.km_system.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    @Query(value =
            "SELECT * FROM users WHERE user_id = :id ", nativeQuery = true)
    Users findByUserId(@Param("id") String id);
}
