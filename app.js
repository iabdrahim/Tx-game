function game() {
  let ar = [
    "Group 8",
    "Group 9",
    "Group 10",
    "Group 11",
    "Group 12",
    "Group 14",
    "Group 15",
    "Group 16",
    "Group 19",
    "Group 20",
    "Group 21",
    "Group 22",
    "Group 24",
    "Group 25",
    "Group 26",
    "Rectangle 44",
  ];
  let box = document.querySelector(".box");
  let end = false;
  let delay = 1200;
  var audioLose = new Audio("/assest/mixkit-arcade-retro-game-over-213.wav");
  document.querySelectorAll(".box img").forEach((i) => i.remove());
  document.querySelectorAll(".lose").forEach((btn) => {
    btn.className = "btn";
  });
  if (localStorage.getItem("time")) {
    document.querySelector(
      ".best"
    ).textContent = `your best score is ${localStorage.getItem("time")}`;
  }

  const del = setInterval(() => {
    if (delay >= 0) {
      delay = delay - 200;
      console.log("delay");
    }
  }, 5000);
  const timer = setInterval(() => {
    if (document.querySelectorAll(".box img").length >= 5 || end) {
      lose();
    } else {
      let r = Math.random() * 16;
      let img = document.createElement("img");
      img.src = `/assest/${ar[Math.floor(r)]}.svg`;
      img.id = `${ar[Math.floor(r)]}`;
      img.className = "child";
      box.appendChild(img);
      document.querySelector(".light img").src = "/assest/Group 2.svg";
      setTimeout(() => {
        document.querySelector(".light img").src = "/assest/Group 1.svg";
      }, 470);
    }
  }, delay);

  document.addEventListener("click", (e) => {
    let h = document.querySelectorAll(".box img");
    let correct = false;
    if (e.target.className === "btn" && !end) {
      console.log("click");
      for (let i = 0; i < h.length; i++) {
        if (h[i].id === e.target.firstChild.nextElementSibling.id) {
          console.log("win");
          h[i].remove();
          correct = true;
          break;
        }
      }
      if (!correct) {
        lose();
      }
    } else if (e.target.parentElement.className === "btn" && !end) {
      for (let i = 0; i < h.length; i++) {
        if (h[i].id === e.target.id) {
          h[i].remove();
          correct = true;
          break;
        }
      }
      if (!correct) {
        lose();
      }
    }
  });

  let ms = 0;
  var interval = setInterval(function () {
    ms = ms + 1;
    document.getElementById("msc").textContent = `${ms}`;
  }, 100);

  function lose() {
    audioLose.play();
    end = true;
    clearInterval(interval);
    clearInterval(del);
    clearInterval(timer);
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.className = "lose";
    });
    let tim = document.querySelector("#msc").textContent;
    if (localStorage.getItem("time")) {
      if (parseInt(tim) >= parseInt(localStorage.getItem("time"))) {
        window.localStorage.setItem("time", `${tim}`);
        pop("win");
      } else {
        pop();
        return;
      }
    } else {
      window.localStorage.setItem("time", `${tim}`);
      pop();
    }
  }
}

game();
function pop(s) {
  document.querySelector("h3").textContent = "";
  document.querySelector(".restart").onclick = () => {
    if (s === "win") {
      document.querySelector("h3").textContent = "new best score";
    }
    document.querySelector(".pop").style.display = "none";
    document.querySelector(".game").style.opacity = "1";
    document.querySelector(".best").style.opacity = "1";

    game();
  };
  console.log(localStorage.getItem("time"));
  document.querySelector(".pop").style.display = "flex";
  document.querySelector(".game").style.opacity = "0.5";
  document.querySelector(".best").style.opacity = "0.5";
}
