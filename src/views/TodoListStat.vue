<template>
    <div id="section">
        <!-- <div id="search">
            <input type="text" placeholder="검색" v-model="searchVal" v-on:keydown.enter="search" />
            <button type="button" v-on:click="search" v-bind:style="searchStyle">조회</button>
        </div> -->
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
            searchStyle: 'margin-left: 10px;'
        }
    },
    methods: {
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