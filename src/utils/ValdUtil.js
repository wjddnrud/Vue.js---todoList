import {CmonUtil} from '@/utils/CmonUtil'
import moment from 'vue-moment'


export const ValdUtil = {
    // input 값 체크
    checkInputValue : function(fieldValue) {
        // eslint-disable-next-line
        var pattern = /(^[a-zA-Z0-9 -/:-@\[-\`\{-\~]+$)/;
        if(fieldValue != "" && !pattern.test(fieldValue)){
            this.alert("Please enter alphabet, number and symbol only", "warning");
            return false;
        }
    },
    // Null 체크
    isNull: function(str) {
        var type = typeof str;

        if (str === undefined || str === "undefined" || str === null) {
            return true;
        }

        if (type === undefined || type === "undefined" || type === null) {
            return true;
        }

        if (type === "string" && CmonUtil.trim(str) == "") {
            return true;
        }

        return false;
    },
    // NotNull 체크
    isNotNull: function(str) {
        return !this.isNull(str);
    },
    // 날짜 값 체크
    isValdDt(dt) {
        let isVald = false;
        
        if (ValdUtil.isNull(dt)) {
            return isVald;
        }

        return moment(dt, "YYYY-MM-DD").isValid();
    },
}


