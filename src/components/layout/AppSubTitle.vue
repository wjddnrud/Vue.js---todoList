<template>
    <div class="subTitle">
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
<style>
.subTitle {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>