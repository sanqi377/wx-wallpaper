Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bigImg: {
            type: Array,
            value: []
        },
        imgIndex: {
            type: Number,
            value: null
        },
        imgInfoShow: {
            type: Boolean,
            value: null
        },
        headerShow: {
            type: Boolean,
            value: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        back() {
            let Show = [this.data.imgInfoShow,this.data.headerShow];
            this.triggerEvent('setImgShow',Show)
        }
    }
})