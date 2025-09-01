import { renderToPipeableStream } from 'react-dom/server';

export const createStreamingResponse = (App, props) => {
  return new Promise((resolve, reject) => {
    let didError = false;
    
    const stream = renderToPipeableStream(App(props), {
      onShellReady() {
        const body = new ReadableStream({
          start(controller) {
            stream.pipe({
              write(chunk) {
                controller.enqueue(new Uint8Array(chunk));
              },
              end() {
                controller.close();
              },
            });
          },
        });
        
        resolve(new Response(body, {
          headers: {
            'Content-Type': 'text/html',
            'Transfer-Encoding': 'chunked',
          },
        }));
      },
      onError(error) {
        didError = true;
        reject(error);
      },
    });
  });
};