import JSZip from "jszip";
import { saveAs } from "file-saver";
import { generateHTML } from "./htmlTemplate";

export async function downloadZip(data) {
  const zip = new JSZip();

  const htmlContent = generateHTML(data);
  const fileName = `${data.productName.toLowerCase().replace(/\s/g, "-")}`;

  zip.file("index.html", htmlContent);

  // Optional: you could add style.css or favicon here
  // zip.file("style.css", "/* Add custom CSS here */");

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${fileName}-landing.zip`);
}
