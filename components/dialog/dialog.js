Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        // 弹窗标题
        isShow: {
            type: Boolean,
            value: false
        },
        titles: {
            type: String,
            value: '提示'
        },
        // 弹窗确认按钮文字
        sureText: {
            type: String,
            value: '授权登录',
        },
        // 弹窗取消按钮文字
        canlText: {
            type: String,
            value: '暂时不用'
        }
    },
    data: {
    },
    methods: { // 这里是一个自定义方法
        //展示弹框 || 隐藏弹框
        showDialog() {
            this.setData({
                isShow: !this.data.isShow
            })
        },
        _cancelEvent() {
            //触发取消回调
            this.showDialog();
            this.triggerEvent("cancelEvent")
        },
        _confirmEvent() {  //触发成功回调
            this.showDialog();
            this.triggerEvent("confirmEvent");
        }
    }
})