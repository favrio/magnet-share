
$(function () {
    $(".userInfo").hover(function () {
        $(this).stop().animate({ "background-color": "#B7BCC4" });
    }, function () {
        $(this).stop().animate({ "background-color": "#92B5EE" });
    });
    $(".management").hover(function () {
        $(this).stop().animate({ "background-color": "#B7BCC4" });
    }, function () {
        $(this).stop().animate({ "background-color": "#B5D283" });
    });
    var posLeft=0;
    setInterval(function () {
        $('body').css("background-position-x", posLeft +=2);
        if (posLeft >= 1572) {
            posLeft = 0;
        }
    }, 20);
    $("#catBox li a").each(function (index) {
        $(this).mouseover(function () {
            $(this).parent().parent().find("a").removeClass("catFocus");
            $(this).addClass("catFocus");
            $(".catShow").hide();
            $(".catShow").eq(index).show();
        });
    });
});