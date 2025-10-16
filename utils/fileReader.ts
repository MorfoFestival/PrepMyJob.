import * as pdfjs from 'pdfjs-dist';
import * as mammoth from 'mammoth';

// Set up the PDF.js worker dynamically to match the library version.
// This resolves the API version mismatch error.
// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = `https://aistudiocdn.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

export async function getTextFromFile(file: File): Promise<string> {
  if (file.type === 'application/pdf') {
    return readPdf(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return readDocx(file);
  } else {
    // Throw an error key for the component to translate.
    throw new Error('unsupportedError');
  }
}

async function readPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // Using Uint8Array is more robust for pdf.js
    const pdf = await pdfjs.getDocument(new Uint8Array(arrayBuffer)).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ');
    }
    return text;
  } catch (error) {
    console.error("Error reading PDF file:", error);
    throw new Error('pdfError');
  }
}

async function readDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("Error reading DOCX file:", error);
    throw new Error('docxError');
  }
}
