window.onload = new function(){
    filterSelectionArt('_Recent');
    filterSelectionApps('_All');
}

function filterSelectionApps(filter) {
    var x, i
    x = document.getElementsByClassName("Apps-Card");

    if (filter == "_All") {
        filter = "";
    }
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "Apps-Card-Show");
        if (x[i].className.indexOf(filter) > -1) {
            addClass(x[i], "Apps-Card-Show");
        }
    }
}

function filterSelectionArt(filter) {
    var x, i
    x = document.getElementsByClassName("Art_Card");

    if (filter == "_All") {
        filter = "";
    }
    for (i = 0; i < x.length; i++) {
        addClass(x[i], "Art-Card-Show");
        if (x[i].className.indexOf(filter) > -1) {
            removeClass(x[i], "Art-Card-Show");
        }
    }
}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

$(document).on("click", ".Horizontal-Scroll > button", function () {
    var before = $('.Horizontal-Scroll button.Active-Tab');
    before.removeClass('Active-Tab');
    $(this).addClass('Active-Tab');
})

$('.next_tab').click(function(){
    $('button.Active-Tab').next('button').trigger('click');
    scroll("right");
});

$('.prev_tab').click(function(){
    $('button.Active-Tab').prev('button').trigger('click');
    scroll("left");
});

function scroll(direction){
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var container = document.getElementById('Horizontal_Scroll');
    scrollCompleted = 0;
    var slideVar = setInterval(function(){
        if(direction == 'right'){
            container.scrollLeft += width / 25.5;
        } else{
            container.scrollLeft -= width / 25.5;
        }
       
        scrollCompleted += 10;
        if(scrollCompleted >= 100){
            window.clearInterval(slideVar);
        }
    }, 15);
}
