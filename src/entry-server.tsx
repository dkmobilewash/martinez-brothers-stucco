import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import App from './App';

/**
 * Renders a route through the real React tree (Header, page, Footer).
 * Waits for onAllReady so lazy() pages are fully resolved in the output.
 */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    let errored: unknown = null;
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        if (errored) reject(errored);
        else resolve(html);
        cb();
      },
    });

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          errored = err;
          console.error(`SSR error rendering ${url}:`, err);
        },
      },
    );
  });
}
