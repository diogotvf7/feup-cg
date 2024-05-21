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

    const deCasteljau = (points, position = 0.5) => {
      let a, b, midpoints = [];
      while (points.length > 1) {
        const num = points.length - 1;
        for (let i = 0; i < num; ++i) {
          a = points[i];
          b = points[i + 1];
          midpoints.push([
            a[0] + ((b[0] - a[0]) * position),
            a[1] + ((b[1] - a[1]) * position),
          ]);
        }
        points = midpoints;
        midpoints = [];
      }
    
      // Calculate the tangent vectors at the given point and its neighboring points
      const tangentA = [points[0][0] - a[0], points[0][1] - a[1]];
      const tangentB = [b[0] - points[0][0], b[1] - points[0][1]];
    
      // Average the tangent vectors to get an approximation of the normal vector
      const normal = [(tangentA[0] + tangentB[0]) / 2, (tangentA[1] + tangentB[1]) / 2];
    
      // Normalize the normal vector
      const length = Math.sqrt(normal[0] ** 2 + normal[1] ** 2);
      const normalizedNormal = length 
        ? [normal[0] / length, normal[1] / length] 
        : [0, 1]; // If the normal vector is the zero vector, default to [0, 1]

      return {
        point: points[0],
        tangentA,
        tangentB,
        normal: normalizedNormal
      };
    };

    const rad_to_deg = (radians) => radians * (180 / Math.PI);
    
    const rgbToQuofficient = (rgb) => {
      return rgb.map(val => val / 255);
    }

export {
  arraySum, 
  arraySub, 
  normalizeVector, 
  scaleVector, 
  generateArrayWithSum, 
  getDir, 
  deCasteljau,
  rad_to_deg,
  rgbToQuofficient,
}