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
      elem: '#LAY-city-manage',
      url: 'http://asryc.antony0127.cn/asryc/product-service/admin/slider/list' //模拟接口
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
          [{
            type: 'checkbox',
            fixed: 'left'
          },{
            field: 'id',
            width: 100,
            title: 'ID',
            sort: true
          }, {
            field: 'name',
            title: '城市',
            width: 100,
            templet: '#imgTpl'
          }, {
            title: '操作',
            width: 250,
            align: 'center',
            fixed: 'right',
            toolbar: '#table-city-city'
          }]
        ]
  
        ,
      text: '对不起，加载出现异常！'
    });
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
              obj.del();
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
                  url: 'http://127.0.0.1:16012/admin/shop/save',
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
      } 
    });  
    exports('city', {})
  });