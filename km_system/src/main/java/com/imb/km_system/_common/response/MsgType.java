package com.imb.km_system._common.response;

import lombok.Getter;

@Getter
public enum MsgType {

    TEST_MSG("테스트 메시지"),

    //********************************[ Users ]********************************
    SIGNUP_SUCCESSFULLY("회원가입에 성공하였습니다."),
    SIGN_IN_SUCCESSFULLY("로그인에 성공하였습니다."),
    LOG_OUT_SUCCESSFULLY("로그아웃에 성공하였습니다."),
    VALIDATE_ID_SUCCESSFULLY("아이디 중복검사에 성공하였습니다."),
    SELECT_MEMBER_SUCCESSFULLY("멤버정보 조회에 성공하였습니다."),
    SELECT_MEMBER_LIST_SUCCESSFULLY("멤버목록 조회에 성공하였습니다."),
    CHECK_VALIDITY_SUCCESSFULLY("로그인 유효성 검사에 성공하였습니다."),

    //********************************[ ButtonItems ]********************************
    SELECT_BUTTON_ITEM_LIST_SUCCESSFULLY("키오스크 버튼 리스트 조회에 성공하였습니다."),
    UPDATE_BUTTON_ITEM_LIST_SUCCESSFULLY("키오스크 버튼 리스트 변경에 성공하였습니다."),

    //********************************[ Buttons ]********************************
    SELECT_BUTTON_LIST_SUCCESSFULLY("버튼 리스트 조회에 성공하였습니다."),
    SELECT_MAIN_BUTTON_SUCCESSFULLY("메인 버튼 조회에 성공하였습니다."),
    INSERT_BUTTON_SUCCESSFULLY("버튼 등록에 성공하였습니다."),
    UPDATE_BUTTON_TITLE_SUCCESSFULLY("버튼 이름 변경에 성공하였습니다."),
    UPDATE_MAIN_BUTTON_SUCCESSFULLY("메인 버튼 등록에 성공하였습니다."),
    DELETE_BUTTON_SUCCESSFULLY("버튼 삭제에 성공하였습니다."),

    //********************************[ Tickets ]********************************
    SELECT_TICKET_LIST_SUCCESSFULLY("번호표 리스트 조회에 성공하였습니다."),
    SELECT_TICKET_ITEM_LIST_SUCCESSFULLY("번호표 요소 리스트 조회에 성공하였습니다."),
    INSERT_TICKET_SUCCESSFULLY("번호표 등록에 성공하였습니다."),
    DELETE_TICKET_SUCCESSFULLY("번호표 삭제에 성공하였습니다."),
    UPDATE_TICKET_LIST_SUCCESSFULLY("번호표 리스트 변경에 성공하였습니다."),
    SELECT_MAIN_TICKET_SUCCESSFULLY("메인 번호표 조회에 성공하였습니다."),
    UPDATE_MAIN_TICKET_SUCCESSFULLY("메인 번호표 등록에 성공하였습니다."),
    UPDATE_TICKET_TITLE_SUCCESSFULLY("번호표 이름 변경에 성공하였습니다."),

    //********************************[ Layouts ]********************************
    SELECT_LAYOUT_LIST_SUCCESSFULLY("배치도 리스트 조회에 성공하였습니다."),
    INSERT_LAYOUT_SUCCESSFULLY("배치도 추가에 성공하였습니다."),
    DELETE_LAYOUT_SUCCESSFULLY("배치도 삭제에 성공하였습니다."),

    //********************************[ LayoutItems ]********************************
    UPDATE_LAYOUT_ITEMS_SUCCESSFULLY("배치도 아이템 변경이 성공하였습니다."),
    SELECT_LAYOUT_ITEM_LIST_SUCCESSFULLY("배치도 아이템 리스트 조회에 성공하였습니다."),

    //********************************[ Kiosks ]********************************
    SELECT_KIOSK_LIST_SUCCESSFULLY("키오스크 리스트 조회에 성공하였습니다."),
    INSERT_KIOSK_SUCCESSFULLY("키오스크 등록에 성공하였습니다."),
    DELETE_KIOSK_SUCCESSFULLY("키오스크 삭제에 성공하였습니다."),

    //********************************[ Departments ]********************************
    SELECT_DEPARTMENT_SUCCESSFULLY("지점 정보 조회에 성공하였습니다."),


    //********************************[ Analysis ]********************************
    SELECT_DATA_SUCCESSFULLY("데이터 조회에 성공하였습니다."),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}