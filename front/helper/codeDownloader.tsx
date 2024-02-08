export async function saveCode(code: string) {
  var textFileAsBlob = new Blob([code], { type: "text/plain" });
  var downloadlink = document.createElement("a");
  downloadlink.download = "code.cpp";
  downloadlink.innerHTML = "download code";
  if (window.webkitURL != null) {
    downloadlink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    downloadlink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadlink.style.display = "none";
    document.body.appendChild(downloadlink);
  }
  downloadlink.click();
}
