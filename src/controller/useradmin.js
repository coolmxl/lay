/**

 @Name：Antony 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */


layui.define(['table', 'form'], function (exports) {
  var $ = layui.$,
    admin = layui.admin,
    view = layui.view,
    table = layui.table,
    form = layui.form;

  //用户管理
  table.render({
    elem: '#LAY-user-manage',
    url: 'http://asryc.antony0127.cn/asryc/user-service/admin/user/page' //模拟接口
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
        width: 100,
        title: 'ID',
        sort: true
      }, {
        field: 'nickName',
        title: '用户名',
        minWidth: 100
      }, {
        field: 'avatarUrl',
        title: '头像',
        width: 100,
        templet: '#imgTpl'
      }, {
        field: 'phoneNumber',
        title: '手机'
      }, {
        field: 'gender',
        width: 80,
        title: '性别',
        sort: true,
        templet: "#sexTpl"
      }, {
        field: 'userType',
        title: '用户类型',
        templet: '#userType'
      }, {
        field: 'createDate',
        title: '加入时间',
        sort: true
      }, {
        title: '操作',
        width: 150,
        align: 'center',
        fixed: 'right',
        toolbar: '#table-useradmin-miniuser'
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

  //监听工具条
  table.on('tool(LAY-app-manage)', function (obj) {
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
            obj.del();
            layer.close(index);
          });
        } else {
          layer.msg('输入错误，删除失败');
        }
      });
    } else if (obj.event === 'edit') {
      admin.popup({
        title: '关联店铺',
        area: ['500px', '450px'],
        id: 'LAY-popup-app-cms',
        success: function (layero, index) {
          view(this.id).render('app/app/editUser', data).done(function () {
            form.render(null, 'layuiadmin-form-useradmin');

            //监听提交
            form.on('submit(LAY-app-cms-submit)', function (data) {
              var field = data.field; //获取提交的字段

              //提交 Ajax 成功后，关闭当前弹层并重载表格
              //$.ajax({});
              layui.table.reload('LAY-app-manage'); //重载表格
              layer.close(index); //执行关闭 
            });
          });
        }
      });
    }
  });

  //管理员管理
  table.render({
    elem: '#LAY-app-back-manage',
    url: './json/useradmin/mangadmin.js' //模拟接口
      ,
    cols: [
      [{
        type: 'checkbox',
        fixed: 'left'
      }, {
        field: 'id',
        width: 80,
        title: 'ID',
        sort: true
      }, {
        field: 'loginname',
        title: '登录名'
      }, {
        field: 'phoneNumber',
        title: '手机'
      }, {
        field: 'email',
        title: '邮箱'
      }, {
        field: 'role',
        title: '角色'
      }, {
        field: 'jointime',
        title: '加入时间',
        sort: true
      }, {
        field: 'check',
        title: '审核状态',
        templet: '#buttonTpl',
        minWidth: 80,
        align: 'center'
      }, {
        title: '操作',
        width: 150,
        align: 'center',
        fixed: 'right',
        toolbar: '#table-useradmin-admin'
      }]
    ],
    text: {
      none: '暂无相关数据',
      error: '接口请求异常'
    }
  });

  //监听工具条
  table.on('tool(LAY-app-back-manage)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.prompt({
        formType: 1,
        title: '敏感操作，请验证口令'
      }, function (value, index) {
        layer.close(index);
        layer.confirm('确定删除此管理员？', function (index) {
          console.log(obj)
          obj.del();
          layer.close(index);
        });
      });
    } else if (obj.event === 'edit') {
      admin.popup({
        title: '编辑管理员',
        area: ['420px', '450px'],
        id: 'LAY-popup-app-add',
        success: function (layero, index) {
          view(this.id).render('app/administrators/adminform', data).done(function () {
            form.render(null, 'layuiadmin-form-admin');

            //监听提交
            form.on('submit(LAY-app-back-submit)', function (data) {
              var field = data.field; //获取提交的字段

              //提交 Ajax 成功后，关闭当前弹层并重载表格
              //$.ajax({});
              layui.table.reload('LAY-app-back-manage'); //重载表格
              layer.close(index); //执行关闭 
            });
          });
        }
      });
    }
  });

  //角色管理
  table.render({
    elem: '#LAY-app-back-role',
    url: './json/useradmin/role.js' //模拟接口
      ,
    cols: [
      [{
        type: 'checkbox',
        fixed: 'left'
      }, {
        field: 'id',
        width: 80,
        title: 'ID',
        sort: true
      }, {
        field: 'rolename',
        title: '角色名'
      }, {
        field: 'limits',
        title: '拥有权限'
      }, {
        field: 'descr',
        title: '具体描述'
      }, {
        title: '操作',
        width: 150,
        align: 'center',
        fixed: 'right',
        toolbar: '#table-useradmin-admin'
      }]
    ],
    text: {
      none: '暂无相关数据',
      error: '接口请求异常'
    }
  });

  //监听工具条
  table.on('tool(LAY-app-back-role)', function (obj) {
    var data = obj.data;
    if (obj.event === 'del') {
      layer.confirm('确定删除此角色？', function (index) {
        obj.del();
        layer.close(index);
      });
    } else if (obj.event === 'edit') {
      admin.popup({
        title: '添加新角色',
        area: ['500px', '480px'],
        id: 'LAY-popup-app-add',
        success: function (layero, index) {
          view(this.id).render('app/administrators/roleform', data).done(function () {
            form.render(null, 'layuiadmin-form-role');

            //监听提交
            form.on('submit(LAY-app-role-submit)', function (data) {
              var field = data.field; //获取提交的字段

              //提交 Ajax 成功后，关闭当前弹层并重载表格
              //$.ajax({});
              layui.table.reload('LAY-app-back-role'); //重载表格
              layer.close(index); //执行关闭 
            });
          });
        }
      });
    }
  });

  exports('useradmin', {})
});