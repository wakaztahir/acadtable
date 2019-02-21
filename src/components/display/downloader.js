downloadPDF() {
    let screen = this.refs.screen;
    let doc = new jsPDF({ orientation: "landscape" });
    doc.fromHTML(screen);
    doc.save("file.pdf");
  }
  downloadPNG() {
    let screen = this.refs.screen;
    domtoimage
      .toPng(screen, { bgcolor: "#fff" })
      .then(function(dataUrl) {
        let link = document.createElement("a");
        link.href = dataUrl;
        link.download = "file.png";
        link.target = "_blank";
        link.click();
      })
      .catch(error => {
        console.error("Error converting to PNG Image");
      });
  }
  downloadJPEG() {
    let screen = this.refs.screen;
    domtoimage
      .toJpeg(screen, { bgcolor: "#fff" })
      .then(function(dataUrl) {
        let link = document.createElement("a");
        link.download = "file.jpeg";
        link.href = dataUrl;
        link.target = "_blank";
        link.click();
      })
      .catch(error => {
        console.error("Error converting to JPEG Image");
      });
  }
  componentDidUpdate() {
    if (this.state.download) {
      switch (this.state.downloadType) {
        case "pdf":
        default:
          this.downloadPDF();
          break;
        case "png":
          this.downloadPNG();
          break;
        case "jpeg":
          this.downloadJPEG();
          break;
      }
    }
  }