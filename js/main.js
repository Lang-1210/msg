$(function () {
    resize(); $(window).resize(function (event) { resize(); }); $(".gotop").click(function () { $("html,body").stop().animate({ scrollTop: 0 }, 1000) })
    $(".banner").each(function () {
        if ($(this).find(".item").length > 2) {
            var owl = $(this).owlCarousel({ items: 1, loop: true, autoplay: true }); owl.on('changed.owl.carousel', function (event) {
                owl.find(".animated").each(function () { $(this).removeClass($(this).attr("data-animation")); })
                owl.find(".owl-item").eq(event.item.index).find(".animated").each(function () { $(this).addClass($(this).attr("data-animation")); });
            })
        }
    })
    $(".banner .owl-item").eq(2).find(".animated").each(function () { $(this).addClass($(this).attr("data-animation")); })
    $(window).scroll(function () {
        $(".animated").each(function () {
            if ($(this).offset().top - $(window).scrollTop() > $(window).height() - 80)
                $(this).removeClass($(this).attr("data-animation")); else
                $(this).addClass($(this).attr("data-animation"));
        })
        if ($(window).scrollTop() < 100) { $(".gotop").stop().hide(); }
        else { $(".gotop").stop().show(); }
    })
    $(".page5_owl .item:even").addClass("on")
    var page5_owl = $(".page5_owl").owlCarousel({ responsive: { 0: { items: 1, dots: true }, 600: { items: 2 }, 1000: { items: 3 } }, margin: 2, dots: false }); $(".page1_list ul,.page4_list ul").owlCarousel({ responsive: { 0: { items: 1, loop: true }, 600: { items: 2, center: true, loop: true }, 1000: { items: 3 } }, margin: 2, dots: false })
    $('.page5_cur .next').click(function () { page5_owl.trigger('next.owl.carousel'); })
    $('.page5_cur .prev').click(function () { page5_owl.trigger('prev.owl.carousel', [300]); })
    $(".menu_wrap").click(function () { $(this).parents(".header").toggleClass("fixed"); $(".menu_fixed").toggleClass("on"); })
    try {
        var img_owl = $(".img_owl .owl").owlCarousel({ items: 1, dots: false, loop: true })
        $('.span_prev').click(function () { img_owl.trigger('next.owl.carousel'); })
        $('.span_next').click(function () { img_owl.trigger('prev.owl.carousel', [300]); })
        $(".case_info_modal").hide(); $(".close").click(function () { $(".case_info_modal").stop().fadeOut(); })
    } catch (e) { }
    $(".page2_list li").click(function () { $(".case_info_modal").stop().fadeIn(); })
}); function font() { }
function resize() {
    var ht = $(window).height(); $(".case_info_modal .cont").css("max-height", $(window).height() - 80)
    $(".fp_modal .c_scolll").width($(window).width() * 0.8);
}