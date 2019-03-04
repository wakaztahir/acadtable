import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

export const downloadPDF = (screen, finish) => {
  let screenFilter = document.createElement("style");

  let tables = screen.querySelectorAll(".screen-table");
  let doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [tables[0].offsetWidth + 64, tables[0].offsetHeight + 64]
  });
  let done = 0;
  tables.forEach(table => {
    domtoimage
      .toPng(table, {
        bgcolor: "#fff",
        width: table.offsetWidth + 64,
        height: table.offsetHeight + 64
      })
      .then(dataUrl => {
        if (done !== 0) {
          doc.addPage(
            [table.offsetWidth + 64, table.offsetHeight + 64],
            "landscape"
          );
        }
        doc.addImage(dataUrl, "PNG", 0, 0);
      })
      .then(() => {
        if (done < tables.length - 1) {
          done++;
        } else {
          doc.save("file.pdf");
          finish();
          screenFilter.innerHTML = "";
        }
      })
      .catch(ex => {
        console.log(ex);
      });
  });
};
export const downloadPNG = (screen, finish) => {
  domtoimage
    .toPng(screen, { bgcolor: "#fff" })
    .then(function(dataUrl) {
      let link = document.createElement("a");
      link.href = dataUrl;
      link.download = "file.png";
      link.target = "_blank";
      link.click();
      finish();
    })
    .catch(error => {
      console.error("Error converting to PNG Image");
    });
};
export const downloadJPEG = (screen, finish) => {
  domtoimage
    .toJpeg(screen, { bgcolor: "#fff" })
    .then(function(dataUrl) {
      let link = document.createElement("a");
      link.download = "file.jpeg";
      link.href = dataUrl;
      link.target = "_blank";
      link.click();
      finish();
    })
    .catch(error => {
      console.error("Error converting to JPEG Image");
    });
};
