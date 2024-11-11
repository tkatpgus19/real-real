package com.imb.km_system.departments.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.departments.repository.DepartmentRepository;
import com.imb.km_system.users.entity.Users;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Transactional
    public void initDepartments() {

        Departments[] newDepartments = new Departments[4];
        newDepartments[0] = Departments.of("본부", null, null, null, null, null, null, null);
        newDepartments[1] = Departments.of("대구본점", 9, 18, null,  null, null, null, null);
        newDepartments[2] = Departments.of("대구동성로점", 9, 18, null,  null, null, null, null);
        newDepartments[3] = Departments.of("대구월성역점", 9, 18, null,  null, null, null, null);

        for(int i=0; i<4; i++) {
            departmentRepository.save(newDepartments[i]);
        }
    }

    public Departments select(Long deptId) {
        return departmentRepository.findById(deptId)
                .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));
    }

    public List<Departments> selectAll() {
        return departmentRepository.findAll();
    }
}
