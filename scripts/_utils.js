function getFromLocalStorage(key) {
  var item = localStorage.getItem("fv-" + key);
  return item ? item.replace("fv-", "") : "";
}

function setToLocalStorage(key, val) {
  localStorage.setItem("fv-" + key, val);
}

function getArrayOfNumbers(limit) {
  return Array.from(Array(limit + 1), function(_, x) {
    return x;
  });
}
