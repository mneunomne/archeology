const socket = io.connect('http://localhost:3000');

const onTextSound = function (textSound) {
  console.log("textSound", textSound)
  text2Audio(textSound)
  const textEl = document.getElementById("text")
  textEl.innerText=textSound
}

socket.on("textSound", onTextSound);

