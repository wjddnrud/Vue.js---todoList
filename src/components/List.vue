<template>
    <!-- <section class="todo-list">
        <div class="scrollable-container">
            <b-container class="bv-example-row todo-items" v-for="todo in filteredTodoList" :key="todo.idx"
                :class="{ 'hover-active': todo.isHovered }" @mouseenter="todo.isHovered = true"
                @mouseleave="todo.isHovered = false">
                <b-row class="align-items-center" @click="viewTodo(todo.idx)">
                    <b-col col-6>{{ todo.title }}</b-col>
                    <b-col col-2>{{ todo.writer }}</b-col>
                    <b-col col-2>{{ todo.regDate }}</b-col>
                    <b-col col-2 lg="auto">
                        <b-button variant="light" type="button" v-on:click.stop.prevent="deleteTodo(todo.idx)">
                            <font-awesome-icon icon="trash-can" />
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
            <b-container class="bv-example-row" v-if="!todoList.length">조회된 Todo가 없습니다.</b-container>
        </div>
    </section> -->
    <div>
        <table id="todo-grid"></table>
        <div id="todo-pager"></div>
    </div>
</template>
<script>
export default {
    name: 'TodoList',
    data() {
        return {
            todoList: [],
        }
    },
    props: {
        searchQuery: String // 부모로부터 검색어 전달받음
    },
    methods: {
        deleteTodo(index) {
            if (confirm("Todo를 삭제하시겠습니까?")) {
                this.todoList = this.todoList.filter((todo) => todo.idx !== index);
                localStorage.setItem('todoItem', JSON.stringify(this.todoList)); // 로컬스토리지에 변경된 todoList 저장
                alert("Todo가 삭제되었습니다.");
            } else {
                alert("취소되었습니다.");
            }
            this.updateJqGridData();    // jqGrid 데이터 갱신
        },
        viewTodo(index) {
            this.$router.push({
                name: "todoListSaveForm",
                query: { index }
            });
        },
        updateJqGridData() {
            // jqGrid의 데이터를 동적으로 업데이트
            $("#todo-grid").jqGrid("clearGridData");    // 그리드 데이터 초기화
            $("#todo-grid").jqGrid("setGridParam", {
                data: this.filteredTodoList,
            }).trigger("reloadGrid");
        },
        handleDeleteClick(rowId) {
            // 삭제 버튼 클릭 시 호출될 함수
            const todoIndex = this.todoList.findIndex((todo) => todo.idx === rowId);

            if (todoIndex !== -1) {
                this.deleteTodo(rowId);
            }
        }
    },
    mounted() {
        const todoItem = localStorage.getItem('todoItem');  // 로컬스토리지에서 데이터 가져오기

        if (todoItem) {
            this.todoList = JSON.parse(todoItem);   // 데이터가 존재하면 JSON 파싱하여 배열로 저장
        } else {
            this.todoList = []; // 데이터가 없다면 빈 배열로 초기화
        }

        //jqgrid 초기화
        $("#todo-grid").jqGrid({
            datatype: "local", // 데이터 형식
            colModel: [
                { label: "ID", name: "idx", key: true, hidden: true },
                { label: "작성자", name: "writer" },
                { label: "제목", name: "title", width: 200 },
                { label: "작성일자", name: "regDate" },
                {
                    lable: "삭제", name: "", formatter: () => {
                        return `<b-button class="btn btn-danger btn-sm delete-btn">삭제</b-button>`;
                    },
                    align: "center"
                }
            ],
            onSelectRow: (rowId) => {
                // rowId는 idx로 설정
                this.viewTodo(rowId);
            },
            data: this.filteredTodoList,    // 초기 데이터
            viewrecords: true,
            height: 250,
            rowNum: 5,
            autoWidth: true,
            pager: "#todo-pager",
            emptyrecords: "조회된 Todo가 없습니다.",
            gridComplete: () => {
                // 삭제 버튼에 이벤트 리스너 추가
                $(".delete-btn").off("click").on("click", (event) => {
                    const rowId = $(event.target).closest("tr").attr("id"); // 현재 행의 rowId 가져오기
                    this.handleDeleteClick(Number(rowId));
                });
            },
        });
    },
    computed: {
        // eslint-disable-next-line vue/no-dupe-keys
        filteredTodoList() {
            if (!this.searchQuery) return this.todoList; // 검색어 없으면 전체 표시
            return this.todoList.filter((todo) => todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()));   // 검색어에 따라 필터링
        }
    },
    watch: {
        filteredTodoList: {
            handler() {
                this.updateJqGridData();    // 필터링된 데이터에 따라 jqGrid 데이터 업데이트
            },
            deep: true  // todoList의 내부 요소 변경도 감지
        }
    }
}
</script>
<style>
.todo-list {
    padding: 20px;
}

.search-bar {
    margin-bottom: 20px;
}

.todo-items {
    /* border: 1px solid #ddd; */
    border-radius: 8px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #D8D8D8;
}

.hover-active {
    background-color: #CECEF6;
    cursor: pointer;
}

.scrollable-container {
    max-height: 430px;
    /* 최대 높이 (5개 항목 기준) */
    overflow-y: auto;
    /* 스크롤 활성화 */
    border: 1px solid #ddd;
    /* 컨테이너 테두리 */
    border-radius: 13px;
    padding: 10px;
    background-color: #fff;
}
</style>