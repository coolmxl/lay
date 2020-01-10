/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;/**

 @Name：activity 活动管理
 @Author：Antony
 @Site：
 @License: LPPL
    
 */

layui.define(['form', 'table'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin,
        table = layui.table,
        form = layui.form;

    var $body = $('body');

    //活动管理
    table.render({
        elem: '#LAY-activity-manage',
        url: 'http://asryc.antony0127.cn/asryc/product-service/admin/activity/page' //模拟接口
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
        toolbar: '#toolbarActivity' //开启头部工具栏，并为其绑定左侧模板
        ,
        defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips'
        }],
        cols: [
            [{
                field: 'id',
                title: 'ID',
                sort: true
            }, {
                field: 'headImg',
                title: '缩略图',
                templet: '#imgTpl'

            }, {
                field: 'title',
                title: '标题',
            }, {
                field: 'price',
                title: '价格'
            }, {
                field: 'blnHot',
                title: '热门',
                width: 60,
                templet: '#blnHotTpl'
            }, {
                field: 'capacity',
                width: 80,
                title: '容量'
            }, {
                field: 'viewCount',
                title: '浏览量',
                width: 60,

            }, {
                field: 'createDate',
                title: '上架日期',
                minWidth: 120,
                sort: true
            }, {
                title: '操作',
                width: 250,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-avtivity-list'
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
    table.on('tool(LAY-activity-manage)', function (obj) {
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
                title: '修改商品',
                area: ['500px', '550px'],
                id: 'LAY-popup-activicy',
                success: function (layero, index) {
                    view(this.id).render('activity/addActivity', data).done(function () {
                        form.render(null, 'layuiadmin-form-avtivity-add');
                        // console.log(data)
                        //监听提交
                        form.on('submit(LAY-admin-activity-category-submit)', function (data) {
                            var field = data.field; //获取提交的字段

                            //提交 Ajax 成功后，关闭当前弹层并重载表格
                            //$.ajax({});
                            layui.table.reload('LAY-activity-category-manage'); //重载表格
                            layer.close(index); //执行关闭 
                        });
                    });
                }
            });
        }
    });


    //监听单元格编辑
    table.on('edit(LAY-activity-manage)', function (obj) {
        var value = obj.value //得到修改后的值
            ,
            data = obj.data //得到所在行所有键值
            ,
            field = obj.field; //得到字段
        console.log(data);
        layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改为：' + value);
    });


    //活动类别管理
    table.render({
        elem: '#LAY-activity-category-manage',
        url: 'http://asryc.antony0127.cn/asryc/product-service/admin/activity/category/page' //模拟接口
        ,
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
        page: true,
        limit: 10,
        cols: [
            [ {
                field: 'id',
                width: 80,
                title: 'ID',
                sort: true
            }, {
                field: 'title',
                title: '名称'
            }, {
                field: 'weight',
                title: '权重',
                sort: true
            }, {
                field: 'createDate',
                title: '上架日期',
                sort: true
            }, {
                title: '操作',
                width: 150,
                align: 'center',
                fixed: 'right',
                toolbar: '#table-avtivity-list'
            }]
        ],
        height: 'full-320',
        text: {
            none: '暂无相关数据',
            error: '接口请求异常'
          }
    });
    function sendStatus(data) {
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/product-service/admin/activity/update',
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
                    layer.msg("操作成功", {
                        offset: '15px',
                        icon: 1,
                        time: 1000
                    }, function () {
                        // location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
                        layui.table.reload('LAY-activity-manage'); //重载表格
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
    function deleteActivity(data) {
        $.ajax({
            url: 'http://asryc.antony0127.cn/asryc/product-service/admin/activity/delete/' + data,
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
                        layui.table.reload('LAY-activity-manage'); //重载表格
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
    table.on('tool(LAY-activity-manage)', function (obj) {
        const formData = obj.data;
        if (obj.event === 'putAway') {
            const data = {
                id: formData.id,
                status: 'PUT_AWAY'
            }
            sendStatus(data)
        } else if (obj.event === 'putOff') {
            const data = {
                id: formData.id,
                status: 'PUT_OFF'
            }
            sendStatus(data)
        } else if (obj.event === 'del') {
            // console.log(obj.data);
            if(obj.data.status === "PUT_AWAY"){
                layer.msg("不能删除正在上架的商品")
                return false
            }
            const id = obj.data.id;
            deleteActivity(id)
        }
    });


    //对外暴露的接口
    exports('activity', {});
});