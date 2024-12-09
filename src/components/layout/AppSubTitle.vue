<template>
    <div id="subTitle">
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