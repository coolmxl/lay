/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;/**

 @Name：Antony 商家店铺管理
 @Author：Antony
 @Site：
 @License: LPPL
    
 */
layui.use('api', layui.factory('api')).define(['form', 'table'], function (exports) {
    var $ = layui.$,
      admin = layui.admin,
      view = layui.view,
      api = layui.api,
      table = layui.table,
      form = layui.form;
  
    console.log(layui.data('layuiAdmin').token)
    // 核销
    table.on('tool(LAY-shop-manage)', function (obj) {
      var data = obj.data;
      if (obj.event === 'edit') {
        api.myGet("http://asryc.antony0127.cn/asryc/order-service/admin/order/review/"+data.id).then(res=>{
          if(res){
            layui.table.reload('LAY-shop-manage'); //重载表格
          }
        })
      }
    });
    

    //店铺管理
    table.render({
      elem: '#LAY-shop-manage',
      url: 'http://asryc.antony0127.cn/asryc/order-service/admin/order/page', //模拟接口,
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
      totalRow: true,
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
          [ {
            field: 'id',
            title: 'ID',
            sort: true,
            totalRowText: '合计行',
            unresize: true
          },{
            field: 'orderNo',
            title: '订单编号',
            width: 200,

          }, {
            field: 'shopName',
            title: '店名'
          }, {
            field: 'status',
            title: '状态',
            templet: '#statusTpl'
          }, {
            field: 'remake',
            title: '标记'
          }, {
            field: 'payAmount',
            title: '支付金额',
            totalRow: true
          }, {
            field: 'payMethod',
            title: '支付方式',
            templet: '#payMethod'
          }, {
            title: '操作',
            width: 150,
            align: 'center',
            fixed: 'right',
            toolbar: '#table-order-shop'
          }]
        ],
        text: {
          none: '暂无相关数据',
          error: '接口请求异常'
        }

    });
    exports('order', {})
  });