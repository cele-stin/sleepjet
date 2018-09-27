// Math //
function toInt(n) {
   return Math.round(Number(n));
}


$("#logo").click(function() {
  $("#jet").toggleClass('jet-takeoff jet-landing');
  $("#moon").toggleClass('moon-takeoff moon-landing');
});


/* VOLUME */

var mediaClipNoise = document.getElementById("audio-noise");
var mediaClipActivity = document.getElementById("audio-activity");


//initial play//
var isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    mediaClipNoise.pause()
  } else {
    mediaClipNoise.play();
  }
  if (isPlaying) {
    mediaClipActivity.pause()
  } else {
    mediaClipActivity.play();
  }
};

mediaClipNoise.onplaying = function() {
  isPlaying = true;
};
mediaClipNoise.onpause = function() {
  isPlaying = false;
};
mediaClipActivity.onplaying = function() {
  isPlaying = true;
};
mediaClipActivity.onpause = function() {
  isPlaying = false;
};



//initial volume//
mediaClipNoise.volume = document.getElementById("noise-slider").value;
mediaClipActivity.volume = document.getElementById("activity-slider").value;

// Noise: Volume Update on Slide //
addEventListener("mousemove", function() {
   mediaClipNoise.volume = document.getElementById("noise-slider").value;
});

// Activity: Volume Update on Slide//
addEventListener("mousemove", function() {
   mediaClipActivity.volume = document.getElementById("activity-slider").value;
});

// Activity: Feedback Update Text on Slide//
function activityFunction() {
   addEventListener("mousemove", function() {
      document.getElementById("feedback").innerHTML =
         "Cabin Volume: " + toInt(mediaClipActivity.volume * 100) + "%";
   });
}

// Noise: Feedback Update Text on Slide//
function noiseFunction() {
   addEventListener("mousemove", function() {
      document.getElementById("feedback").innerHTML =
         "Noise Volume: " + toInt(mediaClipNoise.volume * 100) + "%";
   });
}

/*Feedback Fade */

$(document).ready(function() {
   $("#feedback")
      .stop(true, true)
      .fadeOut(4000);
});

function feedbackFadeIn() {
   $("#feedback")
      .stop(true, true)
      .fadeIn(100);
}

function feedbackFadeOut() {
   $("#feedback")
      .stop(true, true)
      .fadeOut(500);
}

/* SKY GRADIENT */
var darkColors = new Array(
   [6, 4, 99],
   [9, 32, 63],
   [45, 175, 230],
   [14, 4, 84],
   [45, 175, 230],
   [43, 88, 118],
   [20, 30, 68],
   [20, 30, 48]
);

var lightColors = new Array(
   [173, 15, 149],
   [229, 87, 0],
   [251, 194, 235],
   [252, 194, 235],
   [199, 234, 253],
   [118, 75, 162],
   [20, 30, 68],
   [194, 3, 17]
);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.0005;

function updateGradient() {
   if ($ === undefined) return;

   var c0_0 = darkColors[colorIndices[0]];
   var c0_1 = darkColors[colorIndices[1]];
   var c1_0 = darkColors[colorIndices[2]];
   var c1_1 = darkColors[colorIndices[3]];

   var ligthC0_0 = lightColors[colorIndices[0]];
   var ligthC0_1 = lightColors[colorIndices[1]];
   var ligthC1_0 = lightColors[colorIndices[2]];
   var ligthC1_1 = lightColors[colorIndices[3]];

   var istep = 1 - step;
   var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
   var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
   var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
   var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

   var r2 = Math.round(istep * ligthC1_0[0] + step * ligthC1_1[0]);
   var g2 = Math.round(istep * ligthC1_0[1] + step * ligthC1_1[1]);
   var b2 = Math.round(istep * ligthC1_0[2] + step * ligthC1_1[2]);
   var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

   $("#window")
      .css({
         background:
            "radial-gradient(circle farthest-corner at 0% 100% , " +
            color2 +
            " , " +
            color1 +
            "  95%)"
      })
      .css({
         background:
            "-webkit-radial-gradient(circle farthest-corner at 0% 100% , " +
            color2 +
            " , " +
            color1 +
            "  95%)"
      });

   step += gradientSpeed;
   if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] =
         (colorIndices[1] +
            Math.floor(1 + Math.random() * (darkColors.length - 1))) %
         darkColors.length;
      colorIndices[3] =
         (colorIndices[3] +
            Math.floor(1 + Math.random() * (darkColors.length - 1))) %
         darkColors.length;
   }
}

setInterval(updateGradient, 10);


