<template>
    <div id="subTitle">
        <!-- <h2 v-if="state === 'C'">등록</h2>
        <h2 v-else-if="state === 'U'">수정</h2>
        <h2 v-else-if="state === 'V'">상세</h2> -->
        
        <h2>{{ text }}</h2>
    </div>
</template>
<script>
export default {
    name: 'AppSubTitle',
    props: {
        text: {
            type: String, 
            Required: true
        }
    }
}
</script>