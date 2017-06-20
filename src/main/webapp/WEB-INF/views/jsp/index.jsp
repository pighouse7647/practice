<%--
  Created by IntelliJ IDEA.
  User: Default User
  Date: 2017/4/23
  Time: 下午 03:40
  To change this template use File | Settings | File Templates.
--%>
<%--<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib  prefix="c"  uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="css.jsp" %>
<%@ include file="javascript.jsp" %>
<c:import url="/WEB-INF/views/jsp/utils.jsp"></c:import>
<%--test--%>
<html>
<head>
    <title>Title</title>
    <style>
        .btn-default {
            /*color: #fff;*/
            /*background-color: #0495c9;*/
            /*border-color: #357ebd; !*set the color you want here*!*/
        }
        .btn-default:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open>.dropdown-toggle.btn-primary {
            color: #fcf6ff;
            background-color: #ff6556;
            border-color: #285e8e; /*set the color you want here*/

        }
        .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
            background-color: #fffdc8;
        }

    </style>
</head>
<body>

<div class="container">
    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#todo_list">待辦事項</a></li>
        <li><a data-toggle="tab" href="#daily_report">日誌</a></li>
        <li><a data-toggle="tab" href="#">Messages</a></li>
    </ul>
    <form class="form-horizontal" id="form_today_all">
        <%--<input type="hidden" name="pageNo" value="${pageModel.pageNo}">--%>
        <input type="hidden" name="pageNo" value="1">
    </form>
    <div class=" tab-content">
        <%-- 1. 基本資料頁--%>
        <div id="todo_list" class="tab-panel tab-pane fade in active">
                <fieldset>
                    <div class="panel panel-default">
                        <div class="panel-heading clearfix">
                            <h4>
                                待辦事項
                            </h4>
                        </div>
                        <div class="panel-body">
                            <%--第一個talbe--%>
                            <table id="table_todo_1" class="table-responsive table table-hover">
                                <thead>
                                <td class="info text-center" width="2%"><button id="today_1_add_row" class="btn btn-success btn-sm">新增</button></td>
                                <td class="info text-center" width="8%">模組</td>
                                <td class="info text-center" width="5%">今天處理項目</td>
                                <td class="info text-center" width="5%">預計完成日</td>
                                <td class="info text-center" width="5%">預計處理內容</td>
                                <td class="info text-center" width="5%">實際處理內容</td>
                                <td class="info text-center" width="5%">未完成原因及後續處理</td>
                                <td class="info text-center" width="5%">卡住的問題</td>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <%--第二個talbe--%>
                            <table id="table_todo_2" class="table-responsive table table-hover">
                                <thead>
                                <td class="info text-center" width="2%"><button id="today_2_add_row" class="btn btn-success btn-sm">新增</button>
                                </td>
                                <td class="info text-center" width="8%">模組</td>
                                <td class="info text-center" width="5%">明天預計處理項目</td>
                                <td class="info text-center" width="5%">預計完成日</td>
                                <td class="info text-center" width="5%">預計處理內容</td>
                                <td class="text-center" width="5%"></td>
                                <td class="text-center" width="5%"></td>
                                <td class="text-center" width="5%"></td>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <%--第三個talbe--%>
                            <table id="table_todo_3" class="table-responsive table table-hover">
                                <thead>
                                <td class="info text-center" width="2%"><button id="today_3_add_row" class="btn btn-success btn-sm">新增</button></td>
                                <td class="info text-center" width="8%">模組</td>
                                <td class="info text-center" width="5%">To Do List</td>
                                <td class="info text-center" width="5%">預計完成日</td>
                                <td class="info text-center" width="5%">已完成比例</td>
                                <td class="text-center" width="5%"></td>
                                <td class="text-center" width="5%"></td>
                                <td class="text-center" width="5%"></td>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </fieldset>
        </div>



        <%--第二個tab--%>
        <div id="daily_report" class="tab-panel tab-pane fade in">
            <fieldset>
                <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                        <h4>Daily Report
                            <button id="copy_from_todo" class="btn btn-warning btn-sm">複製</button>
                        </h4>
                    </div>
                    <div class="panel-body">
                        <%--第一個talbe--%>
                        <table id="table_daily" class="table-responsive table table-hover">
                            <thead>
                            <td class="info text-center" width="2%"><button id="daily_add_row" class="btn btn-success btn-sm">新增</button></td>
                            <td class="info text-center" width="4%">回報者</td>
                            <td class="info text-center" width="6%">工作日期</td>
                            <td class="info text-center" width="8%">專案名稱</td>
                            <td class="info text-center" width="5%">專案模組</td>
                            <td class="info text-center" width="6%">類型</td>
                            <td class="info text-center" width="6%">項目</td>
                            <td class="info text-center" width="4%">進度</td>
                            <td class="info text-center" width="3%">實際工時</td>
                            <td class="info text-center" width="5%">內容</td>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>

                    </div>
                </div>
            </fieldset>
        </div>
            <button class="btn btn-link btn-sm pull-right" onclick="downloadExcelFile()">下載Excel</button>
            <button class="btn btn-link btn-sm pull-right" onclick="downloadPdfFile()">下載Pdf</button>
            <button id="today_save" class="btn btn-primary btn-sm pull-right">儲存</button>
    </div>
