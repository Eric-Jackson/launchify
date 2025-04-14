import ReactDOMServer from 'react-dom/server';
import LandingPage from '../components/landing/LandingPage';

export function renderToHtml(form) {
  // Render the React component to static HTML
  const html = ReactDOMServer.renderToString(<LandingPage form={form} theme={form.theme} />);

  // Create the full HTML document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${form.title}</title>
  <link rel="stylesheet" href="styles.css" />
  <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
</head>
<body>
  <div id="root">${html}</div>
  <script>
    // Rehydrate the React app
    const root = document.getElementById('root');
    const form = ${JSON.stringify(form)};
    ReactDOM.hydrateRoot(root, React.createElement(LandingPage, { form, theme: form.theme }));
  </script>
</body>
</html>`;
} 