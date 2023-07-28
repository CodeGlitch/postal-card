//migrate code to pdfInterop.js

//window.jsPDF = window.jspdf.jsPDF;
window.createPdf = (base64Image) => {
    const { jsPDF } = window.jspdf;

    // A6 landscape dimensions
    const widthA6 = 148;
    const heightA6 = 105;
    const margin = 5;  // 5mm margin for all sides

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [widthA6, heightA6]
    });

    const img = new Image();
    img.src = "data:image/png;base64," + base64Image;
    img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Calculate aspect ratio
        const aspectRatio = imgWidth / imgHeight;

        // Adjust for margins and then calculate dimensions to fit within A6 landscape
        let newWidth = widthA6 - 2 * margin;
        let newHeight = newWidth / aspectRatio;

        if (newHeight > (heightA6 - 2 * margin)) {
            newHeight = heightA6 - 2 * margin;
            newWidth = newHeight * aspectRatio;
        }

        const xPosition = (widthA6 - newWidth) / 2;  // Center image horizontally
        const yPosition = (heightA6 - newHeight) / 2;  // Center image vertically

        doc.addImage(base64Image, 'JPEG', xPosition, yPosition, newWidth, newHeight);

        doc.save('Postcard.pdf');
    };
}
