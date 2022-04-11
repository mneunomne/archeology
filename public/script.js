const socket = io.connect('http://localhost:3000');


const onTextSound = function (textSound) {
  console.log("textSound", textSound)
  text2Audio(textSound)
}

socket.on("textSound", onTextSound);