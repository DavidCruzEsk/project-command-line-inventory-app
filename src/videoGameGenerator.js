const { faker } = require('@faker-js/faker');
const { trueOrNot, randomElement } = require('../helpers/helpers');

const platforms = [
    'Nintendo Switch',
    'Playstation 5', 
    'X-Box', 
    'Steam' 
];

const genres = [ 
    'Puzzle', 
    'Platform', 
    'Fighting', 
    'Role-playing-game', 
    'Horror', 
    'Racing', 
    'Shooter', 
    'Flight-Simulator', 
    'Strategy', 
    'Music', 
    'Dancing'
];

const gameRatings = [
    'E (Everyone)',
    'E10+ (Everyone 10 and older)',
    'T (Teen)',
    'M (Mature)',
    'AO (Adults Only)',
    'RP (Rating Pending)'
];

const publishers = [
    'Capcom',
    'Square-Enix',
    'EA Games',
    'Bandai Namco',
    "Sony Computer Entertainment",
    'Nintendo',
    'Microsoft',
    "Sega"
];

// ARRAY OF FAKER PACKAGE GENERATED WORDS, NAMES, NOUNS ETC.
const nameCollections = [
    `${faker.animal.type()}`,
    `${faker.color.human()}`,
    `${faker.hacker.adjective()}`,
    `${faker.hacker.noun()}`,
    `${faker.hacker.verb()}`,
    `${faker.hacker.ingverb()}`,
    `${faker.hacker.phrase()}`
];

const volumes = [ '1', '2', '3', '4', '5' ];

const isStocked = [ 'In stock', 'Not in stock' ];

// ARRAY OF FAKER PACKAGE GENERATED IMAGES
const gameCovers = [
    faker.image.avatar(),
    faker.image.avatarGitHub(),
    faker.image.avatarLegacy(),
    faker.image.urlPicsumPhotos()
];

// ARRAY OF FAKER PACKAGE GENERATED DATES
const dates = [
    faker.date.past(),
    faker.date.future(),
    faker.date.anytime()
];

// VALUE GENERATORS FOR generate_OneVideoGame() FUNCTION'S RETURNED OBJECT
const randomGenres = randomElement(genres);
const randomPublishers = randomElement(publishers);
const randomName = randomElement(nameCollections);
const randomVolumes = randomElement(volumes);
const randomIsStocked = randomElement(isStocked);
const randomGameCover = randomElement(gameCovers);
const randomPlatform = randomElement(platforms);
const randomGameRating = randomElement(gameRatings);
const randomDate = randomElement(dates);

const newGameTitle = generateGameTitle(randomName, randomVolumes);
const newDeveloperName = generateDeveloperName(randomName);
const stockStatus = generateStockStatus(randomDate);

const randomPrice = `$${(Math.floor() * 70).toFixed(2)}`;

// FUNCTION CHECKS IF THE RELEASE DATE IS IN THE FUTURE, THEN PLACES THE STOCK OPTION AS "Not in Stock", AND RANDOMLY CHOOSES PRE-ORDER AVAILABILITY
function generateStockStatus(randomDate) {
    const availability = ['available!', 'not available', 'soon!'];
    const randomAvailability = randomElement(availability);

    const currentDate = new Date();
    return currentDate < randomDate ? `Not in stock (Pre-order ${randomAvailability})` : `${randomIsStocked}`;
}

// CREATE GAME TITLE FUNCTION
function generateGameTitle(word, sequelNum) {
    const oneToThree = Math.floor(Math.random() * 3);
    let gameTitle = [];

    for (let i = 0; i < oneToThree; i++) {
        gameTitle.push(word);
    }

    return  trueOrNot() ? gameTitle.join(' ') + ' ' + sequelNum : gameTitle.join(' ');
}

// CREATE DEVELOPER NAME FUNCTION
function generateDeveloperName(word) {
    const oneToTwo = Math.floor(Math.random() * 2);
    let developerName = [];

    for (let i = 0; i < oneToTwo; i++) {
        developerName.push(word);
    }

    return trueOrNot() ? developerName.join(' ') : developerName.join('-') ; 
}

// FUNCTION WHICH CREATES ONE VIDEO GAME OBJECT
function generate_OneVideoGame() {
    const game = {
        id: faker.string.uuid(),
        name: newGameTitle,
        genre: randomGenres,
        ESRB_Rating: randomGameRating,
        release_date: randomDate,
        platforms: randomPlatform,
        publisher: randomPublishers,
        developer: newDeveloperName,
        gameCoverImage: randomGameCover,
        inStock: stockStatus,
        price: randomPrice
    }
    return game;
}

// FUNCTION WHICH CREATES NUMEROUS VIDEO GAME OBJECTS
function generate_multipleVideoGames(number) {
    let arrOfGames = [];

    for (let i = 0; i < number; i++) {
        arrOfGames.push(generate_OneVideoGame());
    }

    return arrOfGames;
}

module.exports = {
    generate_OneVideoGame,
    generate_multipleVideoGames
};
