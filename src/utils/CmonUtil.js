import { ValdUtil } from "@/utils/ValdUtil"

export const CmonUtil = {
    /**
     * 좌우 공백제거
     * str : 문자열
     */
    trim: function(str) {
        if (typeof str === "string") {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        }

        return str;
    },
    /**
     * null 값 바꾸기
     * str : 문자열
     * val : null 대체값
     */
    nvl: function(str, val) {
        if (ValdUtil.isNull(str)) {
            return val;
        }

        return this.trim(str);
    },
    alert: function(params) {
        window.vueInstance.alert(params);
    },
    /**
     * 엔터 BR 변환
     * str : 문자열
     */
    enterToBr: function(str) {
        if (typeof str === "string") {
            return str.replace(/(?:\r\n|\r|\n)/g, "<br />");
        }

        return str;
    },
    /**
     * 문자를 integer로 변환
     * str : 숫자, 문자열
     */
    toInt: function(str) {
        var type = typeof str;

        if (type === "string" || type === "number") {
            var temp = this.trim(str) + "";

            if (temp != "" && !isNaN(temp)) {
                return parseInt(temp, 10);
            }
        }

        return 0;
    },
    /**
     * 특수문자 제거 함수.
     * @param str
     * @returns {string}
     */
    filterSpecialChar: function(str) {
        // eslint-disable-next-line
        const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    
        if (str.length > 0) {
            return str.replace(regex, ''); // 특수문자만 제거
        }
        return str;
    },
}