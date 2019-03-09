import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

export const downloadPDF = (screen, finish) => {
  let tables = screen.querySelectorAll(".screen-table");
  let doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [tables[0].offsetWidth + 16, tables[0].offsetHeight + 16]
  });
  const drawTable = on => {
    if (tables[on] != null) {
      let table = tables[on];
      let tableWidth = table.offsetWidth + 16;
      let tableHeight = table.offsetHeight + 16;
      domtoimage
        .toPng(table, {
          bgcolor: "#fff",
          width: tableWidth,
          height: tableHeight
        })
        .then(dataUrl => {
          if (on > 0) {
            doc.addPage([tableWidth, tableHeight], "landscape");
          }
          doc.addImage(dataUrl, "PNG", 20, 20);
          drawTable(++on);
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      doc.save("file.pdf");
      finish();
    }
  };
  if (tables.length > 0) {
    drawTable(0);
  }
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
