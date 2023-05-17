$(document).ready(function () {
    $(".calc-buttons").on("keydown", "click", function (e) {
        let input = $(this).text();
        let keyBoardInput = e.key;
        let calculations = $("#user-operations").text();
        let allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "*", "%", ".", "Delete", "Backspace", "Enter"];
        if (!allowedKeys.includes(keyBoardInput)) {
            return;
        } else if (input.toLowerCase() == "ac" || keyBoardInput == "Delete") {
            $("#user-operations").text("");
            $("#result").text("");
            // reset num1, num2, operator, and total
            num1 = "";
            num2 = "";
            operator = "";
            total = "";
        } else if (input.toLowerCase() == "del" || keyBoardInput == "Backspace") {
            $("#user-operations").text(calculations.slice(0, -1));
            // remove the last character from num1 or num2
            if (num2 !== "") {
                num2 = num2.slice(0, -1);
            } else if (operator !== "") {
                operator = "";
            } else if (num1 !== "") {
                num1 = num1.slice(0, -1);
            }
        } else if (input == "=" || keyBoardInput == "Enter") {
            // evaluate the expression and update total and result
            handleTotal();
            if (result !== "" && num2 === "") {
                $("#user-operations").text(total);
            } else {
                $("#result").text(total);
            }
        } else if (input == "." || keyBoardInput == ".") {
            if ((operator == "" && !num1.includes(".")) || (operator !== "" && !num2.includes("."))) {
                $("#user-operations").append(input);
                // add the decimal point to num1 or num2
                if (operator === "") {
                    num1 += input;
                } else {
                    num2 += input;
                }
            }
        } else if (input == "%" || keyBoardInput == "%") {
            // calculate the percentage and update num2
            total = percentage();
            $("#user-operations").text(num1 + operator + num2);
        } else if (input == "+" || input == "-" || input == "*" || input == "/" || keyBoardInput == "+" || keyBoardInput == "-" || keyBoardInput == "*" || keyBoardInput == "/") {
            if (num1 !== "" && num2 == "" && operator == "") {
                // update the operator if only num1 has been entered
                operator = input;
                $("#user-operations").append(input);
            } else if (num1 == "" && num2 == "" & operator == "") {
                num1 = 0;
                if (!isNaN(input)) {
                    num1 += parseFloat(input);
                }
            } else if (num1 !== "" && num2 == "" && operator !== "") {
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
            if (operator == "") {
                num1 += input;
            } else {
                num2 += input;
            }
        }
    });
});


// $(document).ready(function () {
//     $(".calc-buttons").keydown(function (e) {
//         let input = e.key;
//         let calculations = $("#user-operations").text();
//         let allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "/", "*", "%", ".", "Delete", "Backspace", "Enter"];
//         if (!allowedKeys.includes(input)) {
//             return;
//         } else if (input === "Delete") {
//             $("#user-operations").text("");
//             $("#result").text("");
//             // reset num1, num2, operator, and total
//             num1 = "";
//             num2 = "";
//             operator = "";
//             total = "";
//         } else if (input === "Backspace") {
//             $("#user-operations").text(calculations.slice(0, -1));
//             // remove the last character from num1 or num2
//             if (num2 !== "") {
//                 num2 = num2.slice(0, -1);
//             } else if (operator !== "") {
//                 operator = "";
//             } else if (num1 !== "") {
//                 num1 = num1.slice(0, -1);
//             }
//         } else if (input === "Enter") {
//             // evaluate the expression and update total and result
//             handleTotal();
//             if (result !== "" && num2 === "") {
//                 $("#user-operations").text(total);
//             } else {
//                 $("#result").text(total);
//             }
//         } else if (input === ".") {
//             if ((operator === "" && !num1.includes(".")) || (operator !== "" && !num2.includes("."))) {
//                 $("#user-operations").append(input);
//                 // add the decimal point to num1 or num2
//                 if (operator === "") {
//                     num1 += input;
//                 } else {
//                     num2 += input;
//                 }
//             }
//         } else if (input === "%") {
//             // calculate the percentage and update num2
//             total = percentage();
//             $("#user-operations").text(num1 + operator + num2);
//         } else if (input === "+" || input === "-" || input === "*" || input === "/") {
//             if (num1 !== "" && num2 === "" && operator === "") {
//                 // update the operator if only num1 has been entered
//                 operator = input;
//                 $("#user-operations").append(input);
//             } else if (num1 === "" && num2 === "" & operator === "") {
//                 num1 = 0;
//                 if (!isNaN(input)) {
//                     num1 += parseFloat(input);
//                 }
//             } else if (num1 !== "" && num2 === "" && operator !== "") {
//                 // replace the previous operator with the new one
//                 operator = input;
//                 calculations = calculations.slice(0, -1) + input;
//                 $("#user-operations").text(calculations);
//             } else if (num1 !== "" && num2 !== "") {
//                 // evaluate the expression and update num1, num2, operator, and result
//                 handleTotal();
//                 num1 = total.toString();
//                 num2 = "";
//                 operator = input;
//                 $("#user-operations").text(num1 + operator);
//                 $("#result").text(total);
//             }
//         } else {
//             // handle numeric inputs
//             $("#user-operations").append(input);
//             if (operator === "") {
//                 num1 += input;
//             } else {
//                 num2 += input;
//             }
//         }
//     });
// });

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



