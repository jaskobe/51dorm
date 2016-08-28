/**
 * Created by Jasko on 5/9/16.
 */

$(function(){
    //导航高亮
    var nav = $(".nav-side a");
    var urlstr = location.href;
    var urlstatus=false;
    nav.each(function () {
        if ((urlstr + '/').indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {
            urlstatus = true;
            $(this).addClass('nav-active');
        } else {
            $(this).removeClass('nav-active');
        }
    });
    if (!urlstatus||urlstr=='http://localhost:3000/') {
        $(".nav-side a").eq(0).addClass('nav-active');
    } else {
        $(".nav-side a").eq(0).removeClass('nav-active');
    }

    //设置滑动显示
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    wow.init();

    var setting = {
        //初始化
        init : function(){
            this.setNav();
            this.minFull();
            this.setFull();
            this.vertical();
            this.maxFull();
            this.center();
        },
        //设置导航
        setNav : function(){
            var wh = $(window).height();
            var side = $(".nav-side");
            side.height(wh);
        },
        //设置全屏
        setFull : function(){
            $(".full-page").each(function(){
                $(this).height($(window).height());
            })
        },
        //设置垂直居中
        vertical : function(){
            $(".v-center").each(function(){
                var $this = $(this),
                    box = $this.parent();
                $this.css({
                    "margin-top":-($this.height())/2
                });
            })
        },
        center : function(){
            $(".b-center").each(function(){
                var $this = $(this),
                    box = $this.parent();
                $this.css({
                    "top":(box.height() - $this.height())/2,
                    "left":(box.width() - $this.width())/2
                });
            })
        },
        //设置最大满屏
        maxFull : function(){
            $(".max-full").each(function(){
                $(this).css("max-height",$(window).height()-60);
            })
        },
        //设置最小满屏
        minFull : function(){
            $(".wrap").css("min-height",$(window).height());
        }

    };

    //默认执行
    setting.init();
    //改变窗口执行
    $(window).resize(function(){
        setting.init();
        if($(window).width()>768){
            $(".nav-side>ul").show();
        }else {
            $(".nav-side>ul").hide();
        }
    });
    //懒加载
    $("img.lazy").lazyload({
        effect:'fadeIn',
        threshold: 10, // 提前开始加载距离
        failurelimit : 2 // 提前加载图片张数

    });

    //导航点击事件
    var nava = $(".nav-side").find("li>a");
    nava.click(function(){
        $(this).addClass("nav-active").parent().siblings("").find("a").removeClass("nav-active");
    });
    //mobile 事件
    var btn = $(".nav-btn"),
        lang = $(".lang-box");
    list = $(".nav-side>ul");
    btn.click(function(){
        var icon = $(this).find("span");
        //alert(1);
        if(icon.hasClass("glyphicon-menu-hamburger")){
            //alert(1);
            lang.show();
            list.show();
            icon.removeClass("glyphicon-menu-hamburger").addClass("glyphicon-remove");
            return false;
        }
        if(icon.hasClass("glyphicon-remove")){
            //alert(3);

            lang.hide();
            list.hide();
            icon.removeClass("glyphicon-remove").addClass("glyphicon-menu-hamburger");
            return false;
        }
    })
});
