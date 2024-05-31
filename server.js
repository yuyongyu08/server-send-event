var http = require("http");

http.createServer(function (req, res) {
  console.log("req.url: ", req.url);
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: connected! \n\n");
    res.write("data: " + (new Date()) + "\n\n");

    let times = 0;
    interval = setInterval(function () {
      res.write("data: yuyy " + (++times) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
      res.write("event: close\n");
      res.write("data: closed! " + (new Date()).toLocaleTimeString() + "\n\n");
      clearInterval(interval);
    }, false);
  }
}).listen(8848, "127.0.0.1");