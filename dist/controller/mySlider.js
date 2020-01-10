/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;/**

 @Name：Antony 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */
layui.define(['table', 'form','upload'], function (exports) {
  var $ = layui.$,
    admin = layui.admin,
    view = layui.view,
    table = layui.table,
    upload = layui.upload,
    form = layui.form;
    var globalData = {
      
    }

  //用户管理
  table.render({
    elem: '#LAY-shop-manage',
    url: 'http://asryc.antony0127.cn/asryc/product-service/admin/slider/page' //模拟接口
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
      }, {
        field: 'img',
        title: '图片地址',
        templet: '#imgTpl'
      }, {
        field: 'url',
        title: '目标网页',
      }, {
        title: '操作',
        width: 250,
        align: 'center',
        fixed: 'right',
        toolbar: '#table-slider-shop'
      }]
    ],
    page: true,
    limit: 10,
    height: 'full-320',
    text: {
      none: '暂无相关数据',
      error: '接口请求异常'
    }
  });

    // 删除活动类别
    function deleteSlider(data){
      console.log("删除的id",data)
      $.ajax({
        url: 'http://asryc.antony0127.cn/asryc/product-service/admin/slider/delete/'+ data,
        type: "delete",
        contentType: "application/json",
        headers: {
          "api-version": layui.data('layuiAdmin').apiVersion,
          "Authorization": layui.data('layuiAdmin').token
        },
        // data: JSON.stringify(data),
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
    //保存活动类别
    function saveSlider(data) {
      console.log("保存活动类别",data)
      $.ajax({
        url: 'http://asryc.antony0127.cn/asryc/product-service/admin/slider/save',
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
          deleteSlider(id)
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
          view(this.id).render('slider/sliderform', data).done(function () {
            form.render(null, 'layuiadmin-form-shop');
            //监听提交
            form.on('submit(LAY-admin-shop-submit)', function (data) {
              var field = data.field; //获取提交的字段
              // console.log(field)
              if(field.img){
                saveSlider(field)
              }
              else{
                layer.msg("太快了，慢点~")
              }
              layer.close(index); //执行关闭 
            });
          });
        }
      });
    }

   



  });


  exports('mySlider', {})
});