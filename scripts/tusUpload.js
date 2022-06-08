const getExpiryDate = () => {
  let theDate = new Date();
  theDate.setHours(theDate.getHours() + 5);
  return theDate.toISOString();
};

function startUpload(file, chunkSize, endpoint) {
  const options = {
    endpoint: endpoint,
    chunkSize: chunkSize,
    metadata: {
      expiry: getExpiryDate(),
      maxDurationSeconds: 3600,
      name: file.name,
    },
    onError(error) {},
    onSuccess() {},
    onProgress(bytesUploaded) {
      const container = document.getElementById("progress-bar-container");
      const progressBar = document.getElementById("progress-bar-fill");
      const progressBarText = document.getElementById("progress-bar-percent");
      const progress = (bytesUploaded / file.size) * 100;

      container.style.display = "block";
      progressBar.style.width = progress + "%";
      progressBarText.innerHTML = Math.floor(progress) + "% Complete";
    },
  };

  let tusUpload = new tus.Upload(file, options);
  tusUpload.start();
}
