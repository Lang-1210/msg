
let switcher = document.getElementById('cb')
let html = document.querySelector('html')
let navBar = document.querySelector('.nav-bar')
let toTop = document.querySelector('.toTop')
if (localStorage.theme) {
    html.className = localStorage.theme
}
switcher.addEventListener('click', () => {
    if (switcher.checked) {
        html.className = 'black-theme'
        localStorage.setItem('theme', 'black-theme')
    } else {
        html.className = 'white-theme'
        localStorage.setItem('theme', 'white-theme')
    }
})

window.onscroll = function () {
    // 监听滚动条距离浏览器可视区顶部的距离
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // console.log(scrollTop);
    if (scrollTop >= 52) {
        navBar.classList.add('change')
    } else {
        navBar.classList.remove('change')
    }

}
