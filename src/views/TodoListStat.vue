<template>
    <div id="section">
        <div id="title">
            <h1>Todo List</h1>
        </div>
        <div id="search">
            <input type="text" placeholder="검색" />
            <button type="button" v-on:click="search" v-bind:style="searchStyle">조회</button>
        </div>
        <div id="list" style="margin: 5%;">
            <div v-for="(todo, index) in todoList" :key="todo.id" class="row">
                <router-link :to="{ name: 'todoListSaveForm', query: {index: index}}">
                    <div class="col">{{ todo.title }}</div>
                </router-link>
                <div class="col">{{ todo.writer }}</div>
                <div class="col">{{ todo.regDate }}</div>
                <button type="button" value="index" v-on:click="deleteTodo(index)">삭제</button>
            </div>
        </div>
        <button type="button" v-on:click="saveform">등록</button>
    </div>

</template>

<script>

export default {
    name: 'App',
    components: {
        
    },
    data() {
        return {
            searchStyle: 'margin-left: 10px;',
            todoList: []
        }
    },
    methods: {
        saveform: function () {
            // 등록 페이지로 이동
            this.$router.push('/saveForm');
        },
        deleteTodo(index) {
            if(confirm("삭제하시겠습니까?")) {
                console.log("삭제하려는 ID : " + index);
                
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
        }
    },
    mounted() {
        // 로컬스토리지에서 데이터 가져오기
        const todoItem = localStorage.getItem('todoItem');

        // 데이터가 존재하면 JSON 파싱하여 배열로 저장
        if(todoItem) {
            try {
                this.todoList = JSON.parse(todoItem);
                console.log("this.todoList : " + this.todoList);
            } catch(e) {
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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

div #list {
    border: 1px, solid, black;
}

.row {
    border: 1px, solid, black;

}
</style>