const { readJsonFile, writeJsonFile } = require('./helpers/helpers');
const { generateUser, generate_multipleUsers } = require('./src/userGenerator');

if (process.argv[2]) {

    switch(process.argv[2]) {
        case 'create':
            if (process.argv[3]) {
                const newUser = generate_multipleUsers(process.argv[3]);
                const usersDataFile = readJsonFile('./data', 'registered_customer.json');
                usersDataFile.push(...newUser)
                writeJsonFile('./data', 'registered_customer.json', usersDataFile);
                console.log('One of more users were added to registered_customer.json file');
            } else {
                const newUser = generateUser();
                const usersDataFile = readJsonFile('./data', 'registered_customer.json');
                usersDataFile.push(newUser)
                writeJsonFile('./data', 'registered_customer.json', usersDataFile);
                console.log('One new user added to registered_customer.json file');
            }
            break;
        case 'view_all':
            const data = readJsonFile('./data', 'registered_customer.json');
            console.log(data);
            writeJsonFile('./data', 'registered_customer.json', data);
            break;
        case 'view':
            if (process.argv[3]) {
                const dataView = readJsonFile('./data', 'registered_customer.json');
                console.log(dataView.find(user => user.id === process.argv[3]));
                writeJsonFile('./data', 'registered_customer.json', dataView);
            }
            break;
        case 'update':
            if (process.argv[3] && process.argv[4] && process.argv[5]) {
                const idArgument = process.argv[3];
                const keyArgument = process.argv[4];
                const valueArgument = process.argv[5];
                const dB = readJsonFile('./data', 'registered_customer.json');

                dB.forEach(user => {
                    if (user.id === idArgument) {
                        if (user[keyArgument]) {
                            user[keyArgument] = valueArgument;
                        } else {
                            console.log('This key cannot be found');
                        }
                    }
                });

                writeJsonFile('./data', 'registered_customer.json', dB);
            }
            break;
        case 'destroy':
            const idArg = process.argv[3];
            if (idArg) {
                const retrievedData = readJsonFile('./data', 'registered_customer.json');
                const unwantedUser = retrievedData.find(user => {
                    return user.id === idArg;
                });

                if (!unwantedUser) {
                    console.log('Data cannot be found');
                } else {
                    const filteredData = retrievedData.filter(user => {
                        return user.id !== unwantedUser.id;
                    });
                    writeJsonFile('./data', 'registered_customer.json', filteredData);
                    console.log('Deleted user with ID:', unwantedUser.id);
                }
            }
            break;
        default:
            throw 'Input not recognized'
    }
}


