async function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 10);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function onVisible(element, callback) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

// Get webp
function getImg(input, ext) {
  let image = input.split(".");
  image.pop();
  return (image.join(".") + "." + ext);
}

//
function downloadPDF() {
  var fileName = "Resume.pdf";
  var mime = "application/pdf";
  var fileUrl= "https://raw.githubusercontent.com/sonicjhon1/sonicjhon1.github.io/main/assets/Resume.pdf";

  try {
    var save = document.createElement.bind(document, "a")();
    save.download = fileName;
    save.href = fileUrl;
    save.type = mime;
    save.target = "_self";
    save.click();
  } finally {
    URL.revokeObjectURL(fileUrl);
  }
}

// Count up funfact boxes edited by gemini
function countFun() {
  let funfactBoxes = document.querySelectorAll(".funfacts-box");
  funfactBoxes.forEach(funfactBox => {
    funfactBox.querySelectorAll(".counter").forEach(countNum => {
      // 1. Ambil target angka (1, 50, 20)
      var data_to = parseInt(countNum.getAttribute("data-to"));
      // 2. Ambil durasi animasi
      var duration = parseInt(countNum.getAttribute("data-time"));
      
      // 3. PAKSA angka di layar jadi 0 dulu sebelum animasi mulai
      var current_value = 0;
      countNum.innerText = current_value;

      // 4. Hitung kecepatan (durasi total dibagi target angka)
      // Kalau data_to nya kecil (seperti 1), kita kasih delay standar biar gak kecepatan
      var speed = data_to > 0 ? duration / data_to : duration;

      let counts = setInterval(function() {
        current_value++;
        countNum.innerText = current_value;

        // 5. Berhenti pas di target
        if (current_value >= data_to) {
          clearInterval(counts);
        }
      }, speed);
    });
  });
}

function mailTo() {
  let name = encodeURIComponent(document.getElementById('contact-name').value);
  let email = document.getElementById('contact-email').value;
  let subject = encodeURIComponent(document.getElementById('contact-subject').value);
  let message = encodeURIComponent(document.getElementById('contact-message').value);

  if (name && email && subject && message) {
    window.open("mailto:sonicjhon1@gmail.com?cc=&bcc=&subject=" + subject + "&body=" + message + "%0D%0A%0D%0AFrom%20" + name + "%0D%0A" + email, "_blank").focus();
  }
}