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
        getImg(e) {
            // let data = this.data.bigImg;
            // let index = this.data.imgIndex;
            // let current = e.detail.current;
            // let imgSrc = null;
            // this.setData({
            //     imgIndex: index + 1
            // })
        }
    }
})