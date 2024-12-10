<template>
    <section class="todo-list">
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
    </section>
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
        },
        viewTodo(index) {
            this.$router.push({
                name: "todoListSaveForm",
                query: { index }
            });
        },
    },
    mounted() {
        const todoItem = localStorage.getItem('todoItem');  // 로컬스토리지에서 데이터 가져오기

        if (todoItem) {
            this.todoList = JSON.parse(todoItem);   // 데이터가 존재하면 JSON 파싱하여 배열로 저장
        } else {
            this.todoList = []; // 데이터가 없다면 빈 배열로 초기화
        }
    },
    computed: {
        // eslint-disable-next-line vue/no-dupe-keys
        filteredTodoList() {
            if (!this.searchQuery) return this.todoList; // 검색어 없으면 전체 표시
            return this.todoList.filter((todo) => todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()));   // 검색어에 따라 필터링
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