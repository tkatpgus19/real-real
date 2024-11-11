package com.imb.km_system.buttons.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.buttons.dto.request.UpdateButtonTitleRequest;
import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.departments.repository.DepartmentRepository;
import com.imb.km_system.buttons.entity.ButtonItems;
import com.imb.km_system.buttons.entity.Buttons;
import com.imb.km_system.buttons.repository.ButtonItemRepository;
import com.imb.km_system.buttons.repository.ButtonRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ButtonService {

    private final ButtonRepository buttonRepository;
    private final DepartmentRepository departmentRepository;
    private final ButtonItemRepository buttonItemRepository;

    @Transactional
    public void initKiosk() {

//        Buttons[] newButtons = new Buttons[10];
//
//        for(int i=0; i<10; i++) {
//            buttonRepository.save(newButtons[i]);
//            for(int j=0; j<4; j++) {
//                buttonItemRepository.save(ButtonItems.from(newButtons[i]));
//            }
//        }
    }

    public List<Buttons> selectAll(Long deptId) {
        return buttonRepository.findAllByDeptId(deptId);
    }

    public Buttons select(Long deptId) {
        Long id = departmentRepository.findById(deptId).orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND)).getMainBtnId();
        if(id == null) {
            return null;
        }
        return buttonRepository.findById(id).orElse(null);
    }

    @Transactional
    public List<Buttons> insert(Long deptId, String title) {
        Departments department = departmentRepository.findById(deptId)
                        .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));

        Buttons buttons = Buttons.of(department, null, title == null ? null : "기본 버튼 배치도");
        buttonRepository.save(buttons);
        for(int j=0; j<4; j++) {
            buttonItemRepository.save(ButtonItems.from(buttons));
        }

        return selectAll(deptId);
    }

    public List<Buttons> delete(Long deptId, Long kioskId) {
        Buttons buttons = buttonRepository.findById(kioskId)
                .orElseThrow(() -> new CustomException(ErrorType.KIOSK_NOT_FOUND));
        buttonRepository.delete(buttons);

        return selectAll(deptId);
    }

    public String update(Long deptId, Long btnId) {
        Departments department = departmentRepository.findById(deptId).orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));
        department.updateMainBtnId(btnId);
        departmentRepository.save(department);
        return "";
    }

    public String updateTitle(Long btnId, UpdateButtonTitleRequest request) {
        Buttons button = buttonRepository.findById(btnId)
                .orElseThrow(() -> new CustomException(ErrorType.BUTTON_NOT_FOUND));
        button.updateTitle(request.getBtnTitle());
        buttonRepository.save(button);

        return "";
    }
}
