const sumArray = (array) => {
  return array.reduce((total, element) => (total += element), 0);
};

const verifyStartingDigits = (numberStrArray) => {
  let result = false;
  const arrayLength = numberStrArray.length;
  const validCardTypes = [
    {
      name: 'Mastercard',
      startingDigits: ['51', '52', '53', '54', '55'],
      validLengths: [16],
    },
    {
      name: 'Visa',
      startingDigits: ['4'],
      validLengths: [13, 16],
    },
    {
      name: 'American Express',
      startingDigits: ['34', '37'],
      validLengths: [15],
    },
  ];

  validCardTypes.forEach((element) => {
    if (element.validLengths.includes(arrayLength)) {
      const [firstDigit, secondDigit] = numberStrArray;
      if (
        element.startingDigits.includes(firstDigit) ||
        element.startingDigits.includes(firstDigit + secondDigit)
      ) {
        result = element.name;
      }
    }
  });
  return result;
};

const checkCardNumber = (number) => {
  const numberStrArray = [...number.toString()];
  let result = verifyStartingDigits(numberStrArray);
  const invalidCard = 'Nieprawidłowy';
  if (!result) {
    result = invalidCard;
    return result;
  }

  const reversedNumberStrArray = numberStrArray.reverse();

  const oddIndexNumbers = reversedNumberStrArray
    .map((element, index) => {
      if (index % 2 !== 0) {
        return parseInt(element);
      }
    })
    .filter((element) => element);

  const evenIndexNumbers = reversedNumberStrArray
    .map((element, index) => {
      if (index % 2 === 0) {
        return parseInt(element);
      }
    })
    .filter((element) => element);

  const doubledOddIndexNumbers = oddIndexNumbers
    .map((element) => {
      const product = element * 2;
      if (product > 9) {
        const productStr = product.toString();
        return [parseInt(productStr[0]), parseInt(productStr[1])];
      } else {
        return product;
      }
    })
    .flatMap((element) => element);

  const sum1 = sumArray(doubledOddIndexNumbers);
  const sum2 = sumArray(evenIndexNumbers);
  const finalSum = sum1 + sum2;
  if (finalSum % 10 !== 0) {
    result = invalidCard;
  }
  return result;
};

export default checkCardNumber;
