const { faker } = require('@faker-js/faker');
const { trueOrNot, randomElement } = require('../helpers/helpers');
const { generate_OneVideoGame, generate_multipleVideoGames } = require('../src/videoGameGenerator');

const titles = [ "Mr.", "Ms.", "Mrs.", "Dr." ];
const randomTitle = randomElement(titles);

function titleOrNoTitle(title) {
    return trueOrNot() ? title : undefined;
}

const titleOrNo = titleOrNoTitle(randomTitle);

const suffixes = [ 'Jr.', 'Sr.', '\u2160', '\u2161', '\u2162' ];
const randomSuffix = randomElement(suffixes);

function generate_SuffixOrNot(suffix) {
    return trueOrNot() ? suffix : undefined;
}
const suffixOrNo = generate_SuffixOrNot(randomSuffix);

function generate_MiddleNameOrNot(middleName) {
    return trueOrNot() ? middleName : undefined;
}
const middleNameOrNot = generate_MiddleNameOrNot(faker.person.middleName());

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

const randomAge1to60 = Math.floor(Math.random() * 60);

const memberSince_Options = [
    faker.date.past(),
    faker.date.recent()
];
const randomMemberSince = randomElement(memberSince_Options);

const membershipTypes = [
    'Apprentice Membership: (level 1)',
    'Squire Membership: (level 2)',
    'Knight Membership: (level 3)'
];
const randomMembershipType = randomElement(membershipTypes);

function generate_membershipPaymentDate(date) {
    const randomDate = new Date(date);
    const futureDate = new Date(randomDate);
    futureDate.setDate(randomDate.getDate() + 30);
    const futureDateLocaleString = futureDate.toLocaleDateString('en-US');
    return futureDateLocaleString;
}
const membershipPaymentDate = generate_membershipPaymentDate(randomMemberSince);

const randomWalletAmount = `$${(Math.random() * 500).toFixed(2)}`;

function fundsInWalletOrNot(funds) {
  return trueOrNot() ? funds : `$0.00`;
}
const fundsOrNot = fundsInWalletOrNot(randomWalletAmount);


const coupons = [
    '10% Coupon',
    '20% Coupon',
    '30% Coupon',
    '40% Coupon',
    '50% Coupon'
];
const randomCoupon = randomElement(coupons);

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
const couponsOrNot = generate_oneOrMoreCoupons(randomCoupon);

const onlinePaymentServices = [
    'Google Pay',
    'PayPal'
];
const randomPaymentService = randomElement(onlinePaymentServices);

const listOfGames_OneToTen = generate_multipleVideoGames(Math.floor(Math.random() * 10));
const wishListGames_OneTo100 = generate_multipleVideoGames(Math.floor(Math.random() * 100));



function generateUser() {
    const fullName = generate_FullName(user);

    const user = {
        id: faker.string.uuid(),
        name: {
            title: titleOrNo,
            firstName: faker.person.firstName(),
            middleName: middleNameOrNot,
            lastName: faker.person.lastName(),
            suffix: suffixOrNo,
            fullName: fullName
        },
        age: randomAge1to60,
        address: faker.location.streetAddress(),
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
            isMember: trueOrNot(), // boolean | if member is true, they get a small discount on products
            memberSince: randomMemberSince,
            membershipType: randomMembershipType, // if they are a member, this will determine the discount rate. If not a member, this will be false
            isMembershipAutoRenewal: trueOrNot(), // boolean which determines if a person automatically renews their monthly payment
            membershipRenewalDate: membershipPaymentDate // shows when the user will auto-renew their membership, 30 days after membershipSince.
            // the membership renewal will use the preferred card payment in the electricPaymentMethod object.
        },
        wishlist: [...wishListGames_OneTo100], // can add up to 100 games on the wishlist
        cart: [...listOfGames_OneToTen], // can add up to 10 games in the cart
        electricPaymentMethod: {
            wallet: fundsOrNot,
            coupon: [...couponsOrNot],
            onlineFinanceService: randomPaymentService, // This should be either 'Google Pay' or 'Paypal'
            card: {
                creditCard: [
                    { undefined },
                    { undefined }
                ],
                debitCard: [
                    { undefined },
                    { undefined }
                ],
                preferredCard: null
            }
        },
        orders: {
            currentOrders: [
                { undefined },
                { undefined }
            ],
            pastOrders: [
                { undefined },
                { undefined }
            ],
            cancelledOrders: [
                { undefined },
                { undefined }
            ]
        }
    }
    return user;
}