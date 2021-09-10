import { html } from './js'

export const generateIndexHtml = () => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
      <title>Reapit Foundations App</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`
