//window.jsPDF = window.jspdf.jsPDF;
//    img.src = "data:image/png;base64," + base64Image;

//V4
//window.createPdf = (base64Image, backgroundBase64) => {
window.createPdf = (base64Image, color) => {
    const { jsPDF } = window.jspdf;

    // A6 portrait dimensions
    const widthA6 = 105;
    const heightA6 = 148;
    const margin = 5;  // 5mm margin for all sides

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [widthA6, heightA6]
    });

    // Add the background first
    //doc.addImage(backgroundBase64, 'JPEG', 0, 0, widthA6, heightA6);


    const img = new Image();
    img.src = "data:image/png;base64," + base64Image;

    img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        let newWidth, newHeight, xPosition, yPosition, doc;

        // Check if image is landscape
        if (imgWidth > imgHeight) {
            // Create a landscape-oriented A6 paper
            doc = new jsPDF({ unit: 'mm', orientation: 'landscape', format: 'a6' });  // A6 Landscape

            const scale = Math.min((148 - 2 * margin) / imgWidth, (105 - 2 * margin) / imgHeight);
            newWidth = scale * imgWidth;
            newHeight = scale * imgHeight;

            xPosition = (148 - newWidth) / 2;
            yPosition = (105 - newHeight) / 2;

        } else {
            // Create a portrait-oriented A6 paper
            doc = new jsPDF({ unit: 'mm', orientation: 'portrait', format: 'a6' });  // A6 Portrait

            const scale = Math.min((105 - 2 * margin) / imgWidth, (148 - 2 * margin) / imgHeight);
            newWidth = scale * imgWidth;
            newHeight = scale * imgHeight;

            xPosition = (105 - newWidth) / 2;
            yPosition = (148 - newHeight) / 2;
        }

        // Drawing striped background
        const stripeHeight = 5;  // in mm
        const pageCount = doc.internal.getNumberOfPages(); // get total number of pages

        for (let page = 1; page <= pageCount; page++) {
            doc.setPage(page);

            for (let y = 0; y < doc.internal.pageSize.height; y += 2 * stripeHeight) {
                //doc.setFillColor(255, 0, 255);  // Magenta (Pinkish-purple)
                doc.setFillColor(color);
                //doc.setFillColor(255, 0, 0); // Red
                doc.rect(0, y, doc.internal.pageSize.width, stripeHeight, 'F');
            }
        }

        doc.addImage(base64Image, 'JPEG', xPosition, yPosition, newWidth, newHeight);
        doc.save('Postcard.pdf');

    };
}


function adjustOrientation() {
    const image = document.getElementById("postcardImage");
    const postcardDiv = document.getElementById("postcardDiv");

    // Check image orientation
    if (image.width > image.height) {
        // Landscape
        postcardDiv.style.width = "148mm";
        postcardDiv.style.height = "105mm";
    } else {
        // Portrait or square
        postcardDiv.style.width = "105mm";
        postcardDiv.style.height = "148mm";
    }
}