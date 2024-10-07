import html2pdf from 'html2pdf.js';

const generatePDF = (reportRef) => {
    const element = reportRef.current;

    const pdfOptions = {
      margin: 0,
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Create a new div element with the same structure
    const pdfContent = document.createElement('div');
    pdfContent.innerHTML = `
        <div style="text-align: center; width: 100%; padding: 20px; border-radius: 20px; background-color: rgba(255, 255, 255, 0.9);">
            ${element.innerHTML}
        </div>
    `;

    // Generate PDF
    html2pdf().from(pdfContent).set(pdfOptions).save();
  };

export default generatePDF;