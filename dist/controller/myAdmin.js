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

      //保存活动类别
  function saveAdmin(data) {
    console.log("保存活动类别",data)
    $.ajax({
      url: 'http://asryc.antony0127.cn/asryc/cms-service/admin/adminUser/update',
      type: "post",
      contentType: "application/json",
      headers: {
        "api-version": layui.data('layuiAdmin').apiVersion,
        "Authorization": layui.data('layuiAdmin').token
      },
      data: JSON.stringify(data),
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          //开启节点操作图标
          layer.msg("修改成功")
          layui.table.reload('LAY-shop-manage'); //重载表格
        } else {
          layer.msg(res.desc)
        }
      }
    })
  }
  // 删除管理员
  function deleteAdmin(data){
    console.log("删除的id",data)
    const myData = [data]
    // console.log(myData);

    $.ajax({
      url: 'http://asryc.antony0127.cn/asryc/cms-service/admin/adminUser/deleteAdmin/'+data,
      type: "delete",
      contentType: "application/json",
      headers: {
        "api-version": layui.data('layuiAdmin').apiVersion,
        "Authorization": layui.data('layuiAdmin').token
      },
      dataType: "json",
      success: function (res) {
        if (res.status == 200) {
          //开启节点操作图标
          layer.msg("删除成功")
          layui.table.reload('LAY-shop-manage'); //重载表格
        } else {
          layer.msg(res.desc)
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
          const id = data.id
          deleteAdmin(id)
        } else {
          layer.msg('输入错误，删除失败');
        }
      });
    } 
  });
  exports('myAdmin', {})

});