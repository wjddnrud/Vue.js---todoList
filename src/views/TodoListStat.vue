<template>
    <section class="todo-stat">
        <TodoList />
        <div class="button-container">
            <b-button variant="primary" type="button" v-on:click="saveform">등록</b-button>
        </div>
    </section>

</template>

<script>
import TodoList from '@/components/List.vue'

export default {
    name: 'TodoListStat',
    components: {
        TodoList
    },
    data() {
        return {

        }
    },
    methods: {
        saveform: function () {
            // 등록 페이지로 이동
            this.$router.push('/saveForm');
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
    margin-top: 20px;
}
</style>