package com.imb.km_system.layouts.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.departments.repository.DepartmentRepository;
import com.imb.km_system.layouts.dto.request.CreateLayoutRequest;
import com.imb.km_system.layouts.entity.Layouts;
import com.imb.km_system.layouts.repository.LayoutItemRepository;
import com.imb.km_system.layouts.repository.LayoutRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LayoutService {

    private final LayoutItemRepository layoutItemRepository;
    private final LayoutRepository layoutRepository;
    private final DepartmentRepository departmentRepository;

    public List<Layouts> selectAll(Long deptId){
        return layoutRepository.findAllByDeptId(deptId);
    }

    @Transactional
    public List<Layouts> insert(Long deptId, CreateLayoutRequest request) {

        Departments department = departmentRepository.findById(deptId)
                        .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));

        layoutRepository.save(Layouts.of(request.getLayoutName(), department, null));

        return selectAll(deptId);
    }

    public List<Layouts> delete(Long layoutId) {
        Layouts layout = layoutRepository.findById(layoutId)
                .orElseThrow(() -> new CustomException(ErrorType.LAYOUT_NOT_FOUND));

        long deptId = layout.getDeptId().getId();
        layoutRepository.delete(layout);

        return selectAll(deptId);
    }
}
