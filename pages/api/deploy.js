import { generateHTML } from "../../lib/htmlTemplate";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const data = req.body;

  const vercelToken = process.env.VERCEL_TOKEN;
  const html = generateHTML(data);
  const fileName = "index.html";
  const projectName = `launchify-${Date.now()}`;

  const payload = {
    name: projectName,
    files: [
      {
        file: fileName,
        data: Buffer.from(html).toString("base64"),
        encoding: "base64",
      },
    ],
    projectSettings: {
      framework: null, // it's just HTML
    },
  };

  const deploy = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await deploy.json();

  if (json.error) {
    console.error("Deploy Error:", json.error);
    return res.status(500).json({ error: json.error.message });
  }

  return res.status(200).json({ url: `https://${json.url}` });
}