</div>




<%--樣板1--%>
<script type="text/template" id="today_1">
    <tr>
        <div class="form-group">
            <td class="text-center">
                <button class="btn btn-sm btn-default">刪除</button>
            </td>
            <td class="">
                <select id="" name="module" class="form-control">
                    <option value="YGP" selected="selected">1.元大人壽_GP</option>
                    <option value="TRAIN">2.教育訓練</option>
                    <option value="CMP">3.公司</option>
                </select>
            </td>
            <td class="">
                <select id="" name="todayItem" class="form-control">
                    <option value="0">0.保單</option>
                    <option value="qot" selected="selected">1.報價</option>
                    <option value="pol">2.新契約</option>
                    <option value="eda">3.保全</option>
                    <option value="clm">4.理賠</option>
                    <option value="edu">5.教訓訓練</option>
                    <option value="oth">6.其他</option>
                </select>
            </td>
            <td class="">
                <div style="position: relative">
                    <input type='text' name="completeDate" class="form-control datetimepicker"/>
                </div>
            </td>
            </td>
            <td class="">
                <textarea name="anticipateDetail" class="form-control" style="min-width:20px; height: 34px; resize: vertical"></textarea>
            </td>
            <td class="">
                <textarea name="todayDetail" class="form-control" style="min-width:20px; height: 34px; resize: vertical"></textarea>
            </td>
            <td class="">
                <textarea name="excuse" class="form-control" style="min-width:20px; height: 34px; resize: vertical"></textarea>
            </td>
            <td class="">
                <textarea name="obstacle" class="form-control" style="min-width:20px; height: 34px; resize: vertical"></textarea>
            </td>
        </div>
    </tr>
</script>
<%--樣板2--%>
<script type="text/template" id="today_2">
    <tr class="text-center">
        <div class="form-group">
            <td>
                <button class="btn btn-default btn-sm">刪除</button>
            </td>
            <td class="">
                <select id="" name="module" class="form-control">
                    <option value="YGP" selected="selected">1.元大人壽_GP</option>
                    <option value="TRAIN">2.教育訓練</option>
                    <option value="CMP">3.公司</option>
                </select>
            </td>
            <td class="">
                <select id="" name="tomorrowItem" class="form-control">
                    <option value="0">0.保單</option>
                    <option value="qot" selected="selected">1.報價</option>
                    <option value="pol">2.新契約</option>
                    <option value="eda">3.保全</option>
                    <option value="clm">4.理賠</option>
                    <option value="edu">5.教訓訓練</option>
                    <option value="oth">6.其他</option>
                </select>
            </td>
            <td class="">
                <div style="position: relative">
                    <input type='text' name="completeDate" class="form-control datetimepicker"/>
                </div>
            </td>
            </td>
            <td class="">
                <textarea class="form-control" name="anticipateDetail" style="min-width:20px; height: 34px; resize: vertical"></textarea>
            </td>
        </div>
    </tr>
