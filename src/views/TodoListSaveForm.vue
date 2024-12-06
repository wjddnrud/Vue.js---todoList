<template>
    <div id="section">
        <div id="saveForm" style="margin: 5%;">
            <AppSubTitle :text="subTitleText"></AppSubTitle>
            <!-- <h2 v-if="state === 'C'">등록</h2>
            <h2 v-else-if="state === 'U'">수정</h2>
            <h2 v-else-if="state === 'V'">상세</h2> -->
            <div class="row">
                <input type="text" value="" placeholder="작성자" v-model="writerVal" ref="writer" :readonly="isReadonly">
                <input type="text" value="" placeholder="'-'없이 YYYYMMDD 형식의 등록일자" v-model="regDateVal"
                    :readonly="isReadonly">
            </div>
            <div class="row">
                <input type="text" value="" placeholder="제목" v-model="titleVal" ref="title" :readonly="isReadonly">
            </div>
            <div class="row">
                <textarea placeholder="내용" v-model="contentVal" ref="content" :readonly="isReadonly"></textarea>
            </div>
        </div>
        <!-- <button type="button" v-on:click="this.$router.push('/list')">목록</button>
        <button v-if="state === 'C' || state === 'U'" type="button" v-on:click="save">등록</button>
        <button v-else-if="state === 'V'" type="button" v-on:click="modify">수정</button> -->
        <SetButton class="set-btn-box" :showSelect="false" :show-cancel="false" :showDelete="false" :showList="true"
            :showRegi="state === 'C' || state === 'U'" :showUpdt="state === 'V'"
            @on-set-button-click="onSetButtonClick">
        </SetButton>
    </div>

</template>

<script>
import { ValdUtil } from '@/utils/ValdUtil.js'
import SetButton from '@/components/SetButton.vue'
import AppSubTitle from '@/components/layout/AppSubTitle.vue';

export default {
    name: 'App',
    components: {
        SetButton,
        AppSubTitle
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
        valid() {
            if (ValdUtil.isNull(this.writerVal)) {
                alert("작성자를 입력해주세요.");
                this.$refs.writer.focus();
                return false;
            }
            if (ValdUtil.isNull(this.titleVal)) {
                alert("제목을 입력해주세요.");
                this.$refs.title.focus();
                return false;
            }
            if (ValdUtil.isNull(this.contentVal)) {
                alert("내용을 입력해주세요.");
                this.$refs.content.focus();
                return false;
            }
            return true;
        },
        save() {
            if (this.valid()) {
                if (this.state === 'C') {
                    // 기존 로컬 스토리지 데이터 가져오기
                    const todoItem = JSON.parse(localStorage.getItem('todoItem')) || [];
                    // yyyy-mm-dd 형식의 오늘 날짜 
                    const today = new Date().toISOString().slice(0, 10);

                    if (!Array.isArray(todoItem)) {
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

                    alert('Todo 등록!');

                    // 목록 페이지로 이동
                    this.$router.push('/list');
                } else if (this.state === 'U') {
                    const index = this.$route.query.index;

                    const todoItem = JSON.parse(localStorage.getItem('todoItem'));

                    const item = todoItem[index]; // index에 해당하는 todoItem 가져오기

                    if (index !== undefined && index !== null) {
                        item.writer = this.writerVal;
                        item.title = this.titleVal;
                        item.regDate = this.regDateVal;
                        item.content = this.contentVal;

                        todoItem.splice(index, 1, item);

                        // 로컬스토리지에 저장
                        localStorage.setItem('todoItem', JSON.stringify(todoItem));

                        alert('Todo 수정!');

                        // 목록 페이지로 이동
                        this.$router.push('/list');
                    } else {
                        alert("수정할 항목을 찾을 수 없습니다.");
                    }
                }
            }
        },
        modify() {

        },
        onSetButtonClick(div) {
            console.log("div : " + div);
            switch (div) {
                case 'updt':
                    // 상태값 수정으로 변경
                    this.state = "U";
                    break;
                case 'regi':
                    this.save();
                    break;
                case 'list':
                    this.$router.push('/list');
                    break;
                default:
                    break;
            }
        }
    },
    created() {
        const index = this.$route.query.index;
        if (index !== undefined && index !== null) {
            this.state = 'V'; // 상세 페이지로 설정
            const todoItem = JSON.parse(localStorage.getItem('todoItem'));
            const item = todoItem[index]; // index에 해당하는 todoItem 가져오기
            if (item) {
                this.writerVal = item.writer;
                this.regDateVal = item.regDate;
                this.titleVal = item.title;
                this.contentVal = item.content;
            }
        }
    },
    computed: {
        isReadonly() {
            // index가 존재하면 'readonly'로 설정
            return this.state === 'V' && this.$route.query.index !== undefined && this.$route.query.index !== null
        },
        subTitleText() {
            switch (this.state) {
                case 'C':
                    return '등록';
                case 'U':
                    return '수정';
                case 'V':
                    return '상세';
                default:
                    return '';

            }
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