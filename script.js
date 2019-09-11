"use strict";
document.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("input").addEventListener("input", selectColor);

  function selectColor(event) {
    let color = event.target.value;
    hexToRgb(color);
  }

  function hexToRgb(color) {
    let hex;
    if (color.substring(0, 1) == "#") {
      hex = color.substring(1);
    }
    const rgb = {};
    rgb.r = parseInt(hex.substring(0, 2), 16);
    rgb.g = parseInt(hex.substring(2, 4), 16);
    rgb.b = parseInt(hex.substring(4), 16);

    rgbToHsl(color, rgb);
  }

  function rgbToHsl(color, rgb) {
    const rgbConvert = {};
    rgbConvert.r = rgb.r;
    rgbConvert.g = rgb.g;
    rgbConvert.b = rgb.b;

    rgbConvert.r /= 255;
    rgbConvert.g /= 255;
    rgbConvert.b /= 255;

    let h, s, l;

    const min = Math.min(rgbConvert.r, rgbConvert.g, rgbConvert.b);
    const max = Math.max(rgbConvert.r, rgbConvert.g, rgbConvert.b);

    if (max === min) {
      h = 0;
    } else if (max === rgbConvert.r) {
      h = 60 * (0 + (rgbConvert.g - rgbConvert.b) / (max - min));
    } else if (max === rgbConvert.g) {
      h = 60 * (2 + (rgbConvert.b - rgbConvert.r) / (max - min));
    } else if (max === rgbConvert.b) {
      h = 60 * (4 + (rgbConvert.r - rgbConvert.g) / (max - min));
    }

    if (h < 0) {
      h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
      s = 0;
    } else {
      s = (max - l) / Math.min(l, 1 - l);
    }

    s *= 100;
    l *= 100;

    const hsl = `${Math.floor(h)}, ${Math.floor(s)}%, ${Math.floor(l)}%`;
    showSourceColor(color, rgb, hsl);
    convertColoHsl(2, hsl);
    convertColoHsl(3, hsl);
    convertColoHsl(4, hsl);
    convertColoHsl(5, hsl);

    function showSourceColor(color, rgb, hsl) {
      document.querySelector(".container1 .box").style.backgroundColor = color;
      document.querySelector(".hex-output").textContent = `HEX: ${color}`;
      document.querySelector(
        ".rgb-output"
      ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
      document.querySelector(".hsl-output").textContent = `HSL: ${hsl}`;
    }

    function showColor(id, h, s, l) {
      const colorId = id;
      let boxValue = document.querySelector(`.container${colorId} .box`).style
        .backgroundColor;

      console.log(boxValue);

      document.querySelector(
        `.container${colorId} .box`
      ).style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
      document.querySelector(
        `.container${colorId} .txt .rgb-output`
      ).textContent = boxValue;
      document.querySelector(
        `.container${colorId} .txt .hsl-output`
      ).innerHTML = `HSL: ${h}, ${s}, ${l}`;

      rgbToHex(id, boxValue);
    }

    function rgbToHex(colorId, boxValue) {
      boxValue = boxValue.split(",");
      console.log(boxValue);
      let r = boxValue[0].slice(4, 7);
      r = parseInt(r, 10);
      let g = boxValue[1].slice(1, 4);
      g = parseInt(r, 10);
      let b = boxValue[1].slice(1, 4);
      g = parseInt(b, 10);
      let rgb = {};
      rgb.r = r;
      rgb.g = g;
      rgb.b = b;
      console.log(rgb);

      let rgbToHex = function(rgb) {
        let hex = Number(rgb).toString(16);
        if (hex.length < 2) {
          hex = "0" + hex;
        }
        return hex;
      };

      console.log(rgbToHex(r));

      let colorHex = function(r, g, b) {
        let red = rgbToHex(r);
        let green = rgbToHex(g);
        let blue = rgbToHex(b);
        return red + green + blue;
      };
      document.querySelector(
        `.container${colorId} .txt .hex-output`
      ).textContent = `HEX: #${colorHex(r, g, b)}`;
    }

    function convertColoHsl(num, hsl) {
      let id = num;
      hsl = hsl.split(" ");
      let h = hsl[0].slice(0, -1);
      h = parseInt(h, 10);
      let s = hsl[1].slice(0, -1);
      s = parseInt(s, 10);
      let l = hsl[2].slice(0, -1);
      l = parseInt(l, 10);
      if (id === 1) {
        h = h - 60;
      } else if (id === 2) {
        h = h - 30;
      } else if (id === 3) {
        h = h += 9;
      } else if (id === 4) {
        h = h += 18;
      }
      showColor(id, h, s, l);
      hslToRgb(h, s, l);
      // console.log(hslToRgb(h, s, l));
    }

    function hslToRgb(h, s, l) {}
  }
}
