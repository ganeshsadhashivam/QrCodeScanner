const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInp = form.querySelector("input"),
  infoText = form.querySelector("p"),
  copyBtn = wrapper.querySelector(".copy"),
  closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file) {
  infoText.innerText = "Scanning QR Code...";
  //sending post request to qr server api with passing
  // form data as body and getting response from it

  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldn't Scan OR Code";
      if (!result) return;
      wrapper.querySelector("textarea").innerText = result;
      timeout = setTimeout(() => {
        form.querySelector("img").src = URL.createObjectURL(file);
        console.log(timeout);
        clearTimeout(timeout);
      }, 500);
      console.log(result);
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan OR Code";
    });
}

fileInp.addEventListener("change", (e) => {
  //getting user selected file
  let file = e.target.files[0];
  if (!file) return;
  //creating a new FormData object
  let formData = new FormData();
  //adding selected file to formData
  formData.append("file", file);
  fetchRequest(formData, file);
  console.log(file);
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());

//closeButton

closeBtn.addEventListener("click", () => {
  timeout = setTimeout(() => {
    wrapper.classList.remove("active");
    console.log(timeout);
    clearTimeout(timeout);
  }, 200);
});
