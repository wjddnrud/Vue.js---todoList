<template>
    <div>
        <div class="search-section">
            <!-- 검색 조건 -->
            <div class="search-wrap">

                <div class="content-container">
                    <div class="title vw-1">
                        <span>구성원명</span>
                    </div>
                    <div class="content vw-1">
                        <div class="input-btn w-100 m-r-5">
                            <input class="w-100" maxlength="40">
                        </div>
                    </div>
                </div>

                <div class="content-container">
                    <div class="title vw-1">
                        <span>구성원유형</span>
                    </div>
                    <div class="content vw-1">
                        <select class="w-100">
                            <option>직원</option>
                            <option>협력업체직원</option>
                            <option>프리랜서</option>
                            <option>기타</option>
                        </select>
                    </div>
                </div>

                <div class="content-container">
                    <div class="title vw-1">
                        <span>상태</span>
                    </div>
                    <div class="content vw-2">
                        <div class="radio-container">
                            <label>
                                <input type="radio" checked>근무
                            </label>
                            <label>
                                <input type="radio">퇴사
                            </label>
                            <label>
                                <input type="radio">기타
                            </label>
                        </div>
                    </div>
                </div>

                <div class="content-container">
                    <div class="content vw-1">
                        <button class="w-100 btn-primary" type="button">조회</button>
                    </div>
                </div>
                <!-- 검색 조건 / 그리드 영역 완료-->
            </div> <!-- section-wrap -->
        </div> <!-- search-section-->

        <!-- 그리드 -->
        <div class="content-section">
            <div class="section-wrap">
                <h2 class="ib">구성원 목록</h2>
                <button id="btn_add_row" class="btn-primary only m-1">
                    <p>행추가</p>
                </button>
                <button id="btn_delete_row" class="btn-primary only m-1">
                    <p>행삭제</p>
                </button>
                <button class="btn-primary only m-1">
                    <p>저장</p>
                </button>
                <div class="wrapper-content">
                    <!-- <Grid ref="gridObj" :dataParams="srchParams" :paging="true" :sortable=true></Grid> -->
                    <table id="jqGrid"></table>
                    <div id="gridpager"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Grid from '../components/grid/Grid.vue'

export default {
    name: 'PmsGridView',
    data() {
        return {
            data: [
                { id: 1, membType: "직원", name: "김범수", position: "사원", grade: "초급", tel: "010-1234-5678", email: "qwer@wiselab.co.kr", dept: "SI사업부", birth: "2024-12-25", joinDate: "2024-12-25", status: "근무" },
                { id: 1, membType: "기타", name: "서은빈", position: "대리", grade: "중급", tel: "010-1234-5678", email: "qwer@wiselab.co.kr", dept: "SI사업부", birth: "2024-12-25", joinDate: "2024-12-25", status: "근무" },
                { id: 1, membType: "협력업체", name: "임동근", position: "과장", grade: "고급", tel: "010-1234-5678", email: "qwer@wiselab.co.kr", dept: "SI사업부", birth: "2024-12-25", joinDate: "2024-12-25", status: "근무" },
                { id: 1, membType: "프리랜서", name: "홍길동", position: "부장", grade: "특급", tel: "010-1234-5678", email: "qwer@wiselab.co.kr", dept: "SI사업부", birth: "2024-12-25", joinDate: "2024-12-25", status: "근무" },
            ]
        }
    },
    mounted() {
        // jqgrid 초기화
        $("#jqGrid").jqGrid({
            // editurl: '/',
            datatype: "local", // 데이터 형식
            colModel: [
                { label: "ID", name: "id", key: false, hidden: true },
                { label: "구성원유형", name: "membType", editable: true, edittype: "select", editoptions: {}, align: "center" },
                { label: "이름", name: "name", editable: true, edittype: "text", align: "center" },
                { label: "직위", name: "position", editable: true, edittype: "select", editoptions: {}, align: "center" },
                { label: "등급", name: "grade", editable: true, edittype: "select", editoptions: {}, align: "center" },
                { label: "전화번호", name: "tel", editable: true, edittype: "text", align: "center" },
                { label: "이메일", name: "email", editable: true, edittype: "text", align: "center" },
                { label: "부서", name: "dept", editable: true, edittype: "select", editoptions: {}, align: "center" },
                { label: "생년월일", name: "birth", editable: true, edittype: "text", align: "center" },
                { label: "입사일", name: "joinDate", editable: true, edittype: "text", align: "center" },
                { label: "상태", name: "status", editable: true, edittype: "select", editoptions: {}, align: "center" },
            ],
            data: this.data,
            viewrecords: true,
            height: 'auto',
            rowNum: 10,
            autowidth: true,
            shrinkToFit: true,
            pager: "#gridpager",
            multiselect: true,
            // sortname: "id",
            sortorder: "desc",
            rownumbers: true,
            cellEdit: true,
            cellsubmit: "clientArray",
        });

        // 그리드 너비 반응형 조정
        $(window).on('resize.jqGrid', function () {
            $("#jqGrid").jqGrid('setGridWidth', $(".wrapper-content").width())
        });

        // 행추가
        $("#btn_add_row").click(function () {
            var data = { id: 1, membType: "직원", name: "김범수", position: "사원", grade: "초급", tel: "010-1234-5678", email: "qwer@wiselab.co.kr", dept: "SI사업부", birth: "2024-12-25", joinDate: "2024-12-25", status: "근무" };
            var rowId = $("#jqGrid").getGridParam("reccount"); // 페이징 처리 시 현 페이지의 Max RowId 값
            console.log("rowId : " + rowId);
            // $("#jqGrid").jqGrid("addRowData", rowId + 1, data, 'first'); // 첫행에 Row 추가
            $("#jqGrid").jqGrid("addRowData", rowId + 1, data, 'last'); // 마지막 행에 Row 추가
        });

        // 행삭제
        $("#btn_delete_row").click(function(){
		var rowId = $("#jqGrid").getGridParam("reccount"); // 페이징 처리 시 현 페이지의 Max RowId 값
        console.log("rowId : " + rowId);
		$("#jqGrid").delRowData(rowId);
	});
    }
}
</script>