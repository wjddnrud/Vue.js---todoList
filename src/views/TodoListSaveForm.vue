<template>
    <section class="todo-form">
        <AppSubTitle :text="subTitleText" />
        <b-container class="bv-example-row">
            <b-row class="justify-content-md-center mb-2">
                <b-col sm="8">
                    <b-form-input placeholder="작성자" v-model="writerVal" ref="writer" :readonly="isReadonly" />
                </b-col>
                <b-col sm="4">
                    <b-form-input placeholder="YYYY-MM-DD" v-model="regDateVal" ref="regDate" :readonly="isReadonly" />
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center mb-2">
                <b-col>
                    <b-form-input placeholder="제목" v-model="titleVal" ref="title" :readonly="isReadonly" />
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center mb-2">
                <b-col>
                    <b-form-textarea placeholder="내용" v-model="contentVal" ref="content" style="height: 400px;"
                        :readonly="isReadonly"></b-form-textarea>
                </b-col>
            </b-row>
        </b-container>
        <b-button variant="secondary" type="button" v-on:click="this.$router.push('/list')"
            style="margin-right: 20px;">목록</b-button>
        <b-button variant="primary" v-if="state === 'C' || state === 'U'" type="button" v-on:click="save">등록</b-button>
        <b-button variant="primary" v-else-if="state === 'V'" type="button" v-on:click="modify">수정</b-button>
    </section>
</template>

<script>
import { ValdUtil } from '@/utils/ValdUtil.js'
import AppSubTitle from '@/components/layout/AppSubTitle.vue';

export default {
    name: 'TodoListSaveForm',
    components: {
        AppSubTitle
    },
    data() {
        return {
            state: 'C',
            idx: 0,
            writerVal: '',
            titleVal: '',
            regDateVal: new Date().toISOString().slice(0, 10),
            contentVal: '',
            isHovered: false,

        }
    },
    methods: {
        valid() {
            if (ValdUtil.isNull(this.writerVal)) {
                alert("작성자를 입력해주세요.");
                this.$refs.writer.focus();
                return false;
            }
            if (!ValdUtil.isValdDt(this.regDateVal)) {
                alert("날짜 형식을 다시 확인해주세요.");
                this.$refs.regDate.focus();
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
                    const todoItem = JSON.parse(localStorage.getItem('todoItem')) || [];    // 기존 로컬 스토리지 데이터 가져오기

                    if (todoItem != undefined && todoItem != '' && todoItem != []) {
                        this.idx = todoItem[todoItem.length - 1].idx;
                    }

                    todoItem.push({
                        idx: this.idx + 1, // 인덱스 자동증가 설정
                        writer: this.writerVal,
                        regDate: this.regDateVal,
                        title: this.titleVal,
                        content: this.contentVal,
                        isHovered: false,
                    });
                    localStorage.setItem('todoItem', JSON.stringify(todoItem)); // 로컬스토리지에 저장
                    alert('Todo가 등록되었습니다!');
                    this.$router.push('/list'); // 목록 페이지로 리다이렉트
                } else if (this.state === 'U') {
                    const index = this.$route.query.index;
                    const todoItem = JSON.parse(localStorage.getItem('todoItem'));
                    const item = todoItem.filter((todo) => todo.idx == index)[0];  // index에 해당하는 todoItem 가져오기

                    if (item !== undefined && item !== null) {
                        item.writer = this.writerVal;
                        item.title = this.titleVal;
                        item.regDate = this.regDateVal;
                        item.content = this.contentVal;

                        localStorage.setItem('todoItem', JSON.stringify(todoItem)); // 로컬스토리지에 저장
                        alert('Todo가 수정되었습니다!');
                        this.$router.push('/list'); // 목록 페이지로 리다이렉트
                    } else {
                        alert("수정할 항목을 찾을 수 없습니다.");
                    }
                }
            }
        },
        modify() {
            // 상태값 수정으로 변경 및 제목에 focus
            this.state = "U";
            this.$refs.title.focus();
        },
    },
    created() {
        const index = this.$route.query.index;
        if (index !== undefined && index !== null) {
            this.state = 'V'; // 상세 페이지로 설정
            const todoItem = JSON.parse(localStorage.getItem('todoItem'));
            const item = todoItem.filter((todo) => todo.idx == index)[0];  // index에 해당하는 todoItem 가져오기

            if (item) {
                this.writerVal = item.writer;
                this.regDateVal = item.regDate;
                this.titleVal = item.title;
                this.contentVal = item.content;
                this.idx = item.idx;
            }
        }
    },
    computed: {
        isReadonly() {
            // index가 존재하면 'readonly'로 설정 => view 페이지로 설정
            return this.state === 'V' && this.$route.query.index !== undefined && this.$route.query.index !== null
        },
        subTitleText() {
            // 부제 설정
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