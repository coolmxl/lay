{
  "status": 200,
  "msg": "",
  "data": [{
    "title": "主页",
    "icon": "layui-icon-home",
    "list": [{
      "title": "控制台",
      "jump": "/"
    }]
  }, {
    "name": "user",
    "title": "用户",
    "icon": "layui-icon-app",
    "list": [{
      "name": "user",
      "title": "小程序用户",
      "jump": "user/user/list"
    },{
      "name": "user",
      "title": "管理员用户",
      "jump": "user/admin/list"
    },{
      "name": "user",
      "title": "用户反馈",
      "jump": "user/feedback/list"
    }]
  }, {
    "title": "店铺",
    "icon": "layui-icon-tree",
    "list": [{
      "title": "店铺管理",
      "name": "shop",
      "jump": "shop/list"
    },{
      "title": "申请管理",
      "name": "shop",
      "jump": "shop/shopApply"
    }]
  }, {
    "title": "活动",
    "icon": "layui-icon-flag",
    "list": [{
        "title": "活动管理",
        "name": "activity",
        "jump": "activity/list"
      },
      {
        "title": "活动类别管理",
        "name": "activityCayegory",
        "jump": "activity/activityCategory"
      }
    ]
  }, {
    "title": "课程",
    "icon": "layui-icon-template",
    "list": [{
      "title": "课程管理",
      "name": "course",
      "jump": "course/list"
    },
      {
        "title": "课程类别管理",
        "name": "shop",
        "jump": "course/courseCategory"
      }
    ]
  }, {
    "title": "论坛",
    "icon": "layui-icon-template-1",
    "list": [{
        "title": "帖子管理",
        "name": "bbs",
        "jump": "bbs/list"
      },
      {
        "title": "帖子类别管理",
        "name": "bbs",
        "jump": "bbs/bbsCategory"
      }
    ]
  }, {
    "title": "轮播",
    "icon": "layui-icon-picture",
    "list": [{
        "title": "轮播管理",
        "name": "slider",
        "jump": "slider/list"
      }
    ]
  }, {
    "title": "订单",
    "icon": "layui-icon-rmb",
    "list": [{
        "title": "订单管理",
        "name": "order",
        "jump": "order/list"
      }
    ]
  }
  ,{
    "title": "其他",
    "icon": "layui-icon-about",
    "list": [
      {
        "title": "城市管理",
        "name": "city",
        "jump": "city/list"
      },{
        "title": "菜单管理",
        "name": "menu",
        "jump": "menu/list"
      }
    ]
  },{
    "title": "设置",
    "icon": "layui-icon-set",
    "list": [ {
      "title": "我的设置",
      "spread": true,
      "list": [ {
        "name": "password",
        "title": "修改密码",
        "jump":"set/mine/updatePwd"
      }]
    },{
      "title": "添加管理员",
      "name": "addUser",
      "jump": "/set/addUser"
    }]
  }]

}