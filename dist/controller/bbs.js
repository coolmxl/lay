/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;/**

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
        api = layui.api,
        admin = layui.admin,
        table = layui.table,
        form = layui.form;

    var $body = $('body');

    //帖子管理
    table.render({
        elem: '#LAY-bbs-manage',
        url: 'http://asryc.antony0127.cn/asryc/bbs-service/admin/bss/page',
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
        toolbar: '#toolbarActivity' ,//开启头部工具栏，并为其绑定左侧模板,
        defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips'
        }],
        cols: [
            [{
                field: 'id',
                width: 80,
                title: 'ID',
                sort: true
            }, {
                field: 'content',
                title: '内容',
            }, {
                field: 'nickName',
                title: '发帖人',
                templet: "#userTpl"
            }, {
                field: 'createDate',
                title: '上架日期',
                minWidth: 120,
                sort: true
            }, {
                field: 'viewCount',
                title: '浏览量'
            }, {
                field: 'title',
                title: '标题',
                templet: '#categoryTpl'
            }, {
                title: '操作',
                width: 250,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-bbs-list'
            }]
        ],
        height: 'full-320',
        text: {
            none: '暂无相关数据',
            error: '接口请求异常'
          }
    });
    function sendStatus(id){
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/bbs-service/admin/bss/hot/' + id,
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            headers: {
            "api-version": layui.data('layuiAdmin').apiVersion,
            "Authorization": layui.data('layuiAdmin').token
            },
            dataType: "json",
            success: function (res) {
            console.log(res)
            if (res.status == 200) {
                layer.msg("添加成功", {
                offset: '15px',
                icon: 1,
                time: 1000
                }, function () {
                // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
                layui.table.reload('LAY-bbs-manage'); //重载表格
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
    function deleteBbs(id){
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/bbs-service/admin/bss/delete/'+id,
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
                layui.table.reload('LAY-bbs-manage'); //重载表格
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
    //监听工具条 帖子
    table.on('tool(LAY-bbs-manage)', function (obj) {
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
                        console.log(data.id)
                        deleteBbs(data.id)
                        layer.close(index);
                    });
                } else {
                    layer.msg('输入错误，删除失败');
                }
            });
        } else if (obj.event === 'top') {
            layer.confirm('确定改变置顶状态吗', function (index) {
                const mydata = {
                    id:data.id
                }
                sendStatus(data.id)
                layer.close(index);
            });
        }
    });

    //论坛类别管理
    table.render({
        elem: '#LAY-bbs-category-manage',
        url: 'http://asryc.antony0127.cn/asryc/bbs-service/admin/bbs/category/page' //模拟接口
            // url: './json/activity/category.js' //模拟接口
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
        where: {
            "simpleOrderList": [{
                "orderMode": "ASC",
                "property": "weight"
            }]
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
                width: 80,
                title: 'ID',
                sort: true
            }, {
                field: 'name',
                title: '名称'
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
                toolbar: '#table-bbs-list'
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


    //监听工具条 论坛类别
    table.on('tool(LAY-bbs-category-manage)', function (obj) {
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
                        api.myDelete("http://asryc.antony0127.cn/asryc/bbs-service/admin/bbs/category/delete/"+obj.data.id).then(res=>{
                            console.log(res);
                        }).catch(err=>{
                            console.log(err);
                        })
                        // obj.del();
                        layer.close(index);
                    });
                } else {
                    layer.msg('输入错误，删除失败');
                }
            });
        } else if (obj.event === 'edit') {
            admin.popup({
                title: '修改分类',
                area: ['500px', '250px'],
                id: 'LAY-popup-activicy-category',
                success: function (layero, index) {
                    view(this.id).render('bbs/bbsCategoryForm', data).done(function () {
                        form.render(null, 'layuiadmin-form-avtivity-category');

                        //监听提交
                        form.on('submit(LAY-admin-bbs-category-submit)', function (data) {
                            var field = data.field; //获取提交的字段
                            console.log(field)
                            $.ajax({
                                url: 'http://asryc.antony0127.cn/asryc/bbs-service/admin/bbs/category/save',
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
                                            time: 500
                                        }, function () {
                                            // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
                                            layui.table.reload('LAY-bbs-category-manage'); //重载表格
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

    //对外暴露的接口
    exports('bbs', {});
});