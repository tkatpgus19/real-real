package com.imb.km_system.kiosks.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.departments.repository.DepartmentRepository;
import com.imb.km_system.kiosks.entity.Kiosks;
import com.imb.km_system.kiosks.entity.request.CreateKioskRequest;
import com.imb.km_system.kiosks.repository.KioskRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KioskService {

    private final KioskRepository kioskRepository;
    private final DepartmentRepository departmentRepository;

    public List<Kiosks> selectAll(Long deptId) {
        return kioskRepository.findAllByDeptId(departmentRepository.findById(deptId)
                .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND)));
    }

    @Transactional
    public List<Kiosks> insert(Long deptId, CreateKioskRequest request) {
        Departments department = departmentRepository.findById(deptId)
                .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));

        Kiosks kiosk = kioskRepository.findById(request.getKioskId())
                .orElse(null);

        if(kiosk != null) {
            throw new CustomException(ErrorType.DUPLICATED_KIOSK_ID);
        }

        kioskRepository.save(Kiosks.of(request.getKioskId(), department));
        return selectAll(deptId);
    }

    public List<Kiosks> delete(Long deptId, String kioskId) {
        Kiosks kiosk = kioskRepository.findById(kioskId)
                .orElseThrow(() -> new CustomException(ErrorType.KIOSK_NOT_FOUND));
        kioskRepository.delete(kiosk);
        return selectAll(deptId);
    }
}
