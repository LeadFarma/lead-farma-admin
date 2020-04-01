import { useState } from "react";

export default () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  function makeProgress({ loaded, total }) {
    return Math.round((loaded / total) * 100);
  }

  function startUpload(url, formData) {
    setProgress(0);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.upload.onprogress = p => {
      setProgress(makeProgress({ loaded: p.loaded, total: p.total }));
    };

    xhr.onreadystatechange = function() {
      // request completed?
      if (xhr.readyState !== 4) return;

      // setProgress(0);
      setStatus("done");

      if (xhr.status.toString().substring(0, 1) === "2") {
        // request successful - show response
        console.log(xhr.responseText);
      } else {
        // request error
        console.log("HTTP error", xhr.status, xhr.statusText);
      }
    };

    xhr.send(formData);
    setStatus("loading");
  }

  return {
    progress,
    startUpload,
    status
  };
};
