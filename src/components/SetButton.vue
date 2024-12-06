<template>
    <div class="set-btn-box">
        <button v-if="showSelect" :class="isSmallBtn ? 'width_40' : ''" @click="onClick('select')">조회</button>
        <button v-if="showCancel" :class="isSmallBtn ? 'width_40' : ''" @click="onClick('cancel')">취소</button>
        <button v-if="showDelete" :class="isSmallBtn ? 'width_40' : ''" @click="onClick('delete')">삭제</button>
        <button v-if="showList" :class="isSmallBtn ? 'width_40' : ''" @click="onClick('list')">목록</button>
        <button v-if="showRegi" :class="isSmallBtn ? 'width_40' : ''" @click="onClick('regi')">등록</button>
        <button v-if="showUpdt" :class="isSmallBtn ? 'width_40' : ''" @click="onClick('updt')">수정</button>
    </div>
</template>
<script>
export default {
    props: {
        isSmallBtn : {
            type: Boolean,
            default: false,
            require: false,
        },
        showSelect: {
            type: Boolean,
            default: false,
            require: false
        },
        showDelete: {
            type: Boolean,
            default: false,
            require: false
        },
        showCancel: {
            type: Boolean,
            default: false,
            require: false
        },
        showList: {
            type: Boolean,
            default: false,
            require: false
        },
        showRegi: {
            type: Boolean,
            default: false,
            require: false
        },
        showUpdt: {
            type: Boolean,
            default: false,
            require: false
        }
    },
    data() {

    },
    methods: {
        onClick(div) {
            this.$emit('onSetButtonClick', div);
        },
    },
}
</script>
<style></style>