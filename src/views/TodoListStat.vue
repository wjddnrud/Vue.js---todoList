<template>
    <HeaderComponent />
    <section class="todo-stat">
        <SearchBar :searchQuery="searchQuery" @updateQuery="updateSearchQuery" />
        <TodoList :searchQuery="searchQuery" />
        <div class="button-container">
            <b-button variant="primary" type="button" v-on:click="saveform">등록</b-button>
        </div>
    </section>

</template>

<script>
import HeaderComponent from '@/components/layout/AppHeader.vue'
import TodoList from '@/components/List.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
    name: 'TodoListStat',
    components: {
        HeaderComponent,
        TodoList,
        SearchBar,
    },
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        saveform: function () {
            this.$router.push('/saveForm'); // 등록 페이지로 이동
        },
        updateSearchQuery(newQuery) {
            this.searchQuery = newQuery; // SearchBar에서 입력한 검색어 업데이트
        }
    }
}
</script>
<style>
.todo-stat {
    padding: 20px;
}

.button-container {
    text-align: right;
    margin-top: 30px;
}
</style>