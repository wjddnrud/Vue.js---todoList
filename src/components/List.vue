<template>
    <div id="search">
        <input type="text" placeholder="검색" v-model="searchVal" v-on:keydown.enter="search" />
        <button type="button" v-on:click="search" v-bind:style="searchStyle">조회</button>
    </div>
    <div id="list" style="margin: 5%;">
        <div v-for="(todo, index) in (searchedTodoList.length > 0 ? searchedTodoList : todoList)" :key="todo.id"
            class="row">
            <router-link :to="{ name: 'todoListSaveForm', query: { index: index } }">
                <div class="col">{{ todo.title }}</div>
                <div class="col">{{ todo.writer }}</div>
                <div class="col">{{ todo.regDate }}</div>
            </router-link>
            <button type="button" value="index" v-on:click="deleteTodo(index)">삭제</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TodoList',
    data() {
        return {
            todoList: [],
            searchedTodoList: [],
            searchVal: ''
        }
    },
    methods: {
        deleteTodo(index) {
            if (confirm("삭제하시겠습니까?")) {

                // 해당 인텍스를 기준으로 삭제
                this.todoList.splice(index, 1);

                // 로컬스토리지에 변경된 todoList 저장
                localStorage.setItem('todoItem', JSON.stringify(this.todoList));
                alert("삭제했습니다.");
            } else {
                alert("취소했습니다.");
            }
        },
        detailForm() {
            // 등록 페이지로 이동
            this.$router.push('/saveForm');
        },
        search() {
            // 조회 버튼 클릭시 검색창에 입력된 문자를 가지고 제목에서 포함된 내용 찾아서 searchedList 구성하기
            const inputVal = this.searchVal.trim();
            console.log("inputVal : " + inputVal);

            if (inputVal === '') {
                alert("검색어를 입력하세요.");
                this.searchedTodoList = [];
                return;
            }

            // 검색어가 제목에 포함된 리스트만 재구성
            this.searchedTodoList = this.todoList.filter(todo => todo.title.includes(inputVal));

            console.log("this.searchedTodoList.length : " + this.searchedTodoList.length);
            if (this.searchedTodoList.length === 0) {
                alert("검색 결과가 없습니다.");
            }
        },
    },
    mounted() {
        // 로컬스토리지에서 데이터 가져오기
        const todoItem = localStorage.getItem('todoItem');

        // 데이터가 존재하면 JSON 파싱하여 배열로 저장
        if (todoItem) {
            try {
                this.todoList = JSON.parse(todoItem);
            } catch (e) {
                console.error("JSON 파싱 오류 : ", e);
                this.todoList = [];
            }
        } else {
            // 데이터가 없다면 빈 배열로 초기화
            this.todoList = [];
        }
    }
}
</script>
