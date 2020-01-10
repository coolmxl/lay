/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;/**

 @Name：Antony 商家店铺管理
 @Author：Antony
 @Site：
 @License: LPPL
    
 */
layui.define(['form', 'table'], function (exports) {
    var $ = layui.$,
      admin = layui.admin,
      view = layui.view,
      table = layui.table,
      form = layui.form;
  
    console.log(layui.data('layuiAdmin').token)
    //店铺管理
    table.render({
      elem: '#LAY-shopApply-manage',
      url: 'http://asryc.antony0127.cn/asryc/user-service//admin/shopApply/page', 
      method: "POST",
      contentType: 'application/json',
      headers: {
        "api-version": layui.data('layuiAdmin').apiVersion,
        "Authorization": layui.data('layuiAdmin').token
      },
      request: { //request设置，默认值如下
        pageName: 'pageNo',
        limitName: 'pageSize'
      },
      page: true,
      limit: 10,
      height: 'full-320',
      parseData: function (res) {
        console.log(res)
        return {
          "code": 0,
          "msg": "",
          "count": res.detail.totalCount,
          data: res.data
        }
      },
      cols: [
          [ {
            field: 'id',
            title: 'ID',
            sort: true
          },{
            field: 'applyUser',
            title: '申请用户',
          }, {
            field: 'companyName',
            title: '店铺名称'
          }, {
            field: 'capital',
            title: '容量',
          }, {
            field: 'userName',
            title: '店主'
          }, {
            field: 'phoneNum',
            title: '联系方式',
          }, {
            field: 'idCard',
            title: '身份证',
          }, {
            field: 'companyInfo',
            title: '店铺信息',
          }, {
            field: 'characterInfo',
            title: '特色课程',
          }
          ,{
            title: '操作',
            width: 180,
            align: 'center',
            fixed: 'right',
            toolbar: '#table-shop-shop',
            templet:"#myEdit"
          }]
        ],
        text: {
          none: '暂无相关数据',
          error: '接口请求异常'
        }

    });
    function sendStatus(data){
      $.ajax({
        url: 'http://asryc.antony0127.cn/asryc/user-service/admin/shopApply/verify',
        type: "post",
        contentType: "application/json",
        headers: {
          "api-version": layui.data('layuiAdmin').apiVersion,
          "Authorization": layui.data('layuiAdmin').token
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function (res) {
          console.log(res)
          if (res.status == 200) {
            layer.msg("添加成功", {
              offset: '15px',
              icon: 1,
              time: 1000
            }, function () {
              // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
              layui.table.reload('LAY-shopApply-manage'); //重载表格
            });
          } else {
            layer.msg(res.desc, {
              offset: '15px',
              icon: 0,
              time: 1000
            }, function () {
              // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
            });
          }
        }
      })
    }
    table.on('tool(LAY-shopApply-manage)', function (obj) {
      var formData = obj.data;
      if (obj.event === 'agree') {
        const data = {
          id:formData.id,
          status:"APPLY_COMPLETE"
        }
        sendStatus(data)
      } else if (obj.event === 'refuse') {
        const data = {
          id:formData.id,
          status:"APPLY_REJECT"
        }
        sendStatus(data)
      }
    });
    exports('shopApply', {})
  });