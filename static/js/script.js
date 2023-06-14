const TC = "celcius";
const TF = "fahrenheit";
const TK = "kelvin";
var firstUnit = TC;
var secondUnit = TF;
var firstValue = 0.0;
var secondValue = 0.0;
var backgroundLessthan0 = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff
    )!important;`;
var backgroundfrom0to20 = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),
    rgb(0, 170, 255),#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff,#fff
    )!important;`;
var backgroundfrom21to55 = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),
    rgb(0, 170, 255),
    #68d7f0,
    rgb(228, 226, 135),
    rgb(250, 242, 88),#fff,#fff,#fff,#fff,#fff,#fff,#fff
    )!important;`;
var backgroundfrom56to120 = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),
    rgb(0, 170, 255),
    #68d7f0,
    rgb(228, 226, 135),
    rgb(250, 242, 88),
    rgb(250, 232, 41),
    #f1cf3a,#fff,#fff,#fff,#fff,#fff
    )!important;`;
var backgroundfrom121to320 = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),
    rgb(0, 170, 255),
    #68d7f0,
    rgb(228, 226, 135),
    rgb(250, 242, 88),
    rgb(250, 232, 41),
    #f1cf3a,
    rgb(255, 208, 0),#fff,#fff,#fff,#fff
    )!important;`;
var backgroundfrom320to700 = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),
    rgb(0, 170, 255),
    #68d7f0,
    rgb(228, 226, 135),
    rgb(250, 242, 88),
    rgb(250, 232, 41),
    #f1cf3a,
    rgb(255, 208, 0),
    rgb(255, 183, 0),
    rgb(255, 98, 0),#fff,#fff
    )!important;`;
var backgroundfrom701toextreme = `background: linear-gradient(
    to right,
    #00f,
    rgb(0, 98, 255),
    rgb(0, 170, 255),
    #68d7f0,
    rgb(228, 226, 135),
    rgb(250, 242, 88),
    rgb(250, 232, 41),
    #f1cf3a,
    rgb(255, 208, 0),
    rgb(255, 183, 0),
    rgb(255, 98, 0),
    #f41b10,
    #f00
    )!important;`;

function print(value) {
  console.log(value);
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
function fahrenheitToKelvin(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}
function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}
function TemperatureConverter() {
  if (firstUnit == TC && secondUnit == TF) {
    return celsiusToFahrenheit(firstValue);
  } else if (firstUnit == TC && secondUnit == TK) {
    return celsiusToKelvin(firstValue);
  } else if (firstUnit == TF && secondUnit == TC) {
    return fahrenheitToCelsius(firstValue);
  } else if (firstUnit == TF && secondUnit == TK) {
    return fahrenheitToKelvin(firstValue);
  } else if (firstUnit == TK && secondUnit == TC) {
    return kelvinToCelsius(firstValue);
  } else if (firstUnit == TK && secondUnit == TF) {
    return kelvinToFahrenheit(firstValue);
  } else {
    print("error in temperature calculation");
    return 0;
  }
}
firstInput = document.getElementById("firstInput");
lastInput = document.getElementById("lastInput");
convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", (e) => {
  firstValue = firstInput.value;
  secondValue = TemperatureConverter();
  lastInput.value = secondValue;
  ProgressBar();
});

resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", (e) => {
  firstUnit = TC;
  secondUnit = TF;
  firstValue = 0.0;
  secondValue = 0.0;
  progress.setAttribute("style", "background: #fff!important;");
  displayer.innerText = ".";
  unit1.innerText = TC;
  unit2.innerText = TF;
  firstInput.value = "";
  lastInput.value = "";
});

unit1 = document.getElementById("selector1");
unit2 = document.getElementById("selector2");
unit1.addEventListener("click", (e) => {
  var unit1Value = unit1.innerText.toLowerCase();
  var unit2Value = unit2.innerText.toLowerCase();
  if (unit1Value == TC && unit2Value == TF) {
    unit1.innerText = TK;
    firstUnit = TK;
  } else if (unit1Value == TC && unit2Value == TK) {
    unit1.innerText = TF;
    firstUnit = TF;
  } else if (unit1Value == TF && unit2Value == TK) {
    unit1.innerText = TC;
    firstUnit = TC;
  } else if (unit1Value == TF && unit2Value == TC) {
    unit1.innerText = TK;
    firstUnit = TK;
  } else if (unit1Value == TK && unit2Value == TF) {
    unit1.innerText = TC;
    firstUnit = TC;
  } else if (unit1Value == TK && unit2Value == TC) {
    unit1.innerText = TF;
    firstUnit = TF;
  } else {
    print("error in temperature calculation");
  }
});

unit2.addEventListener("click", (e) => {
  var unit1Value = unit1.innerText.toLowerCase();
  var unit2Value = unit2.innerText.toLowerCase();
  if (unit2Value == TC && unit1Value == TF) {
    unit2.innerText = TK;
    secondUnit = TK;
  } else if (unit2Value == TC && unit1Value == TK) {
    unit2.innerText = TF;
    secondUnit = TF;
  } else if (unit2Value == TF && unit1Value == TK) {
    unit2.innerText = TC;
    secondUnit = TC;
  } else if (unit2Value == TF && unit1Value == TC) {
    unit2.innerText = TK;
    secondUnit = TK;
  } else if (unit2Value == TK && unit1Value == TF) {
    unit2.innerText = TC;
    secondUnit = TC;
  } else if (unit2Value == TK && unit1Value == TC) {
    unit2.innerText = TF;
    secondUnit = TF;
  } else {
    print("error in temperature calculation");
  }
});

progress = document.getElementById("progress");
displayer = document.getElementById("displayer");
function ProgressBar() {
  var temp = 0;
  if (secondUnit == TF) {
    temp = parseInt(String(fahrenheitToCelsius(secondValue)));
  } else if (secondUnit == TK) {
    temp = parseInt(String(kelvinToCelsius(secondUnit)));
  } else {
    temp = secondValue;
  }
  if (temp < 0) {
    displayer.innerText = "Extreme Colder State";
    progress.setAttribute("style", backgroundLessthan0);
  } else if (temp < 20) {
    displayer.innerText = "Cold State";
    progress.setAttribute("style", backgroundfrom0to20);
  } else if (temp < 55) {
    displayer.innerText = "Tolerable Temperature State";
    progress.setAttribute("style", backgroundfrom21to55);
  } else if (temp < 120) {
    displayer.innerText = "Hot State";
    progress.setAttribute("style", backgroundfrom56to120);
  } else if (temp < 320) {
    displayer.innerText = "Too Hot State";
    progress.setAttribute("style", backgroundfrom121to320);
  } else if (temp < 700) {
    displayer.innerText = "Extreme Hot State";
    progress.setAttribute("style", backgroundfrom320to700);
  } else if (temp > 700) {
    displayer.innerText = "Industrial Usage Temp";
    progress.setAttribute("style", backgroundfrom701toextreme);
  } else {
    displayer.innerText = ".";
    progress.setAttribute("style", "#1d1d1d");
  }
}
