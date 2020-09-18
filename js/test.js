/**
 * function to initialize barcode scanner
 */
function startScanner(){
    // initialize barcode scanner
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
              //width: 640,
              //height: 480,
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

          //start barcode scanner
          Quagga.start();
      });

    // Register a function to be called when a barcode is detected
    Quagga.onDetected(function (data) {
        document.getElementById("isbn_code").innerHTML = data.codeResult.code;
        console.log(data.codeResult.code);
    });
}

/** 
 * function to stop barcode scanner
*/
function stopScanner(){
    Quagga.stop();
    Quagga.offDetected();
    console.log("Stop scanner");
}

/**
 * function to copy isbn_code to clipboard
 */
function copyToClipBoard(){
    navigator.clipboard.writeText(document.querySelector('#isbn_code').innerText);
    console.log("copy to clipboard");
}