</script>
<%--樣板3--%>
<script type="text/template" id="today_3">
    <tr class="text-center">
        <div class="form-group">
            <td>
                <button class="btn btn-default btn-sm">刪除</button>
            </td>
            <td class="">
                <select id="" name="module" class="form-control">
                    <option value="YGP" selected="selected">1.元大人壽_GP</option>
                    <option value="TRAIN">2.教育訓練</option>
                    <option value="CMP">3.公司</option>
                </select>
            </td>
            <td class="">
                <select id="" name="todoItem" class="form-control">
                    <option value="0">0.保單</option>
                    <option value="qot" selected="selected">1.報價</option>
                    <option value="pol">2.新契約</option>
                    <option value="eda">3.保全</option>
                    <option value="clm">4.理賠</option>
                    <option value="edu">5.教訓訓練</option>
                    <option value="oth">6.其他</option>
                </select>
            </td>
            <td class="">
                <div style="position: relative">
                    <input type='text' name="completeDate" class="form-control datetimepicker"/>
                </div>
            </td>
            </td>
            <td class="">
                <input type='text' name="completeRatio" class="form-control "/>
            </td>
        </div>
    </tr>
</script>
<%--樣板1--%>
<script type="text/template" id="daily">
    <tr>
        <div class="form-group">
            <td class="text-center">
                <button class="btn btn-sm btn-default">刪除</button>
            </td>
            <td>
                <%--<div style="position: relative">--%>
                    <input type="text" class="form-control" name ="empName" value="Thomas">
                <%--</div>--%>
            </td>
            <td class="">
                <div style="position: relative">
                    <input type='text' name="workingDate" class="form-control datetimepicker"/>
                </div>
            </td>
            <td class="">
                <select id="" name="module" class="form-control">
                    <option value="YGP" selected="selected">1.元大人壽_GP</option>
                    <option value="TRAIN">2.教育訓練</option>
                    <option value="CMP">3.公司</option>
                </select>
            </td>
            <td>
                <input type="text" class="form-control" name="shortModule" value="保單">
            </td>
            <td class="">
                <select id="" name="itemType" class="form-control">
                    <option value="dev" selected="selected">0.開發</option>
                    <option value="mt">1.會議</option>
                    <option value="oth">2.其他</option>
                </select>
            </td>
            <td class="">
                <select id="" name="todayItem" class="form-control">
                    <option value="0">0.保單</option>
                    <option value="qot" selected="selected">1.報價</option>
                    <option value="pol">2.新契約</option>
                    <option value="eda">3.保全</option>
                    <option value="clm">4.理賠</option>
                    <option value="edu">5.教訓訓練</option>
                    <option value="oth">6.其他</option>
                </select>
            </td>
            <td>
                <input type="text" class="form-control" name="completeRatio" value="100%">
            </td>
            <td>
                <input type="text" class="form-control" name="workHour" value="7.5">
            </td>
            </td>
            <td class="">
                <textarea name="todayDetail" class="form-control" style="min-width:20px; height: 34px; resize: vertical"></textarea>
            </td>
        </div>
    </tr>
</script>



