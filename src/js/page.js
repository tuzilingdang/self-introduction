    (function() {
        ceilingEffect() ;
        checkLogin();

        function refresh() { 
            window.location.reload(); 
        } 
        setTimeout('refresh()',1000*60*60); //指定1h刷新一次 


        var carrousel = new ctrl.carrousel(document.querySelector('#slider ul'), {
            autoplay: true,
            useGesture: true
        });

        var indicator = new ctrl.indicator({
            direction: 'horizontal',
            amount: carrousel.items.length,
            index: 1
        });
        document.querySelector('#slider .indicator').appendChild(indicator.root);

        carrousel.addEventListener('change', function() {
            var index = carrousel.items.index;
            var items = [carrousel.items.get(index), carrousel.items.get(index + 1)];

            items.map(function(item) {
                return item.querySelector('.lazyimg');
            }).filter(function(el){return !!el}).forEach(function(el) {
                el.src = el.getAttribute('data-src');
                el.removeAttribute('data-src');
                el.className = el.className.split(' ').filter(function(c){return c !== 'lazyimg'}).join(' ');
            });

            indicator.index =  index + 1;
        });
        carrousel.play();

        var scroll_x = new lib.scroll({
            scrollWrap: document.getElementById('scroll-wrap-x'),
            scrollElement: document.getElementById('scroll-content-x'),
            direction: 'x'
        });
        scroll_x .init();
        setScrollWidth();

        showDate();

        bind();

        // var thisheight = document.body.offsetHeight ;
        // alert(thisheight);
        // document.getElementById('container-y').style.height = thisheight.toString() + "px";
        // alert(document.getElementById('container-y').style.height);
     })();

     function ceilingEffect() {
        var contentHTML = document.querySelector('#content').innerHTML;
        var scrollView = new ctrl.scrollview({
            useFrameAnimation: true
        });

        // 吸顶的用法
        scrollView.sticky.enable = true;
        scrollView.fixed.enable = true;
        scrollView.content = contentHTML;

        document.body.appendChild(scrollView.root);
        scrollView.init();
        window.scrollView = scrollView;
     }

     function bind () { 
        var btn1 = document.querySelector('#head-sculpture');
        btn1.addEventListener('click', function () {
             WVCamera_takePhoto();
        }, false);
        
        // var btn2 = document.querySelector('.share');
        // btn1.addEventListener('click', function () {
        //      sharePage();
        // }, false);
     }

    function checkLogin() {
        var islogin = lib.login.isLogin(); 
        if (islogin == true)
            var userName = lib.login.getUserNick();
        else{
            lib.login.goLogin();
        }
        document.getElementById('username').innerHTML = userName;
    }

     function setScrollWidth (){
        var liArray = document.getElementById('scroll-ul').getElementsByTagName("li");
        var length = liArray.length;
        var liLength = parseFloat(document.getElementById('scroll-li').style.width.replace("rem",""));
        var scrollLeng = (liLength)*liArray.length ;
        document.getElementById('scroll-content-x').style.width = scrollLeng.toString() + "rem";
    }

    function showDate () {
        var date = new Date();
        var yDate = CNYDateString(date);
        var mDate = CNMDateString(date);
        var wDate = CNWDateString(date);
        document.getElementById('y-date').innerHTML = yDate;
        document.getElementById('m-date').innerHTML = mDate;
        document.getElementById('w-date').innerHTML = wDate;
    }

    function CNYDateString(date) { 
        var cn = ["零","一","二","三","四","五","六","七","八","九"]; 
        var s = []; 
        var YY = date.getFullYear().toString(); 
        for (var i = 0; i < YY.length; i++) {
            if (cn[YY.charAt(i)]) 
                s.push(cn[YY.charAt(i)]); 
            else 
                s.push(YY.charAt(i)); 
        }
        s.push("年"); 
        return s.join(''); 
    }

    function CNMDateString(date) {
        var cn = ["零","一","二","三","四","五","六","七","八","九"]; 
        var s = []; 
         var MM = date.getMonth() +parseInt(1); 　
        if (MM < 10) 
            s.push(cn[MM]); 
        else if (MM < 20) 
            s.push("十" + cn[MM% 10]); 
        s.push("月"); 
        var DD = date.getDate(); 
        if (DD < 10) 
            s.push(cn[DD]); 
        else if (DD < 20) 
            s.push("十" + cn[DD% 10]); 
        else 
            s.push("二十" + cn[DD% 10]); 
        s.push("日"); 
        return s.join(''); 
    }

    function CNWDateString(date) {
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
        var s = []; 
        s.push(dayNames[date.getDay()]);
        return s.join(''); 
    }

    function WVCamera_takePhoto() {
        document.addEventListener('WVPhoto.Event.savePhotoSuccess', function (e) {
            // alert('event savePhotoSuccess');
        });
        document.addEventListener('WVPhoto.Event.pressPhotoSuccess', function (e) {
            // alert('event pressPhotoSuccess');
        });
        document.addEventListener('WVPhoto.Event.takePhotoSuccess', function (e) {
            // alert('event takePhotoSuccess: ' + JSON.stringify(e.param));
        });
        document.addEventListener('WVPhoto.Event.prepareUploadPhotoSuccess', function (e) {
            // alert('event prepareUploadPhotoSuccess');
        });
        document.addEventListener('WVPhoto.Event.V2.progress', function (e) {
            // alert('event V2.progress: ' + JSON.stringify(e.param));
        });
        var params = {
            mode: 'camera',
            // 默认打开后置还是前置摄像头
            type: '1',
            bizCode:'mtopupload',
            v: '2.0',
            cameraType: 'back',
            // 遮罩图片地址
            maskImg: '',
            // 遮罩图片的宽度
            maskWidth: 0,
            // 遮罩图片的高度
            maskHeight: 0
        };
        window.WindVane.call('WVCamera', 'takePhotoPlus', params, function(e) {
           // alert(JSON.stringify(e));
            if (e.resourceURL) {
                // document.getElementById('photoPreview').src = e.url;
                document.getElementById("head-sculpture").style.backgroundImage="url("+e.resourceURL+")";
                // document.getElementById("test").innerHTML= e.url;
            }
            // alert('takePhoto success: ' + JSON.stringify(e));
           // document.getElementById('head-sculpture').innerHTML ;
           var url_photo = e.url ;

           // document.getElementById("head-sculpture").style.backgroundImage="url(document.getElementById('photoPreview').src)";
        }, function(e) {
            alert('takePhoto failure: ' + JSON.stringify(e));
        });
     } 

     function sharePage() {
        document.addEventListener('wvShareClickEvent', function(e) {
            alert(e.param.target);
        });
        var params = {
            // 分享内容的标题
            title: '分享',
            // 要分享的内容
            text: '炩羽的个人主页',
            // 要分享的图片地址
            image: '',
            // 要分享的 URL
            url: 'http://h5.m.taobao.com/src/lingyu.html?spm=0.0.0.0.tAsIwU'
        };
        window.WindVane.call('TBSharedModule', 'showSharedMenu', params, function(e) {
        }, function(e) {
            alert('failure: ' + JSON.stringify(e));
        });
     }

      function scrollEach (anchor) {
        if (anchor == '1')
            var anchor = document.querySelector('#anchor1');
        if (anchor == '2')
            var anchor = document.querySelector('#anchor2');
        if (anchor == '3')
            var anchor = document.querySelector('#anchor3');
        if (anchor == '4')
            var anchor = document.querySelector('#anchor4');
        scrollView.scrollToElement(anchor, true);
    }