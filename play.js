// const name = 'Red';
// const age = '26';
// const hasHobbies = true;

// const summarizeUser = (userName, userAge, userHasHobby) => {
//   return `Name is ${userName}, age is ${userAge} and the user has hobbies: ${userHasHobby}`
// };

// const addOne = a => a + 1;

// console.log(addOne(3));

// console.log(summarizeUser(name, age, hasHobbies));

////////////////////// spread and rest operators

// const person = {
//   name: 'Red',
//   age: '26',
//   greet() {
//     console.log(`Hi, I am ${this.name}`);
//   }
// }

// const copiedPerson = { ...person }; //spread operator
// console.log(copiedPerson);

// person.greet();

// const hobbies = ['Sport', 'Programming'];

// const copiedHobbies = [...hobbies]; //spread operator

// hobbies.push('Motorcycles');

// console.log(hobbies.map(hobby => `Hobby: ${hobby}`));
// console.log(copiedHobbies);

// const toArray = (...args) => { //rest operator
//   return args;
// };

// console.log(toArray(1, 2, 5, 7));

////////////////////// destructuring

// const person = {
//   name: 'Red',
//   age: '26',
//   greet() {
//     console.log(`Hi, I am ${this.name}`);
//   }
// }

// const printName = ({ name }) => {
//   console.log(name);
// };

// printName(person);

// const { name, age } = person;
// console.log(name, age);

// const hobbies = ['Sport', 'Programming', 'Motorcycles'];
// const [hobby1, hobby2, hobby3] = hobbies;
// console.log(hobby1, hobby2, hobby3);

////////////////////// async code and promises

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, 1500);
  });
  return promise;
};

setTimeout(() => {
  console.log('Timer is done!');
  fetchData()
    .then(text => {
      console.log(text);
      return fetchData();
    })
    .then(text2 => {
      console.log(text2);
    });
}, 2000);

console.log('Hello');
console.log('Hi');
