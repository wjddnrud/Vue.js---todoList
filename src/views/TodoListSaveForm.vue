<template>
    <div id="section">
        <div id="title">
            <h1 v-show="state === 'C'">등록</h1>
            <h1 v-show="state === 'U'">수정</h1>
            <h1 v-show="state === 'V'">상세</h1>
        </div>
        <div id="saveForm" style="margin: 5%;">
            <h3 v-show="state === 'C'">등록</h3>
            <h3 v-show="state === 'U'">수정</h3>
            <h3 v-show="state === 'V'">상세</h3>
            <div class="row">
                <input type="text" value="" placeholder="작성자" v-model="writerVal" :readonly="isReadonly">
                <input type="date" value="" placeholder="년/ 월/ 일" v-model="regDateVal" :readonly="isReadonly">
            </div>
            <div class="row">
                <input type="text" value="" placeholder="제목" v-model="titleVal" :readonly="isReadonly">
            </div>
            <div class="row">
                <textarea placeholder="내용" v-model="contentVal" :readonly="isReadonly"></textarea>
            </div>
        </div>
        <button type="button" v-on:click="this.$router.push('/list')">목록</button>
        <button v-show="state === 'C'" type="button" v-on:click="save">등록</button>
        <button v-show="state === 'V'" type="button" v-on:click="modify">수정</button>
    </div>

</template>

<script>

export default {
    created() {
        const index = this.$route.query.index;
        if(index !== undefined && index !== null) {
            this.state = 'V'; // 상세 페이지로 설정
            const todoItem = JSON.parse(localStorage.getItem('todoItem'));
            const item = todoItem[index]; // index에 해당하는 todoItem 가져오기
            if(item) {
                this.writerVal = item.writer;
                this.regDateVal = item.regDate;
                this.titleVal = item.title;
                this.contentVal = item.content;
            }
        }
    },
    name: 'App',
    components: {

    },
    data() {
        return {
                state: 'C',
                writerVal: '',
                titleVal: '',
                regDateVal: new Date().toISOString().slice(0, 10),
                contentVal: ''
        }
    },
    methods: {
        // todoList 등록페이지로 이동
        save() {
            // 기존 로컬 스토리지 데이터 가져오기
            const todoItem = JSON.parse(localStorage.getItem('todoItem')) || [];
            // yyyy-mm-dd 형식의 오늘 날짜 
            const today = new Date().toISOString().slice(0, 10);

            if(!Array.isArray(todoItem)) {
                throw new Error("Invalid todoItem format in localStorage");
            }

            // 새로운 Todo 추가
            todoItem.push({
                writer: this.writerVal,
                regDate: today,
                title: this.titleVal,
                content: this.contentVal
            });

            // 로컬스토리지에 저장
            localStorage.setItem('todoItem', JSON.stringify(todoItem));

            // 입력 필드 초기화
            this.writerVal = '';
            this.titleVal = '';
            this.regDateVal = '';
            this.contentVal = '';

            alert('Todo 등록!');

            // 목록 페이지로 이동
            this.$router.push('/list');
        },
        modify() {
            // 수정 함수
        }
    },
    props: {
        data:  {

        }
    },
    computed: {
        isReadonly() {
            // index가 존재하면 'readonly'로 설정
            return this.$route.query.index !== undefined && this.$route.query.index !== null
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