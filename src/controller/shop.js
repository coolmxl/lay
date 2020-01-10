/**

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
    elem: '#LAY-shop-manage',
    url: 'http://asryc.antony0127.cn/asryc/shop-service/admin/shop/page' //模拟接口
      ,
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
          width: 100,
          title: 'ID',
          sort: true
        }, {
          field: 'headImg',
          title: '缩略图',
          width: 100,
          templet: '#imgTpl'
        }, {
          field: 'name',
          title: '店名'
        }, {
          field: 'info',
          title: '简介'
        }, {
          field: 'phoneNumber',
          title: '联系方式',
          width: 120
        }, {
          field: 'loginName',
          width: 80,
          title: '登录名'
        }, {
          field: 'nickName',
          title: '店长',
          width: 100,
        }, {
          field: 'createDate',
          title: '创建时间',
          sort: true
        }, {
          title: '操作',
          width: 250,
          align: 'center',
          fixed: 'right',
          toolbar: '#table-shop-shop'
        }]
      ],
      text: {
        none: '暂无相关数据',
        error: '接口请求异常'
      }
  });
  function submitPhoneNumber(data){
    $.ajax({
        url: 'http://asryc.antony0127.cn/asryc/shop-service/admin/shop/connect',
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
            layer.msg("关联成功", {
            offset: '15px',
            icon: 1,
            time: 1000
            }, function () {
            // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
            layui.table.reload('LAY-course-category-manage'); //重载表格
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
  function deleteShop(id){
    $.ajax({
        url: 'http://asryc.antony0127.cn/asryc/shop-service/admin/shop/delete/'+id,
        type: "delete",
        contentType: "application/json",
        headers: {
        "api-version": layui.data('layuiAdmin').apiVersion,
        "Authorization": layui.data('layuiAdmin').token
        },
        dataType: "json",
        success: function (res) {
        console.log(res)
        if (res.status == 200) {
            layer.msg("删除成功", {
            offset: '15px',
            icon: 1,
            time: 1000
            }, function () {
            // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
            layui.table.reload('LAY-shop-manage'); //重载表格
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
  //监听工具条
  table.on('tool(LAY-shop-manage)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.prompt({
        formType: 0,
        title: '敏感操作，请输入“删除”'
      }, function (value, index) {
        console.log(index);
        
        layer.close(index);
        console.log(value);
        if (value === '删除') {
          layer.confirm('真的删除行么', function (index) {
            deleteShop(data.id)
            layer.close(index);
          });
        } else {
          layer.msg('输入错误，删除失败');
        }
      });
    } else if (obj.event === 'edit') {
      admin.popup({
        title: '修改店铺',
        area: ['500px', '450px'],
        id: 'LAY-popup-app-shop',
        success: function (layero, index) {
          view(this.id).render('shop/shopform', data).done(function () {
            form.render(null, 'layuiadmin-form-shop');

            //监听提交
            form.on('submit(LAY-admin-shop-submit)', function (data) {
              var field = data.field; //获取提交的字段
              console.log(field)
              $.ajax({
                url: 'http://asryc.antony0127.cn/asryc/shop-service/admin/shop/update',
                type: "post",
                contentType: "application/json",
                headers: {
                  "api-version": layui.data('layuiAdmin').apiVersion,
                  "Authorization": layui.data('layuiAdmin').token
                },
                dataType: "json",
                data: JSON.stringify(field),
                success: function (res) {
                  console.log(res)
                  if (res.status == 200) {
                    layer.msg("修改成功", {
                      offset: '15px',
                      icon: 1,
                      time: 1000
                    }, function () {
                      // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
                      layui.table.reload('LAY-shop-manage'); //重载表格
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
              layer.close(index); //执行关闭 
            });
          });
        }
      });
    } else if (obj.event === 'link') {
      admin.popup({
        title: '关联店长',
        area: ['400px', '250px'],
        id: 'LAY-popup-app-shop',
        success: function (layero, index) {
          view(this.id).render('shop/shopUser', data).done(function () {
            form.render(null, 'layuiadmin-form-useradmin');
            //监听提交
            form.on('submit(LAY-user-shop-submit)', function (data) {
              var field = data.field; //获取提交的字段
              console.log(field);
              submitPhoneNumber(field)
              //提交 Ajax 成功后，关闭当前弹层并重载表格
              //$.ajax({});
              layui.table.reload('LAY-shop-manage'); //重载表格
              layer.close(index); //执行关闭 
            });
          });
        }
      });
    }
  });



  exports('shop', {})
});