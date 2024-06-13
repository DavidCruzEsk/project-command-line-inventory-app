const { faker } = require('@faker-js/faker');
const { randomElement } = require('../helpers/helpers');

const creditDebitArr = ['credit','debit'];
const visaMasterArr = [ 'visa', 'master' ];
const banks = [
    'Chase Bank',
    'Bank of America',
    'TD Bank',
    'Citi Bank'  
];

const creditOrDebit = randomElement(creditDebitArr);
const visaOrMaster = randomElement(visaMasterArr);
const randomBank = randomElement(banks);
const randomAmount = (Math.random() * 100000).toFixed(2);

function currencyAmount(currency) { // Must fix this function, so it will properly add commas in the places where it needs to be
    const stringedUSD_currency = `${currency}`;
    const regex_1000_orMore = /\$?(\d{1,3}(,\d{3})*)(\.\d{2})?/;

    if (regex_1000_orMore.test(stringedUSD_currency)) {
        return stringedUSD_currency.replace(regex_1000_orMore, '$$$1$3');
    }
    
    return `$${stringedUSD_currency}`;
};

const cardBalance = currencyAmount(randomAmount);

function generate_OneCard(fullName) {
    const newCard = {
        id: faker.string.uuid(),
        fullName: fullName,
        cardNumber: `####-####-####-####`,
        credit_debit: creditOrDebit,
        visa_master: visaOrMaster,
        bank: randomBank,
        expirationDate: faker.date.future(),
        securityNum: '###',
        USDcurrencyAmount: cardBalance
    }
    return newCard;
}

module.exports = { generate_OneCard };