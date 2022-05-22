const CHARACTER_AMOUNT_NUMBER = document.getElementById("characterAmountNumber");
const CHARACTER_AMOUNT_RANGE = document.getElementById("characterAmountRange");
const PASSWORD_GENERATOR = document.getElementById("passwordGenerator");
const INCLUDE_UPPERCASE = document.getElementById("includeUppercase");
const INCLUDE_NUMBERS = document.getElementById("includeNumbers");
const INCLUDE_SYMBOLS = document.getElementById("includeSymbols");
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(91, 96).concat(arrayFromLowToHigh(123, 126)).concat(arrayFromLowToHigh(33, 47));
const PASSWORD_DISPLAY = document.getElementById("password-display");

function syncCharacterAmount(e) {
    const value = e.target.value;
    CHARACTER_AMOUNT_NUMBER.value = value;
    CHARACTER_AMOUNT_RANGE.value = value;
}

CHARACTER_AMOUNT_NUMBER.addEventListener('input', syncCharacterAmount);
CHARACTER_AMOUNT_RANGE.addEventListener('input', syncCharacterAmount);

function generatePassword(CHARACTER_AMOUNT, INCLUDE_UPPER_CASE_ELEMENT, INCLUDE_NUMBERS_ELEMENT, INCLUDE_SYMBOL_ELEMENT) {
    let charCodes = LOWERCASE_CODES;
    if (INCLUDE_UPPER_CASE_ELEMENT) {
        charCodes = charCodes.concat(UPPERCASE_CODES);
    }
    if (INCLUDE_SYMBOL_ELEMENT) {
        charCodes = charCodes.concat(SYMBOL_CODES);
    }
    if (INCLUDE_NUMBERS_ELEMENT) {
        charCodes = charCodes.concat(NUMBER_CODES);
    }
    const passwordCharacters = [];
    for (let i = 0; i < CHARACTER_AMOUNT; i++) {
        const CHARACTER_CODE = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(CHARACTER_CODE));
    }
    return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

PASSWORD_GENERATOR.addEventListener('submit', e => {
        e.preventDefault();
        const CHARACTER_AMOUNT = CHARACTER_AMOUNT_NUMBER.value;
        const INCLUDE_NUMBERS_ELEMENT = INCLUDE_NUMBERS.checked;
        const INCLUDE_UPPER_CASE_ELEMENT = INCLUDE_UPPERCASE.checked;
        const INCLUDE_SYMBOL_ELEMENT = INCLUDE_SYMBOLS.checked;
        const PASSWORD = generatePassword(CHARACTER_AMOUNT, INCLUDE_UPPER_CASE_ELEMENT, INCLUDE_NUMBERS_ELEMENT, INCLUDE_SYMBOL_ELEMENT);
        PASSWORD_DISPLAY.innerText = PASSWORD;
    }
)
