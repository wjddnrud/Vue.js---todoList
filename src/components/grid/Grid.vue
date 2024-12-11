<template>
    <div :id="wrapperId">
        <table ref="gridObj" :id="gridId"></table>
        <div v-if="paging" :id="pagerId"></div>
    </div>
</template>
<script>
// import { GridUtil } from '@/utils/GridUtil';

export default {
    name: 'GridComponent',
    data() {
        return {

        }
    },
    props: {

    },
    methods: {

    },
    mounted() {

    }
}
</script>