Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [{
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/public/ico/bar-index.png",
                selectedIconPath: "/public/ico/bar-index-o.png"
            },
            {
                pagePath: "/pages/classify/index",
                text: "分类",
                iconPath: "/public/ico/bar-classify.png",
                selectedIconPath: "/public/ico/bar-classify-o.png"
            },
            {
                pagePath: "/pages/sleep/index",
                text: "哄睡",
                iconPath: "/public/ico/bar-sleep.png",
                selectedIconPath: "/public/ico/bar-sleep-o.png"
            },
            {
                pagePath: "/pages/my/index",
                text: "我的",
                iconPath: "/public/ico/bar-user.png",
                selectedIconPath: "/public/ico/bar-user-o.png"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})