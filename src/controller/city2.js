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

    function deleteCity(id){
      $.ajax({
          url: 'http://asryc.antony0127.cn/asryc/product-service/admin/city/delete/'+id,
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
              layui.table.reload('LAY-city-manage'); //重载表格
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
    function citySave(data){
      $.ajax({
          url: 'http://asryc.antony0127.cn/asryc/product-service/admin/city/save',
          type: "post",
          contentType: "application/json",
          headers: {
          "api-version": layui.data('layuiAdmin').apiVersion,
          "Authorization": layui.data('layuiAdmin').token
          },
          dataType: "json",
          data:JSON.stringify(data),
          success: function (res) {
          console.log(res)
          if (res.status == 200) {
              layer.msg("添加成功", {
              offset: '15px',
              icon: 1,
              time: 1000
              }, function () {
              // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
              layui.table.reload('LAY-city-manage'); //重载表格
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
    table.on('tool(LAY-city-manage)', function (obj) {
      var data = obj.data;
      if (obj.event === 'del') {
        layer.prompt({
          formType: 0,
          title: '敏感操作，请输入“删除”'
        }, function (value, index) {
          layer.close(index);
          console.log(value);
          if (value === '删除') {
            layer.confirm('真的删除行么', function (index) {
              deleteCity(data.id)
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
            view(this.id).render('city/cityform', data).done(function () {
              form.render(null, 'layuiadmin-form-shop');
              //监听提交
              form.on('submit(LAY-admin-shop-submit)', function (data) {
                console.log(data)
                var field = data.field; //获取提交的字段
                field.id = obj.data.id
                console.log(field)
                citySave(field)
                layer.close(index); //执行关闭 
              });
            });
          }
        });
      } 
    });  
    exports('slider', {})
  });