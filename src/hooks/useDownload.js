import { useState } from "react";

export default () => {
  const [progress, setProgress] = useState(0);

  function makeProgress({ loaded, total }) {
    return Math.round((loaded / total) * 100);
  }

  const downloadBlob = (blob, filename) => {
    // Create an object URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download";

    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", clickHandler);
      }, 150);
    };

    a.addEventListener("click", clickHandler, false);

    a.click();

    return a;
  };

  function startDownload(url, name) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + " " + response.statusText);
        }

        // ensure ReadableStream is supported
        if (!response.body) {
          throw Error("ReadableStream not yet supported in this browser.");
        }

        // store the size of the entity-body, in bytes
        const contentLength = response.headers.get("content-length");

        // ensure contentLength is available
        if (!contentLength) {
          throw Error("Content-Length response header unavailable");
        }

        // parse the integer into a base-10 number
        const total = parseInt(contentLength, 10);

        let loaded = 0;

        return new Response(
          // create and return a readable stream
          new ReadableStream({
            start(controller) {
              const reader = response.body.getReader();
              read();
              function read() {
                reader
                  .read()
                  .then(({ done, value }) => {
                    if (done) {
                      setProgress(0);
                      controller.close();
                      return;
                    }
                    loaded += value.byteLength;
                    setProgress(makeProgress({ loaded, total }));
                    controller.enqueue(value);
                    read();
                  })
                  .catch(error => {
                    console.error(error);
                    controller.error(error);
                  });
              }
            }
          })
        );
      })
      .then(res => res.blob())
      .then(blob => {
        downloadBlob(blob, name);
      });
  }

  return {
    progress,
    startDownload
  };
};
