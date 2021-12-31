var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

onExploreButton = function () {
  if (width < 733) {
    $("html, body").animate({ scrollTop: height / 1.3 }, 1000);
    return false;
  }
  else {
    $("html, body").animate({ scrollTop: height / 1.1 }, 1000);
    return false;
  }
}

//#region Home_Background
var canvasDots = function () {
  var canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');

  const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);

  colorDot = `rgb(${r},${g},${b})`;
  if (isIOS) {
    color = `rgba(${r},${g},${b}, 0.3)`;
  } else {
    color = `rgba(${r},${g},${b}, 1)`;
  }

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = "100%"
  canvas.style.margin = 'auto';
  canvas.style.display = 'block';
  ctx.lineWidth = .1;
  ctx.fillStyle = colorDot;
  ctx.strokeStyle = color;
  ctx.globalCompositeOperation = 'destination-under';

  var mousePosition = {
    x: width / 2,
    y: height / 1.5
  };

  var dots = {
    nb: 100,
    distance: 60,
    d_radius: 50,
    array: []
  };

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random();
  }

  Dot.prototype = {
    create: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function () {
      for (i = 0; i < dots.nb; i++) {

        var dot = dots.array[i];

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function () {
      for (i = 0; i < dots.nb; i++) {
        for (j = 0; j < dots.nb; j++) {
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance) {
            if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (width > 1000) {
      dots.nb = width;
    } else {
      if (isIOS) {
        dots.nb = width / 1.1;
      } else {
        dots.nb = width;
      }
    }
    for (i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
      dot = dots.array[i];

      dot.create();
    }

    dot.line();
    dot.animate();
  }

  // Mouse Interaction Controls
  canvas.onmousedown = function () {
    dots.d_radius = 50
  }

  canvas.onmousemove = function (parameter) {
    mousePosition.x = parameter.pageX;
    mousePosition.y = parameter.pageY;

  }

  canvas.onmouseup = function () {
    dots.d_radius = width;
  }

  // Touch Interaction Controls
  function getTouches(evt) {
    return evt.touches ||
      evt.originalEvent.touches;
  }

  canvas.ontouchstart = function (evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    dots.d_radius = 50
    mousePosition.x = xDown;
    mousePosition.y = yDown - 100;
  };

  canvas.ontouchmove = function (e) {
    e.preventDefault();
    var i;
    for (i = 0; i < e.changedTouches.length; i++) {
      mousePosition.x = e.changedTouches[i].pageX;
      mousePosition.y = e.changedTouches[i].pageY - 100;
    }
  };

  canvas.ontouchend = function () {
    dots.d_radius = width;
  }

  setInterval(createDots, 15);
};

canvasDots();

window.onload = function(){
  startSliders();
}

//#endregion

var sliderArt = tns({
  container: ".Art_Slider",
  loop: true,
  autoplay: true,
  autoplayTimeout: 6000,
  autoplayButtonOutput: false,
  // lazyload: true,
  mouseDrag: true,
  controls: false,
  nav: false,
  items: 2,
  slideBy: 1,
  speed: 400,
  gutter: 10,
  responsive: {
    320: {
      items: 1.15,
      gutter: 10,
      center: true,
    },
    375: {
      items: 1.15,
      gutter: 10,
      center: true,
    },
    425: {
      items: 1.2,
      gutter: 10,
      center: true,
    },
    768: {
      items: 2,
      gutter: 10,
      center: false,
    },
    1024: {
      items: 3,
      gutter: 10,
      center: true,
    },
    1440: {
      items: 3,
      gutter: 10,
      center: true,
    },
    2560: {
      items: 5,
      gutter: 10,
      center: true,
    },
  }
});

var sliderApps = tns({
  container: ".Apps_Slider",
  loop: true,
  autoplay: true,
  autoplayTimeout: 6000,
  autoplayButtonOutput: false,
  // lazyload: true,
  mouseDrag: true,
  controls: false,
  nav: false,
  items: 2,
  slideBy: 1,
  speed: 400,
  gutter: 10,
  responsive: {
    320: {
      items: 1.15,
      gutter: 10,
      center: true,
    },
    375: {
      items: 1.15,
      gutter: 10,
      center: true,
    },
    425: {
      items: 1.2,
      gutter: 10,
      center: true,
    },
    768: {
      items: 2,
      gutter: 10,
      center: false,
    },
    1024: {
      items: 3.5,
      gutter: 10,
      center: true,
    },
    1440: {
      items: 4,
      gutter: 10,
      center: false,
    },
    2560: {
      items: 7,
      gutter: 10,
      center: true,
    },
  }
});
