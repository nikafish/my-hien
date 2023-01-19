const PRICES = [0, 130];
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "reset-all") {
      resetAll();
      return;
    }
    no = getLastString(item.id);
    type = getFirstString(item.id);
    let va = -1;
    if (type.toLowerCase() == "add") {
      va = 1;
    }
    let eleAmount = document.getElementById("td-amount-" + no);
    let numAmount = parseInt(eleAmount.innerText) + va;
    if (numAmount < 0) numAmount = 0;
    eleAmount.innerText = numAmount;
    setColorByAmount(no, numAmount);
    let price = document.getElementById("td-price-" + no);
    total = document.getElementById("td-total-" + no);
    total.innerText =
      splitCurrenciesByDot(
        (parseInt(parseCurrencies(price.innerText)) * numAmount) / 1000
      ) + "k";
    lastSum();
  };
});

function resetAll() {
    window.console.log("Resetting all----------------------------------------------------------------");
    let index = 1;
    let elmTotal = document.getElementById("td-total-" + index);
    while (elmTotal != null && elmTotal != undefined) {
        elmTotal.innerText = "0k"
        index++;
        elmTotal = document.getElementById("td-total-" + index);
    }
    index = 1;
    let elmAmount = document.getElementById("td-amount-" + index);
    while (elmAmount != null && elmAmount != undefined) {
      elmAmount.innerText = "0";
        setColorByAmount(index, 0);
      index++;
      elmAmount = document.getElementById("td-amount-" + index);
    }
    document.getElementById("last-sum").innerText = "0 đ";
}

function lastSum() {
  let index = 1;
  let elm = document.getElementById("td-total-" + index);
  let sum = 0;
  while (elm != null && elm != undefined) {
    let str = parseCurrencies(elm.innerText);
    sum += parseInt(str);
    index++;
    elm = document.getElementById("td-total-" + index);
  }
  let strSum = "" + splitCurrenciesByDot(sum) + " đ  ";
  document.getElementById("last-sum").innerText = strSum;
}

function setColorByAmount(row, amount) {
  row_id = "td-row-" + row;
  const elms = document.getElementsByClassName(row_id);
  if (elms == null || elms.length == 0) return;
  let str = "";
  for (let i = 0; i < elms.length; i++) {
    if (amount == 0) elms[i].setAttribute("style", "color:black;");
    else elms[i].setAttribute("style", "color:blue;");
  }
}

function splitCurrenciesByDot(num) {
  try {
    str = num + "";
    let count = 0;
    let result = "";
    for (var i = str.length - 1; i >= 0; i--) {
      count++;
      result = str.charAt(i) + result;
      if (count == 3 && i > 0) {
        result = "." + result;
        count = 0;
      }
    }
    return result;
  } catch (error) {
    return str;
  }
}

function parseCurrencies(str) {
  str = str.replace("k", "000");
  str = str.replace("K", "000");
  str = str.replace(".", "");
  return str;
}

function getLastString(id) {
  try {
    if (id != null && id != "" && id.length > 0) {
      for (var i = id.length - 1; i >= 0; i--) {
        if (id.charAt(i) == "-") {
          return id.slice(i + 1, id.length);
        }
      }
    }
    return id;
  } catch (error) {
    window.alert(error);
    return id;
  }
}

function getFirstString(id) {
  try {
    if (id != null && id != "" && id.length > 0) {
      for (var i = 0; i < id.length; i++) {
        if (id.charAt(i) == "-") {
          return id.slice(0, i);
        }
      }
    }
    return id;
  } catch (error) {
    window.alert(error);
    return id;
  }
}

function autoFillBGColor() {}
