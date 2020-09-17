var isbn_code = document.getElementById("isbn_code");

Quagga.onDetected(function (data) {
    isbn_code.innerHTML = data.codeResult.code;
    console.log(data.codeResult.code);
});

Quagga.onProcessed(function(data){
    var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;
    if(data){
        if(data.boxes){
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            data.boxes.filter(function (box) {
                return box !== data.box;
            }).forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: "green",
                    lineWidth: 2
                });
            });
        }

        if (data.box) {
            Quagga.ImageDebug.drawPath(data.box, {
                x: 0,
                y: 1
            }, drawingCtx, {
                color: "#00F",
                lineWidth: 2
            });
        }

        if (data.codeResult && data.codeResult.code) {
            Quagga.ImageDebug.drawPath(data.line, {
                x: 'x',
                y: 'y'
            }, drawingCtx, {
                color: 'red',
                lineWidth: 3
            });
        }
    }
});

function startScanner(){
    Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#camera-area'),    // Or '#yourElement' (optional)
          constraints: {
              decodeBarCodeRate: 3,
              successTimeout: 500,
              codeRepetition: true,
              typeVertical: true,
              framaeRate: 15,
              width: 640,
              height: 480,
              facingMode: "environment"
          },
        },
        decoder : {
          readers : ["ean_reader"],
          debug :{
              drawBoundingBox: true,
              showFrequency: true,
              drawScanline: true,
              showPattern: true
          }
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();

          // Set flag to is running
          _scannerIsRunning = true;
      });

    Quagga.onDetected(function (data) {
        isbn_code.innerHTML = data.codeResult.code;
        console.log(data.codeResult.code);
    });

    Quagga.onProcessed(function(data){
        if(data){
            console.log("I can see somethig :)");
            if(data.codeResult)
                console.log(data.codeResult.code);
        }
        else
            console.log("i can't see anything :(");
    });
}

function stopScanner(){
    Quagga.stop();
    Quagga.offDetected();
    console.log("Stop scanner");
}