<script>


    // 下載Excel連結
    function downloadExcelFile() {
        window.location.href = '<c:url value="/query/excel"/>';
    };
    // 下載Pdf連結
    function downloadPdfFile() {
        window.location.href = '<c:url value="/query/pdf"/>';
    };


    $(function () {

        $('#today_1_add_row').bind('click', function() {
            var $tr = $('#today_1').html();
            // 新增後的動作
            var $table = $(this).parent().parent().parent().parent();
            $table.find('tbody').append($tr);
            // 刪除按鈕
            var $del_btn = $table.find('button:last');
            $del_btn.bind('click', function() {
                $(this).parent().parent().remove();
            });
            // 日期
            $('input[class*="datetimepicker"]').each(function() {
                $(this).datetimepicker({ format: 'YYYY-MM-DD'});
            });
        });

        $('#today_2_add_row').bind('click', function() {
            var $tr = $('#today_2').html();
            // 新增後的動作
            var $table = $(this).parent().parent().parent().parent();
            $table.find('tbody').append($tr);
            // 刪除按鈕
            var $del_btn = $table.find('button:last');
            $del_btn.bind('click', function() {
                $(this).parent().parent().remove();
            });
            // 日期
            $('input[class*="datetimepicker"]').each(function() {
                $(this).datetimepicker({ format: 'YYYY-MM-DD'});
            });
        });
        $('#today_3_add_row').bind('click', function() {
            var $tr = $('#today_3').html();
            // 新增後的動作
            var $table = $(this).parent().parent().parent().parent();
            $table.find('tbody').append($tr);
            // 刪除按鈕
            var $del_btn = $table.find('button:last');
            $del_btn.bind('click', function() {
                $(this).parent().parent().remove();
            });
            // 日期
            $('input[class*="datetimepicker"]').each(function() {
                $(this).datetimepicker({ format: 'YYYY-MM-DD'});
            });
        });

        $('#daily_add_row').bind('click', function() {
            var $tr = $('#daily').html();
            // 新增後的動作
            var $table = $(this).parent().parent().parent().parent();
            $table.find('tbody').append($tr);
            // 刪除按鈕
            var $del_btn = $table.find('button:last');
            $del_btn.bind('click', function() {
                $(this).parent().parent().remove();
            });
            // 日期
            $('input[class*="datetimepicker"]').each(function() {
                $(this).datetimepicker({ format: 'YYYY-MM-DD'});
            });
        });

        // 從todo複製到Daily
        $('#copy_from_todo').bind('click', function() {
            // 取自todo第一個table的實際處理內容欄位
            var $todyDetails = $('#table_todo_1 tbody tr').map(function(index) {
                return $(this).find("textarea[name='todayDetail']");
            });
            // 複製 + 改欄位值
            $todyDetails.each(function(index) {
                // 樣版的一條row
                var $tr = $('#daily').html().replace('</textarea>', $($todyDetails[index]).val() + '</textarea>');
                $('#table_daily tbody').append($tr);
            });
            // 刪除按鈕
            var $del_btn =  $('#table_daily').find('button:last');
            $del_btn.bind('click', function() {
                $(this).parent().parent().remove();
            });
            // 日期
            $('input[class*="datetimepicker"]').each(function() {
                $(this).datetimepicker({ format: 'YYYY-MM-DD'});
            });
        });



        $('#today_save').bind('click', function() {

            // 第一個table的序列化
            var data_1 = $('#table_todo_1 tbody tr').map(function(index) {
                var cols = $(this).find('td');
                var row = {};
                row[$(cols[1]['firstElementChild']).attr('name')] = $(cols[1]['firstElementChild']).find('option:selected').val();      // 模組
                row[$(cols[2]['firstElementChild']).attr('name')] = $(cols[2]['firstElementChild']).find('option:selected').val();      // 今日處理項目
                row[$(cols[3]['firstElementChild']).find('input').attr('name')] = $(cols[3]['firstElementChild']).find('input').val();  // 預計完成日
                row[$(cols[4]['firstElementChild']).attr('name')] = $(cols[4]['firstElementChild']).find('textarea').context.value;     // 預計處理內容
                row[$(cols[5]['firstElementChild']).attr('name')] = $(cols[5]['firstElementChild']).find('textarea').context.value;     // 實際處理內容
                row[$(cols[6]['firstElementChild']).attr('name')] = $(cols[6]['firstElementChild']).find('textarea').context.value;     // 未完成原因及後續處理
                row[$(cols[7]['firstElementChild']).attr('name')] = $(cols[7]['firstElementChild']).find('textarea').context.value;     // 卡住的問題
                return row;
            });

            // 第二個table的序列化
            var data_2 = $('#table_todo_2 tbody tr').map(function(index) {
                var cols = $(this).find('td');
                var row = {};
                row[$(cols[1]['firstElementChild']).attr('name')] = $(cols[1]['firstElementChild']).find('option:selected').val();      // 模組
                row[$(cols[2]['firstElementChild']).attr('name')] = $(cols[2]['firstElementChild']).find('option:selected').val();      // 明天處理項目
                row[$(cols[3]['firstElementChild']).find('input').attr('name')] = $(cols[3]['firstElementChild']).find('input').val();  // 預計完成日
                row[$(cols[4]['firstElementChild']).attr('name')] = $(cols[4]['firstElementChild']).find('textarea').context.value;     // 預計處理內容
                return row;
            });

            // 第三個table的序列化
            var data_3 = $('#table_todo_3 tbody tr').map(function(index) {
                var cols = $(this).find('td');
                var row = {};
                row[$(cols[1]['firstElementChild']).attr('name')] = $(cols[1]['firstElementChild']).find('option:selected').val();      // 模組
                row[$(cols[2]['firstElementChild']).attr('name')] = $(cols[2]['firstElementChild']).find('option:selected').val();      // 明天處理項目
                row[$(cols[3]['firstElementChild']).find('input').attr('name')] = $(cols[3]['firstElementChild']).find('input').val();  // 預計完成日
                row[$(cols[4]['firstElementChild']).attr('name')] = $(cols[4]['firstElementChild']).val();     // 已完成比例
                return row;
            });

            // 第二個tab 第一個table的序列化
            var data_4 = $('#table_daily tbody tr').map(function(index) {
                var cols = $(this).find('td');
                var row = {};
                row[$(cols[1]['firstElementChild']).attr('name')] = $(cols[1]['firstElementChild']).val();                // 回保者
                row[$(cols[2]['firstElementChild']).find('input').attr('name')] = $(cols[2]['firstElementChild']).find('input').val();  // 工作日
                row[$(cols[3]['firstElementChild']).attr('name')] = $(cols[3]['firstElementChild']).find('option:selected').val();      // 專案名稱
                row[$(cols[4]['firstElementChild']).attr('name')] = $(cols[4]['firstElementChild']).val();                // 專案模組
                row[$(cols[5]['firstElementChild']).attr('name')] = $(cols[5]['firstElementChild']).find('option:selected').val();      // 類型
                row[$(cols[6]['firstElementChild']).attr('name')] = $(cols[6]['firstElementChild']).find('option:selected').val();      // 項目
                row[$(cols[7]['firstElementChild']).attr('name')] = $(cols[7]['firstElementChild']).val();                // 進度
                row[$(cols[8]['firstElementChild']).attr('name')] = $(cols[8]['firstElementChild']).val();                // 實際工時
                row[$(cols[9]['firstElementChild']).attr('name')] = $(cols[9]['firstElementChild']).val();                // 內容
                return row;
            });

            // 去除不必要資訊
            delete data_1.context;
            delete data_1.prevObject;
            delete data_1.length;
            delete data_2.context;
            delete data_2.prevObject;
            delete data_2.length;
            delete data_3.context;
            delete data_3.prevObject;
            delete data_3.length;
            delete data_4.prevObject;
            delete data_4.length;

            // 串接起四個table的obj
            var data = [];
            var todo_index = 0;
            Array.of(data_1, data_2, data_3, data_4).forEach(function(val, ind, array) {
                Object.keys(val).forEach(function(key,index) {
                    data.push(val[key]);
                });
            });


            // 轉成一個JSON的ojb
            var json_data =  JSON.stringify($.extend(true, {}, toObject("#form_today_all"), {todoModels: data}));
//            var json_data =  JSON.stringify($.extend(true, [], toObject("#form_today_all"), data));
//            var json_data =  JSON.stringify($.extend(true, {}, toObject("#form_today_all")));
//            var json_data =  JSON.stringify(toObject("#form_today_all"));

            enblock({title: "儲存中"});
            $.ajax({
                url: '<c:url value="/todo/insert"/>',
                method: 'PUT',
                contentType: 'application/json; charset=utf-8',
                data: json_data,
            }).done(function (data, textStatus, jqXHR) {
                swal({
                    type: "success",
                    text: '儲存成功',
                    timer: 2000
                },function(){
//                    location.reload(true);
                });
//                if(data.data.length != 0) {
//                } else {
//                }
                deblock();
            }).fail(function (jqXHR, textStatus, errorThrown) {
//                alertAjaxFail(jqXHR, textStatus, errorThrown);
                deblock();
            }).always(function () {
//                deblock();
            });

        });

    });
</script>


</body>
</html>
