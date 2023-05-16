$(document).ready(function () {
    $(".calc-buttons").click(function () {
        let input = $(this).text();
        let calculations = $("#user-operations").text();
        if (input.toLowerCase() == "ac") {
            $("#user-operations").text("");
            $("#result").text("");
            // reset num1, num2, operator, and total
            num1 = "";
            num2 = "";
            operator = "";
            total = "";
        } else if (input.toLowerCase() == "del") {
            $("#user-operations").text(calculations.slice(0, -1));
            // remove the last character from num1 or num2
            if (num2 !== "") {
                num2 = num2.slice(0, -1);
            } else if (operator !== "") {
                operator = "";
            } else if (num1 !== "") {
                num1 = num1.slice(0, -1);
            }
        } else if (input == "=") {
            // evaluate the expression and update total and result
            handleTotal();
            if (result !== "" && num2 === "") {
                $("#user-operations").text(total);
            } else {
                $("#result").text(total);
            }
        } else if (input === ".") {
            if ((operator === "" && !num1.includes(".")) || (operator !== "" && !num2.includes("."))) {
                $("#user-operations").append(input);
                // add the decimal point to num1 or num2
                if (operator === "") {
                    num1 += input;
                } else {
                    num2 += input;
                }
            }
        } else if (input == "%") {
            // calculate the percentage and update num2
            total = percentage();
            $("#user-operations").text(num1 + operator + num2);
        } else if (input == "+" || input == "-" || input == "*" || input == "/") {
            if (num1 !== "" && num2 === "" && operator === "") {
                // update the operator if only num1 has been entered
                operator = input;
                $("#user-operations").append(input);
            } else if (num1 === "" && num2 === "" & operator === "") {
                num1 = 0;
                if (!isNaN(input)) {
                    num1 += parseFloat(input);
                }
            }  else if (num1 !== "" && num2 === "" && operator !== "") {
                // replace the previous operator with the new one
                operator = input;
                calculations = calculations.slice(0, -1) + input;
                $("#user-operations").text(calculations);
            } else if (num1 !== "" && num2 !== "") {
                // evaluate the expression and update num1, num2, operator, and result
                handleTotal();
                num1 = total.toString();
                num2 = "";
                operator = input;
                $("#user-operations").text(num1 + operator);
                $("#result").text(total);
            }
        } else {
            // handle numeric inputs
            $("#user-operations").append(input);
            if (operator === "") {
                num1 += input;
            } else {
                num2 += input;
            }
        }
    });
});


$(document).ready(function () {
    $(".calc-buttons").keydown(function (e) {
        let out, ex = e.keyCode || e.which;
        let input = $(this).text();
        let calculations = $("#user-operations").text();
        if (e.key == "Delete") {
            $("#user-operations").text("");
            $("#result").text("");
            // reset num1, num2, operator, and total
            num1 = "";
            num2 = "";
            operator = "";
            total = "";
        } else if (e.key == "Backspace") {
            $("#user-operations").text(calculations.slice(0, -1));
            // remove the last character from num1 or num2
            if (num2 !== "") {
                num2 = num2.slice(0, -1);
            } else if (operator !== "") {
                operator = "";
            } else if (num1 !== "") {
                num1 = num1.slice(0, -1);
            }
        } else if (e.key == "Enter") {
            // evaluate the expression and update total and result
            handleTotal();
            if (result !== "" && num2 === "") {
                $("#user-operations").text(total);
            } else {
                $("#result").text(total);
            }
        } else if (e.key == ".") {
            if ((operator === "" && !num1.includes(".")) || (operator !== "" && !num2.includes("."))) {
                $("#user-operations").append(input);
                // add the decimal point to num1 or num2
                if (operator === "") {
                    num1 += input;
                } else {
                    num2 += input;
                }
            }
        } else if (e.key == "%") {
            // calculate the percentage and update num2
            total = percentage();
            $("#user-operations").text(num1 + operator + num2);
        } else if (e.key == "add" || e.key == "subtract" || e.key == "multiply " || e.key == "divide ") {
            if (num1 !== "" && num2 === "" && operator === "") {
                // update the operator if only num1 has been entered
                operator = input;
                $("#user-operations").append(input);
            } else if (num1 === "" && num2 === "" & operator === "") {
                num1 = 0;
                if (!isNaN(input)) {
                    num1 += parseFloat(input);
                }
            }  else if (num1 !== "" && num2 === "" && operator !== "") {
                // replace the previous operator with the new one
                operator = input;
                calculations = calculations.slice(0, -1) + input;
                $("#user-operations").text(calculations);
            } else if (num1 !== "" && num2 !== "") {
                // evaluate the expression and update num1, num2, operator, and result
                handleTotal();
                num1 = total.toString();
                num2 = "";
                operator = input;
                $("#user-operations").text(num1 + operator);
                $("#result").text(total);
            }
        } else {
            // handle numeric inputs
            $("#user-operations").append(input);
            if (operator === "") {
                num1 += input;
            } else {
                num2 += input;
            }
        }
    });
});

let num1 = "";
let num2 = "";
let operator = "";
let total = "";

function handleTotal() {
    switch (operator) {
        case "+":
            total = +num1 + +num2;
            break;
        case "-":
            total = +num1 - +num2;
            break;
        case "/":
            total = +num1 / +num2;
            break;
        case "*":
            total = +num1 * +num2;
            break;
    }
}

function percentage() {
    let percent;
    if (total !== "" && num2 === "") {
        percent = +total / 100;
        total = percent.toString();
        $("#result").text(total);
    } else if (num2 !== "" && operator !== "") {
        percent = +num2 / 100;
        num2 = percent.toString();
        $("#user-operations").text(num1 + operator + num2);
    } else {
        percent = +num1 / 100;
        num1 = percent.toString();
        $("#user-operations").text(num1 + operator);
    }
    return percent;
}



