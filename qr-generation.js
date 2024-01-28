import QRCode from "qrcode";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const data = "google.com"; // modify

// prompt
rl.question("Do you want to export or print a QR code: ", choice => {
  switch (choice.toLocaleLowerCase().trim()) {
    case "export":
      rl.question(
        "What format do you want to export the QR as, svg or png? ",
        type => exportQR(type)
      );
      break;
    case "print":
      console.log("printing...");
      printQR();
      break;
    default:
      console.log(
        `ERROR COULD NOT UNDERSTAND {${choice}} PLEASE MAKE SURE ITS EITHER EXPORT OR PRINT`
      );
      rl.close();
  }
});

function printQR() {
  QRCode.toString(data, (err, qr) => {
    if (err) throw err;

    console.log(qr);
    rl.close();
  });
}

function exportQR(fileType) {
  let format;

  switch (fileType.toLocaleLowerCase().trim()) {
    case "svg":
      format = "svg";
      break;
    case "png":
      format = "png";
      break;
    default:
      console.log(
        `COULD NOT UNDERSTAND {${fileType}} PLEASE MAKE SURE ITS EITHER PNG OR SVG`
      );
      rl.close();
  }

  QRCode.toFile(`QR.${format}`, data, (err, qr) => {
    if (err) throw err;

    console.log(`Exporting QR to current directory as QR.${format}`);
    rl.close();
  });
}

// on close
rl.on("close", () => {
  console.log("\nEnding session...");
  process.exit(0);
});
