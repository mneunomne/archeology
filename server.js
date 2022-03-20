const express = require('express')
const { Server } = require("socket.io");
const http = require('http')

const PORT = process.env.PORT || 3000
const app = express()

const server = http.Server(app);
app.use(express.static('public'))

const alphabet = "撒健億媒間増感察総負街時哭병体封列効你老呆安发は切짜확로감外年와모ゼДが占乜산今もれすRビコたテパアEスどバウПm가бうクん스РりwАêãХйてシжغõ小éजভकöলレ入धबलخFসeवমوযиथशkحくúoनবएদYンदnuনمッьノкتبهtт一ادіاгرزरjvةзنLxっzэTपнлçşčतلイयしяトüषখথhцहیরこñóহリअعसमペيフdォドрごыСいگдとナZকইм三ョ나gшマで시Sقに口س介Иظ뉴そキやズВ자ص兮ض코격ダるなф리Юめき宅お世吃ま来店呼설진음염론波密怪殺第断態閉粛遇罩孽關警"

// socket.io
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("detections", detections => {
    socket.broadcast.emit("detections",
      detections.map((detection) => {
        return {
          x: detection[0],
          y: detection[1],
          w: detection[2],
          h: detection[3],
          id: detection[4],
          char: alphabet.charAt(detection[4]),
        }
      })
    )
  })
});

// setting the server to run on port 3000
server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}...`)
})