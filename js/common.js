(function () {
    var htmlContent = '<div class="slider" id="slider">'
        + '<div class="slide"><img src="img/b5.png"></div>'
        + '<div class="slide"><img src="img/b1.png"></div>'
        + '<div class="slide"><img src="img/b2.png"></div>'
        + '<div class="slide"><img src="img/b3.png"></div>'
        + '<div class="slide"><img src="img/b4.png"></div>'
        + '<div class="slide"><img src="img/b5.png"></div>'
        + '<div class="slide"><img src="img/b1.png"></div>'
        + '</div>'
        + '<span id="left"><</span>'
        + '<span id="right">></span>'
        + '<ul class="nav" id="navs">'
        + '<li>1</li>'
        + '<li>2</li>'
        + '<li>3</li>'
        + '<li>4</li>'
        + '<li>5</li>'
        + '</ul>';
    var $box = $('#box')
    $box.append(htmlContent);
    var imgs = document.getElementsByClassName('slide');
    var images = imgs.length - 2;
    var navs = document.getElementById('navs').children;
    navsActive(0);
    // 获取索引值
    var timerCarousel = setInterval(nextPage, 3000);
    //移出
    $box.mouseout(function () {
        $('#left').css('opacity', 0);
        $('#right').css('opacity', 0);
        timerCarousel = setInterval(nextPage, 3000);
    })
    //移入
    $box.mouseover(function () {
        $('#left').css('opacity', 0.6);
        $('#right').css('opacity', 0.6);
        clearInterval(timerCarousel);
    })
    var index = 0;
    function previousPage() {
        if (index == 0) {
            $('#slider').animate({ left: '+=' + 1200 }, 1000, function () {
                $('#slider').css('left', -1200 * images);
            })
            navsActive(images - 1);
            index = images - 1;
        }
        else {
            $('#slider').animate({ left: '+=' + 1200 }, 1000);
            navsActive(index - 1);
            index--;
        }
    }
    function nextPage() {
        if (index == images - 1) {
            $('#slider').animate({ left: '-=' + 1200 }, 1000, function () {
                $('#slider').css('left', -1200);
            })
            navsActive(0);
            index = 0;
        }
        else {
            $('#slider').animate({ left: '-=' + 1200 }, 1000);
            navsActive(index + 1);
            index++;
        }
    }
    $('#left').click(previousPage);
    $('#right').click(nextPage);
    function navsActive(idx) {
        for (var i = 0; i < navs.length; i++) {
            navs[i].removeAttribute("class", "active");
        }
        navs[idx].setAttribute("class", "active");
    }
    for (var i = 0; i < images; i++) {
        (function (j) {
            navs[j].onclick = function () {
                if (j - index > 0) {
                    $('#slider').animate({ left: '-=' + 1200 * (j - index) }, 1000);
                }
                else if (j - index < 0) {
                    $('#slider').animate({ left: '+=' + 1200 * (index - j) }, 1000);
                }
                else {
                    return true;
                }
                navsActive(j);
                index = j;
            }
        })(i)
    }
})();