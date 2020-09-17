
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
        document.getElementById("isbn_code").innerHTML = data.codeResult.code;
        console.log(data.codeResult.code);
    });

    Quagga.onProcessed(function(data){
        if(data){
            console.log("I got some data");
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
