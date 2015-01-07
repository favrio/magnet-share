/// <reference path="jquery-1.7.1.min.js" />
$(function () {
    $('.switcher a').each(function (index) {
        $(this).click(function () {
            $('.switcher a').removeClass("current");
            $(this).addClass("current");
            $('.switcherBox .showBox').hide();
            $('.switcherBox .showBox').eq(index).show();
            return false;
        })
    });
    $('.editThis').each(function () {
        $(this).click(function () {
            var fileName = $(this).parents('tr').find('.fileName').text();
            var fileDate = $(this).parents('tr').find('.fileDate').text();
            var fileKind = $(this).parents('tr').find('.fileKind').text();
            var fileDesc = "测试内容!";

            var html = "<div class='popBox'><div class='inbox'><p>文件名称：" + "<input type='text' class='textBox' value='" + fileName + "' />" + "</p>";
            html += "<p>上传时间：" + "<input type='text' class='textBox' value='" + fileDate + "' />" + "</p>";
            html += "<p>文件类型：" + "<input type='text' class='textBox' value='" + fileKind + "' />" + "</p>";
            html += "<p>文件描述：" + "<textarea value=' class='textBox'" + fileDesc + "' />" + "</textarea>";
            html += "<input type='button' value='提交修改' class='thisEditBtn' /><input type='button' value='取消' class='thisEditBtnBlue' id='closeBtn' />";
            html += "</div></div>";
            $("body").append(html);
            $('#closeBtn').click(function () {
                $(this).parents('.popBox').remove();
            });
            return false;
        })
    });
})