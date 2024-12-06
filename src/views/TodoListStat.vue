<template>
    <div id="section">
        <div id="search">
            <input type="text" placeholder="검색" v-model="searchVal" v-on:keydown.enter="search" />
            <button type="button" v-on:click="search" v-bind:style="searchStyle">조회</button>
        </div>
        <TodoList></TodoList>
        <!-- <div id="list" style="margin: 5%;">
            <div v-for="(todo, index) in (searchedTodoList.length > 0 ? searchedTodoList : todoList)" :key="todo.id"
                class="row">
                <router-link :to="{ name: 'todoListSaveForm', query: { index: index } }">
                    <div class="col">{{ todo.title }}</div>
                    <div class="col">{{ todo.writer }}</div>
                    <div class="col">{{ todo.regDate }}</div>
                </router-link>
                <button type="button" value="index" v-on:click="deleteTodo(index)">삭제</button>
            </div>
        </div> -->
        <!-- <button type="button" v-on:click="saveform">등록</button> -->
        <SetButton class="set-btn-box" :showSelect="false" :show-cancel="false" :showDelete="false" :showList="false" 
            :showRegi="true" :showUpdt="false" @on-set-button-click="onSetButtonClick">
        </SetButton>
    </div>

</template>

<script>
import TodoList from '@/components/List.vue'
import SetButton from '@/components/SetButton.vue'

export default {
    name: 'TodoListStat',
    components: {
        TodoList,
        SetButton
    },
    data() {
        return {
            searchStyle: 'margin-left: 10px;',
            searchVal: ''
        }
    },
    methods: {
        search() {
            // 조회 버튼 클릭시 검색창에 입력된 문자를 가지고 제목에서 포함된 내용 찾아서 searchedList 구성하기
            const inputVal = this.searchVal.trim();

            if (inputVal === '') {
                alert("검색어를 입력하세요.");
                this.searchedTodoList = [];
                return;
            }

            // 검색어가 제목에 포함된 리스트만 재구성
            this.searchedTodoList = this.todoList.filter(todo => todo.title.includes(inputVal));

            if (this.searchedTodoList.length === 0) {
                alert("검색 결과가 없습니다.");
            }
        },
        saveform: function () {
            // 등록 페이지로 이동
            this.$router.push('/saveForm');
        },
        onSetButtonClick(div) {
            switch (div) {
                case 'regi':
                    this.saveform();
                    break;
                default:
                    break;
            }
        }
    }
}
</script>