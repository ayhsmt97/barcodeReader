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

          //start barcode scanner
          Quagga.start();
      });

    // Register a function to be called when a barcode is detected
    Quagga.onDetected(function (data) {
        if(checkDigit(data.codeResult.code)){
            document.getElementById("isbn_code").innerHTML = data.codeResult.code;
            console.log("Detected code : ", data.codeResult.code);
        }
        else{
            console.log("invalid value");
        }
    });
}
/**
 * check correctness by calculating check digit
 * @param  {string} code scanned isbn code
 * @return {boolean} Comparison result of calculated value and check digit
 */
function checkDigit(code){
    var calc = 0;
    var cd = code[code.length - 1];
    switch(code.length){
        // case ISBN-13
        case 13:
            for(var i = 0; i < code.length - 1; ++i){
                calc += parseInt(code[i]) * (1 + 2 * (i % 2));
            }
            calc = ((10 - (calc % 10))) % 10;
            break;
        //case ISBN-10
        case 10:
            // need to be implemented
            cd = 0;
            calc = 0;
        default:
            return false;
    }
    return (parseInt(cd) == calc);
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
