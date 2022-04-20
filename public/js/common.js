var circle = document.querySelector("#circle");

    var button = document.querySelector("#move");
    button.addEventListener("click", animate, false);

    var xPos = 0;

    function animate() {
      xPos += 10;

      circle.style.transform = `translate3d(${xPos}px, 0, 0)`;

      if (Math.abs(xPos) >= 900) {
        xPos = -500;
      }
    }