/**

 @Name：layuiAdmin 用户登入和注册等
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License: LPPL
    
 */

layui.define('form', function (exports) {
  var $ = layui.$,
    layer = layui.layer,
    laytpl = layui.laytpl,
    setter = layui.setter,
    view = layui.view,
    admin = layui.admin,
    router = layui.router(),
    search = router.search;
  form = layui.form;

  var $body = $('body');
  getCode();
  //自定义验证
  form.verify({
    nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
          return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
          return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(value)) {
          return '用户名不能全为数字';
        }
      }

      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      ,
    pass: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ]
  });


  //更换图形验证码
  $body.on('click', '#LAY-user-get-vercode', function () {
    getCode();
  });
  //获取验证码
  function getCode() {
    admin.req({
      url: 'http://asryc.antony0127.cn/asryc/kaptcha-service/kaptcha/get', //实际使用请改成服务端真实接口
      done: function (res) {
        console.log(res)
        var src = 'data:image/jpg;base64,' + res.data.imgBase64;
        $("#LAY-user-get-vercode").attr("src", src);
        $("#LAY-user-login-uuid").val(res.data.uuid);
      }
    });
  }

  form.on('submit(LAY-user-login-submit)', function (obj) {
    console.log(JSON.stringify(obj.field))
    $.ajax({
      url: 'http://asryc.antony0127.cn/asryc/cms-service/admin/adminUser/login',
      type: "post",
      contentType: "application/json",
      headers: {
        "api-version": "1.0"
      },
      dataType: "json",
      data: JSON.stringify(obj.field),
      success: function (res) {
        console.log(res)
        getCode();
        if (res.status == 200) {
          sessionStorage.userName = obj.field.loginName
          layui.data(setter.tableName, {
            key: setter.request.tokenName,
            value: res.data.token
          });
          layui.data(setter.tableName, {
            key: setter.request.apiVersion,
            value: "1.0"
          });
          layer.msg('登入成功', {
            offset: '15px',
            icon: 1,
            time: 1000
          }, function () {
            location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
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
  });


  //对外暴露的接口
  exports('user', {});
});