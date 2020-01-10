/**

 @Name：activity 活动管理
 @Author：Antony
 @Site：
 @License: LPPL
    
 */

layui.use('api', layui.factory('api')).define(['form', 'table'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin,
        table = layui.table,
        api = layui.api,
        form = layui.form;

    var $body = $('body');

    //课程管理
    table.render({
        elem: '#LAY-course-manage',
        url: 'http://asryc.antony0127.cn/asryc/product-service/admin/course/page' ,
        parseData: function (res) {
            console.log(res)
            return {
                "code": 0,
                "msg": "",
                "count": res.detail.totalCount,
                data: res.data
            }
        },
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
        page:true,
        limit:10,
        cols: [
            [ {
                field: 'id',
                width: 80,
                title: 'ID',
                sort: true
            }, {
                field: 'title',
                title: '标题',
            }, {
                field: 'shopName',
                title: '店名'
            }, {
                field: 'minPrice',
                width: 80,
                title: '最低价'
            }, {
                field: 'capacity',
                title: '容量',
                sort: true
            }, {
                field: 'saleCount',
                title: '销量',
                sort: true
            }, {
                field: 'status',
                title: '状态'
            }, {
                field: 'createDate',
                title: '上架日期',
            },{
                field: 'viewCount',
                title: '浏览量',
            }, {
                title: '操作',
                width: 200,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-course-list'
            }]
        ],
        page: true,
        limit: 30,
        height: 'full-320',
        text: {
            none: '暂无相关数据',
            error: '接口请求异常'
          }
    });


    //课程类别管理
    table.render({
        elem: '#LAY-course-category-manage',
        url: 'http://asryc.antony0127.cn/asryc/product-service/admin/course/category/page' ,
        parseData: function (res) {
            console.log(res)
            return {
                "code": 0,
                "msg": "",
                "count":  res.detail.totalCount,
                data: res.data
            }
        },
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
        page:true,
        limit:10,
        cols: [
            [ {
                field: 'id',
                width: 80,
                title: 'ID',
                sort: true
            }, {
                field: 'title',
                title: '标题'
            }, {
                field: 'parentTitle',
                title: '父级标题',
                sort: true
            }, {
                field: 'weight',
                title: '权重',
                sort: true
            }, {
                field: 'createDate',
                title: '添加日期',
                sort: true
            }, {
                title: '操作',
                width: 150,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-courseCategory'
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
    function sendStatus(data){
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/product-service/admin/course/update',
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
                layui.table.reload('LAY-course-manage'); //重载表格
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
    function deleteCourse(id){
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/product-service/admin/course/delete/'+id,
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
                layui.table.reload('LAY-course-manage'); //重载表格
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
    function saveCategory(data){
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
                layer.msg("添加成功", {
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
    function deleteCourseCategory(id){
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/product-service/admin/course/category/delete/'+id,
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
    //监听工具条
    table.on('tool(LAY-course-manage)', function (obj) {
        const data = obj.data;
        const formData = obj.data;
        if (obj.event === 'putAway') {
            const data = {
                id:formData.id,
                status:'PUT_AWAY'
            }
            console.log(data)
            sendStatus(data)
        } else if (obj.event === 'putOff') {
            const data = {
                id:formData.id,
                status:'PUT_OFF'
            }
            console.log(data)
            sendStatus(data)
        } else if (obj.event === 'del') {
            layer.prompt({
                formType: 0,
                title: '敏感操作，请输入“删除”'
            }, function (value, index) {
                layer.close(index);
                console.log(value);
                if (value === '删除') {
                    layer.confirm('真的删除行么', function (index) {
                        deleteCourse(data.id)
                        layer.close(index);
                    });
                } else {
                    layer.msg('输入错误，删除失败');
                }
            });
        }
    });
    table.on('tool(LAY-course-category-manage)', function (obj) {
        // 
        const formData = obj.data;
        if (obj.event === 'edit') {
            admin.popup({
                title: '修改类别',
                area: ['384px', '260px'],
                id: 'LAY-popup-app-shop',
                success: function (layero, index) {
                  view(this.id).render('course/courseCategoryForm', formData).done(function () {
                    form.render(null, 'layuiadmin-form-shop');
                    //监听提交
                    form.on('submit(LAY-admin-shop-submit)', function (data) {
                      var field = data.field; //获取提交的字段
                      console.log(field)
                      api.myPost("http://asryc.antony0127.cn/asryc/product-service/admin/course/category/update",field)
                      .then(res=>{
                        layer.msg("修改成功")
                        layui.table.reload('LAY-course-category-manage')
                      })
                    //   saveCategory(field)
                      layer.close(index); //执行关闭 
                    });
                  });
                }
              });
        } else if (obj.event === 'del') {
            layer.prompt({
                formType: 0,
                title: '敏感操作，请输入“删除”'
            }, function (value, index) {
                layer.close(index);
                console.log(value);
                if (value === '删除') {
                    layer.confirm('真的删除行么', function (index) {
                        api.myDelete("http://asryc.antony0127.cn/asryc/product-service/admin/course/category/delete/",formData.id).then(res=>layui.table.reload('LAY-course-category-manage'))
                        // deleteCourseCategory(formData.id)
                        layer.close(index);
                    });
                } else {
                    layer.msg('输入错误，删除失败');
                }
            });
        }
    });
    //对外暴露的接口
    exports('course', {});
});