/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;layui.define(['element', 'jquery'], function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  var el = layui.element;
  var $ = layui.$;
  var obj = {
    mxl: "asd",
    hello: function (str) {
      alert('Hello ' + (str || 'mymod'));
    },
    myDelete: function (url, id) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: url + id,
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
              resolve(res)
              // layer.msg("删除成功", {
              // offset: '15px',
              // icon: 1,
              // time: 1000
              // }, function () {
              // // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
              // layui.table.reload('LAY-course-category-manage'); //重载表格
              // });
            }
          }
        })
      })
    },
    myPost: function (url, data) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: 'http://asryc.antony0127.cn/asryc/product-service/admin/course/category/update',
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
              resolve(res)
              // layer.msg("添加成功", {
              // offset: '15px',
              // icon: 1,
              // time: 1000
              // }, function () {
              // // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
              // layui.table.reload('LAY-course-category-manage'); //重载表格
              // });
            }
          }
        })
      })
    },
    myGet: function (url) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: url,
          type: "get",
          contentType: "application/json",
          headers: {
            "api-version": layui.data('layuiAdmin').apiVersion,
            "Authorization": layui.data('layuiAdmin').token
          },
          dataType: "json",
          success: function (res) {
            console.log(res)
            if (res.status == 200) {
              resolve(res)
              // layer.msg("添加成功", {
              // offset: '15px',
              // icon: 1,
              // time: 1000
              // }, function () {
              // // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
              // layui.table.reload('LAY-course-category-manage'); //重载表格
              // });
            }
          }
        })
      })
    },
    myPostPage: function (url,data) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: url,
          type: "post",
          contentType: "application/json",
          headers: {
            "api-version": layui.data('layuiAdmin').apiVersion,
            "Authorization": layui.data('layuiAdmin').token
          },
          dataType: "json",
          // request: { //request设置，默认值如下
          //   pageName: 'pageNo',
          //   limitName: 'pageSize'
          // },
          data:JSON.stringify(data),
          success: function (res) {
            console.log(res)
            if (res.status == 200) {
              resolve(res)
              // layer.msg("添加成功", {
              // offset: '15px',
              // icon: 1,
              // time: 1000
              // }, function () {
              // // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
              // layui.table.reload('LAY-course-category-manage'); //重载表格
              // });
            }
          }
        })
      })
    }
  };

  //输出test接口
  exports('api', obj);
});  