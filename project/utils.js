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

export {
  arraySum, arraySub, normalizeVector, scaleVector
}