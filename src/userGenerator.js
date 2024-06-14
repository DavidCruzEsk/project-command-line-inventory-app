const { faker } = require('@faker-js/faker');
const { trueOrNot, randomElement } = require('../helpers/helpers');
const { generate_OneVideoGame, generate_multipleVideoGames } = require('../src/videoGameGenerator');
const { generate_OneCard } = require('../src/paymentCardGenerator');

const titles = [
    "Mr.",
    "Ms.",
    "Mrs.",
    "Dr."
];

const onlinePaymentServices = [
    'Google Pay',
    'PayPal'
];

const suffixes = [ 
    'Jr.', 
    'Sr.', 
    '\u2160', 
    '\u2161', 
    '\u2162'
];

const membershipTypes = [
    'Apprentice Membership: (level 1)',
    'Squire Membership: (level 2)',
    'Knight Membership: (level 3)'
];

const coupons = [
    '10% Coupon',
    '20% Coupon',
    '30% Coupon',
    '40% Coupon',
    '50% Coupon'
];

const memberSince_Options = [
    faker.date.past(),
    faker.date.recent()
];

const randomPaymentService = randomElement(onlinePaymentServices);
const listOfGames_OneToThree = generate_multipleVideoGames(Math.floor(Math.random() * 3));
const wishListGames_OneToFive = generate_multipleVideoGames(Math.floor(Math.random() * 5));
const randomTitle = randomElement(titles);
const titleOrNo = titleOrNoTitle(randomTitle);
const randomSuffix = randomElement(suffixes);
const suffixOrNo = generate_SuffixOrNot(randomSuffix);
const middleNameOrNot = generate_MiddleNameOrNot(faker.person.middleName());
const randomAge1to60 = Math.floor(Math.random() * 60);
const randomMemberSince = randomElement(memberSince_Options);
const randomMembershipType = randomElement(membershipTypes);
const membershipPaymentDate = generate_membershipPaymentDate(randomMemberSince);
const randomWalletAmount = `$${(Math.random() * 500).toFixed(2)}`;
const randomCoupon = randomElement(coupons);
const couponsOrNot = generate_oneOrMoreCoupons(randomCoupon);
const fundsOrNot = fundsInWalletOrNot(randomWalletAmount);


function titleOrNoTitle(title) {
    return trueOrNot() ? title : undefined;
}

function generate_SuffixOrNot(suffix) {
    return trueOrNot() ? suffix : undefined;
}

function generate_MiddleNameOrNot(middleName) {
    return trueOrNot() ? middleName : undefined;
}

function generate_FullName(userData) {
    let fullName = [];

    if ('name' in userData) {
        for (let key in userData.name) {
            if (key === 'fullName') {
                continue;
            } else if (key === 'middleName') {
                if (userData.name[key] !== undefined) {
                    const middleInitial = `${(userData.name[key])[0].toUpperCase()}.`;
                    fullName.push(middleInitial);
                }
            } else if (userData.name[key] !== undefined) {
                fullName.push(userData.name[key]);
            }
        }
    }

    return fullName.join(' ');
}


function generate_membershipPaymentDate(date) {
    const randomDate = new Date(date);
    const futureDate = new Date(randomDate);
    futureDate.setDate(randomDate.getDate() + 30);
    const futureDateLocaleString = futureDate.toLocaleDateString('en-US');
    return futureDateLocaleString;
}


function fundsInWalletOrNot(funds) {
  return trueOrNot() ? funds : `$0.00`;
}

function generate_oneOrMoreCoupons(coupon) {
    const oneToFive = Math.floor(Math.random() * 5);
    let result = [];

    if (trueOrNot()) {
        for (let i = 0; i < oneToFive; i++) {
            result.push(coupon);
        }
    }

    return result;
}

function generate_randomNumOfCards(fullName) {
    let cardList = [];

    const OneToFive = Math.floor(Math.random() * 5);

    for (let i = 0; i < OneToFive; i++) {
        cardList.push(generate_OneCard(fullName));
    }

    return cardList;
}

function randomlyChoosePreferredCard(userData) {
    if ('electricPaymentMethod' in userData) {
        const depth1 = userData.electricPaymentMethodl
        if ('cardPayment' in depth1) {
            const depth2 = depth1.cardPayment;
            if ('cards' in depth2) {
                const cardList = depth2.cards;
                return randomElement(cardList);
            } throw 'Either "cards" and/or "preferredCard" are missing in "cardPayment" object';
        }
    }
}

function generateUser() {
    // const fullName = generate_FullName(user);
    // const chosenCard = randomlyChoosePreferredCard(user);
    
    const user = {
        id: faker.string.uuid(1000),
        name: {
            title: titleOrNo,
            firstName: faker.person.firstName(),
            middleName: middleNameOrNot,
            lastName: faker.person.lastName(),
            suffix: suffixOrNo,
            // fullName: fullName
        },
        age: randomAge1to60,
        address: faker.location.streetAddress(),
        state: faker.location.state(),
        zipcode: faker.location.zipCode('####-####'),
        country: faker.location.country(),
        contact: {
            emails: faker.internet.email(),
            phone: {
                homePhone: faker.phone.number(),
                mobilePhone: faker.phone.number()
            }
        },
        profileImage: faker.image.avatar(),
        memberStatus: {
            isMember: trueOrNot(),
            memberSince: randomMemberSince,
            membershipType: randomMembershipType, 
            isMembershipAutoRenewal: trueOrNot(),
            membershipRenewalDate: membershipPaymentDate 
        },
        wishlist: [...wishListGames_OneToFive],
        cart: [...listOfGames_OneToThree],
        electricPaymentMethod: {
            wallet: fundsOrNot,
            coupon: [...couponsOrNot],
            onlineFinanceService: randomPaymentService,
            cardPayment: {
                cartId: faker.string.uuid(),
                cards: /* [...generate_randomNumOfCards(fullName)] */ undefined,
                preferredCard: /* chosenCard */ undefined
            }
        },
        orders: {
            allOrders: {
                scheduledOrders: [],
                pastOrders: [],
                cancelledOrders: []
            }
        }
    }
    return user;
}

function generate_multipleUsers(number) {
    let userList = [];

    for (let i = 0; i < number; i++) {
        userList.push(generateUser());
    }

    return userList;
}

module.exports = { generateUser, generate_multipleUsers };