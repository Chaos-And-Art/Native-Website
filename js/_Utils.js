//#region Back-Top Button and Header Catch
mybutton = document.getElementById("back-top");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function toTop() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
}

//#endregion

//#region Nav-Bar and Popups Control
var navContent = document.getElementById("Nav_Menu");

$(".Page_Content").click(function () {
    navContent.checked = false
});

////////////////////////////////////////////////////////////////////////////////

$(".Popups_Overlay").click(function () {
    $('.Popups_Overlay').css("opacity", "0")
    $('.Popups_Overlay').css("visibility", "hidden")
});

$(".Apple_Popup").click(function () {
    $('.Popup_Apple .Popups_Overlay').css("opacity", "1")
    $('.Popup_Apple .Popups_Overlay').css("visibility", "visible")
})

$(".Music_Popup").click(function () {
    $('.Popup_Music .Popups_Overlay').css("opacity", "1")
    $('.Popup_Music .Popups_Overlay').css("visibility", "visible")
})

$(".ImgOptions_Popup").click(function () {
    $('.Popup_ImgOptions .Popups_Overlay').css("opacity", "1")
    $('.Popup_ImgOptions .Popups_Overlay').css("visibility", "visible")
})

$(".Drawing-Popup").click(function () {
    $('.Popup-Drawings .Popups-Overlay').css("opacity", "1")
    $('.Popup-Drawings .Popups-Overlay').css("visibility", "visible")
})

$(".Painting-Popup").click(function () {
    $('.Popup-Paintings .Popups-Overlay').css("opacity", "1")
    $('.Popup-Paintings .Popups-Overlay').css("visibility", "visible")
})

$(".Patreon_Popup").click(function () {
    $('.Popup_Patreon .Popups_Overlay').css("opacity", "1")
    $('.Popup_Patreon .Popups_Overlay').css("visibility", "visible")
})

$(".Popup_Close").click(function () {
    $('.Popups_Overlay').css("opacity", "0")
    $('.Popups_Overlay').css("visibility", "hidden")
    $('.Popups-Overlay-Art').css("opacity", "0")
    $('.Popups-Overlay-Art').css("visibility", "hidden")
})

function confrimForm() {
    $('.Popup_Contact .Popups_Overlay').css("opacity", "1")
    $('.Popup_Contact .Popups_Overlay').css("visibility", "visible")
    setTimeout(function () {
        $('.Popup_Contact .Popups_Overlay').css("opacity", "0")
        $('.Popup_Contact .Popups_Overlay').css("visibility", "hidden")
    }, 4000);
}

//#endregion

document.addEventListener("DOMContentLoaded", function () {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    // var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    // lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });

        // var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
        //   entries.forEach(function (video) {
        //     if (video.isIntersecting) {
        //       for (var source in video.target.children) {
        //         var videoSource = video.target.children[source];
        //         console.log(videoSource.tagName)
        //         if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
        //           videoSource.src = videoSource.dataset.srsc;
        //         }
        //       }

        //       video.target.load();
        //       video.target.classList.remove("lazy");
        //       lazyVideoObserver.unobserve(video.target);
        //     }
        //   });
        // });

        // lazyVideos.forEach(function (lazyVideo) {
        //   lazyVideoObserver.observe(lazyVideo);
        // });
    }
});
