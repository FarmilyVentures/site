function getFromLocalStorage(key) {
  var item = localStorage.getItem("fv-" + key);
  return item.replace("fv-", "");
}

function setToLocalStorage(key, val) {
  localStorage.setItem("fv-" + key, val);
  console.log(getFromLocalStorage("fv-" + key));
}
