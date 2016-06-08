$(function() {
    //iOS中WebAPP状态下点击链接会跳转到Safari浏览器新标签页的问题
    if (("standalone" in window.navigator) && window.navigator.standalone) {
        var noddy, remotes = false;
        document.addEventListener('click',
            function(event) {
                noddy = event.target;
                while (noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
                    noddy = noddy.parentNode;
                }
                if ('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)) {
                    event.preventDefault();
                    document.location.href = noddy.href;
                }
            },
            false
        );
    }


    /**
     * 统一提醒功能   
     * @param {string} message [提示内容]
     * @param {int} type    [提示类型： 为空：无图标
     *                                  0：提醒
     *                                  1：成功
     *                                  2：失败
     *                       ]
     * @param {[type]} time    [description]
     */
    function Xalert(message, type, time){
        if (!time||time=='') {
            var time = 2000;
        };
        if (!type||type=='') {
            layer.msg(message,{time: time});
        }else{
            layer.msg(message,{time: time,icon: type});
        }
    }
    /**
     * 通用AJAX提交，旧后台
     * @param  {string} url    表单提交地址
     * @param  {string} formObj    待提交的表单对象或ID
     */
    function commonAjaxSubmit(url,formObj){
        if(!formObj||formObj==''){
            var formObj="form";
        }
        if(!url||url==''){
            var url=document.URL;
        }
        $(formObj).ajaxSubmit({
            url:url,
            type:"POST",
            success:function(data, st) {
                //                var data = eval("(" + data + ")");
                if(data.status==1){
                    layer.msg(data.info,{time: 2000,icon: 1});
                    /* layer.alert(data.info,{
                        icon:1,
                        skin:'layer-ext-moon',
                        time:2000
                    }) */
                }else{
                    layer.msg(data.info,{time: 2000,icon: 0});
                    /* layer.alert(data.info,{
                        icon:0,
                        skin:'layer-ext-moon',
                        time:2000
                    }) */
                }
                if(data.url&&data.url!=''){
                    setTimeout(function(){
                        top.window.location.href=data.url;
                    },2000);
                }
                if(data.url==''){
                    setTimeout(function(){
                        top.window.location.reload();
                    },1000);
                }
            }
        });
        return false;
    }

    //jQuery弹窗提醒插件
    $.alertMessager = function(message, type, time) {
        if($.bootstrapGrowl){
            $.bootstrapGrowl(message, {
                type: type,
                delay: 2000,
                align: 'center',
                width: 'auto'
            });
        }else{
            type = type ? type : 'danger';
            var messager = '<div style="width:380px;height:auto;margin:0 auto;max-width: 80%;top:52px;left:0;right:0;z-index:99999;"' +
                'class="messager navbar-fixed-top border-none alert alert-' + type + '"><button type="button" class="close" ' +
                'data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' + message + '</div>';
            $('.messager').remove();
            $('body').prepend(messager);
            setTimeout(function() {
                $('.messager').remove();
            }, time ? time : 2000);
        }
    };


    //ajax get请求
    $('body').on('click', '.ajax-get', function() {
        var target;
        var that = this;
        if ($(this).hasClass('confirm')) {
            if (!confirm('确认要执行该操作吗?')) {
                return false;
            }
        }
        if ((target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            $(this).addClass('disabled').attr('autocomplete', 'off').prop('disabled', true);
            $.get(target).success(function(data) {
                if (data.status == 1) {
                    if (data.url) {
                        message = data.info + ' 页面即将自动跳转~';
                    } else {
                        message = data.info;
                    }
                    $.alertMessager(message, 'success');
                    setTimeout(function() {
                        $(that).removeClass('disabled').prop('disabled', false);
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            location.reload();
                        }
                    }, 2000);
                } else {
                    if (data.login == 1) {
                        $('#login-modal').modal(); //弹出登陆框
                    } else {
                        $.alertMessager(data.info, 'danger');
                    }
                    setTimeout(function() {
                        $(that).removeClass('disabled').prop('disabled', false);
                    }, 5000);
                }
            });
        }
        return false;
    });



    //ajax post submit请求
    $('body').on('click', '.ajax-post', function() {
        var target, query, form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm = false;

        if (($(this).attr('type') == 'submit') || (target = $(this).attr('href')) || (target = $(this).attr('url'))) {
            form = $('.' + target_form);
            if ($(this).attr('hide-data') === 'true') { //无数据时也可以使用的功能
                form = $('.hide-data');
                query = form.serialize();
            } else if (form.get(0) == undefined) {
                return false;
            } else if (form.get(0).nodeName == 'FORM') {
                if ($(this).hasClass('confirm')) {
                    if (!confirm('确认要执行该操作吗?')) {
                        return false;
                    }
                }
                if ($(this).attr('url') !== undefined) {
                    target = $(this).attr('url');
                } else {
                    target = form.get(0).action;
                }
                query = form.serialize();
            } else if (form.get(0).nodeName == 'INPUT' || form.get(0).nodeName == 'SELECT' || form.get(0).nodeName == 'TEXTAREA') {
                form.each(function(k, v) {
                    if (v.type == 'checkbox' && v.checked == true) {
                        nead_confirm = true;
                    }
                });
                if (nead_confirm && $(this).hasClass('confirm')) {
                    if (!confirm('确认要执行该操作吗?')) {
                        return false;
                    }
                }
                query = form.serialize();
            } else {
                if ($(this).hasClass('confirm')) {
                    if (!confirm('确认要执行该操作吗?')) {
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }

            $(that).addClass('disabled').attr('autocomplete', 'off').prop('disabled', true);
            $.post(target, query).success(function(data) {

                if (data.status == 1) {
                    if (data.url) {
                        message = data.info + ' 页面即将自动跳转~';
                    } else {
                        message = data.info;
                    }
                    $.alertMessager(message, 'success');
                    setTimeout(function() {
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            location.reload();
                        }
                    }, 2000);
                } else {
                    $.alertMessager(data.info, 'danger');
                    setTimeout(function() {
                        $(that).removeClass('disabled').prop('disabled', false);
                    }, 2000);
                    if($('.reload-verify').length > 0){
                        $('.reload-verify').click();
                    }
                }
            });
        }
        return false;
    });


    //一次性初始化所有弹出框
    $('[data-toggle="popover"]').popover();

    //切换左侧菜单
    var result = window.matchMedia("(min-width: 768px)");
    if (result.matches) {
        $('.full-container').addClass($.cookie('sidebar_title_hide'));
        $('body').on('click', '#sidebar-toggle', function() {
            if($.cookie('sidebar_title_hide') == 'title-hide'){
                $('.full-container').removeClass('title-hide');
                $.cookie('sidebar_title_hide', null, {path: '/'});
            }else{
                $('.full-container').addClass('title-hide');
                $.cookie('sidebar_title_hide', 'title-hide', {path: '/'});
            }
        });
    }
});
