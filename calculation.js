let calculation = "";
let actualCalculation = "";
let previousCalculation = "";
let stackCalculation = [];

const MAX_CALCULATION_CHARACTERS = 30;
const MAX_ACTUAL_CALCULATION_CHARACTERS = 8;

const buttonsNumbers = document.querySelectorAll("button");

const previousCalculationDisplay = document.querySelector("#stored-calculation");
const actualCalculationDisplay = document.querySelector("#current-calculation");

const blink = document.getElementById('blink-text');

buttonsNumbers.forEach(buttonNumbers =>{
    buttonNumbers.addEventListener('click', ()=>{

        switch(buttonNumbers.className){
            case "number":
                insertNumber(buttonNumbers);
                break;
            case "operator":
                insertOperator(buttonNumbers);
                break;
            case "ac":
                cancelEntry();
                break;
            case "del":
                deleteLastEntry();
                break;
            case "assignment":
                assign();
                break;
        }

        previousCalculationDisplay.innerHTML = previousCalculation;
        actualCalculationDisplay.innerHTML = actualCalculation;

        let isBlinkExists = actualCalculation.length < MAX_ACTUAL_CALCULATION_CHARACTERS;

        if (isBlinkExists){
            actualCalculationDisplay.appendChild(blink);
        }
    })
})

const insertNumber = (number) =>{
    let isNumberComma = number.textContent == ".";
    let isActualCalculationContainComma = actualCalculation.includes(".");

    let isCalculationWithMaxCharacters = calculation.length >= MAX_CALCULATION_CHARACTERS;
    let isActualCalculationWithMaxCharacters = actualCalculation.length >= MAX_ACTUAL_CALCULATION_CHARACTERS;
    let isHaveProblemWithCommma = isNumberComma && isActualCalculationContainComma;
    
    let isValidNumberInsert = !isCalculationWithMaxCharacters && !isActualCalculationWithMaxCharacters && !isHaveProblemWithCommma;

    if(!isValidNumberInsert){
        return;
    }

    calculation += number.textContent;
    actualCalculation += number.textContent;
}

const insertOperator = (operator) => {

    let isActualCalculationEmptyString = !actualCalculation;
    let isCalculationWithMaxCharactersToInsertOperator = calculation.length >= MAX_CALCULATION_CHARACTERS-1; 
    
    let isValidOperatorInsert = !isActualCalculationEmptyString && !isCalculationWithMaxCharactersToInsertOperator; 

    if(!isValidOperatorInsert){
        return;
    }

    calculation += operator.textContent;
    previousCalculation += actualCalculation+operator.textContent;
    stackCalculation.push(actualCalculation);
    actualCalculation = "";
}

const cancelEntry = () =>{
    calculation = actualCalculation = previousCalculation = "";
    stackCalculation = [];
}

const removeLastCharacter = (stringToRemove) =>{
    stringToRemove = stringToRemove.substring(0, stringToRemove.length-1);
    return stringToRemove;
}

const deleteLastEntry = () =>{
    console.log(!calculation);
    let isCalculationEmpty = !calculation;
    if(isCalculationEmpty){
        return;
    }

    calculation = removeLastCharacter(calculation);

    let isActualCalculationEmpty = !actualCalculation;
    if(isActualCalculationEmpty){
        const lastActualCalculation = stackCalculation.pop();
        actualCalculation = lastActualCalculation;
        lastIndexActualCalculation = previousCalculation.lastIndexOf(actualCalculation)
        previousCalculation = previousCalculation.slice(0, lastIndexActualCalculation);
        return;
    }

    actualCalculation = removeLastCharacter(actualCalculation);
}

const removeOperatorEnd = () =>{
    
    let lastCalculationCharacter = calculation[calculation.length-1];
    let VerifyIsLastCalculationCharacterNumber = isNaN(lastCalculationCharacter);
    
    if(VerifyIsLastCalculationCharacterNumber)
        calculation = calculation.slice(0, calculation.length-1);
}

const assign = () =>{
    console.log(previousCalculation);
    console.log(calculation);

    removeOperatorEnd();

    let calculationContainsDivisionOperator = calculation.includes("÷");
    
    calculation = calculationContainsDivisionOperator ? calculation.replace("÷","/") : calculation;
    
    const resultCalculation = eval(calculation);

    cancelEntry();

    let resultCalculationContainsComma = String(resultCalculation).includes(".");
    calculation = resultCalculationContainsComma ? String(resultCalculation.toFixed(2)): String(resultCalculation);
    actualCalculation=calculation;

    console.log("CALCULO TOTAL: " + calculation + "\nCÁLCULO ATUAL: " + actualCalculation + "\nCÁLCULO ANTERIOR: " + previousCalculation + "\nPILHA DE CÁLCULO: " + stackCalculation);
}