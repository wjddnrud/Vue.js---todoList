<template>
    <div class="search-bar">
        <b-container class="bv-example-row">
            <b-row class="justify-content-md-center">
                <b-col class="mb-3" sm="10">
                    <b-form-input type="text" v-model="query" @keydown.enter="emitQuery"
                        placeholder="검색어 입력"></b-form-input>
                </b-col>
                <b-col sm="2">
                    <b-button variant="primary" @click="emitQuery">조회</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            query: this.searchQuery || ''    // 초기값 설정
        }
    },
    props: {
        searchQuery: String
    },
    methods: {
        emitQuery() {
            this.$emit("updateQuery", this.query);  // 부모 컴포넌트로 검색어 전달
        }
    }
}
</script>
<style>
.search-bar {
    padding: 20px;
}
</style>