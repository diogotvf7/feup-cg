const arraySum =
    (arr1, arr2) => {
      return arr1.map((num, idx) => num + arr2[idx]);
    }

const arraySub =
    (arr1, arr2) => {
      return arr1.map((num, idx) => num - arr2[idx]);
    }

const normalizeVector =
    (vector) => {
      const norm = Math.sqrt(vector.reduce((acc, val) => acc + val ** 2, 0));
      if (norm === 0) return vector;
      return vector.map(component => component / norm);
    }

const scaleVector =
    (vector, scalar) => {
      return vector.map(component => component * scalar);
    }

const getDir =
    (p1, p2) => {
      return normalizeVector([p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]])
    }

const generateArrayWithSum =
    (n, sum) => {
      if (n === 0) return [];
      const quotient = Math.floor(sum / n);
      const remainder = sum % n;

      const result = [];
      let currentSum = 0;
      for (let i = 0; i < n; i++) {
        let value;
        if (i < remainder) {
          // If there are still remaining elements, add a random value within
          // the range [quotient, quotient + 1)
          value = quotient + Math.random();
        } else {
          // Otherwise, add a random value within the range [quotient, quotient
          // - 1)
          value = quotient;
        }
        result.push(value);
        currentSum += value;
      }

      const sumDifference = sum - currentSum;
      if (sumDifference !== 0) result[n - 1] += sumDifference;

      return result;
    }

export {
  arraySum, arraySub, normalizeVector, scaleVector, generateArrayWithSum, getDir
}