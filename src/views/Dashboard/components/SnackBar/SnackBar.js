
export default function SnackBarMessage(msg) {
  var x = document.getElementById("snackbar");
  document.getElementById("snackbar").innerHTML = msg;
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}