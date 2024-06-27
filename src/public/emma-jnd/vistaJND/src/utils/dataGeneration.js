import seedrandom from 'seedrandom';
import * as math from 'mathjs';

const mu = 0;
const sigma = 1;
const rng = seedrandom('thisisjndexperimentseed');
const two_pi = 2.0 * 3.14159265358979323846;
const dataSize = 100;
export function generateDataSet(r) {
  const xAry = getSTDNormalDistriArray();
  let yAry = getSTDNormalDistriArray();
  const rz = getCorrelation(xAry, yAry);
  const lam = getLambda(r, rz);
  yAry = yTransform(xAry, yAry, lam);
  return xAry.map((d, i) => [d, yAry[i]]);
}

export function shuffle(array) {
  let currentIndex = array.length; let
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
// with outside u1, u2. garuantee same array
export function generateDataSetFixed(r, seed) {
  const randomNumber = seedrandom(seed);

  const xAry = getSTDNormalDistriArrayFixed(randomNumber);
  let yAry = getSTDNormalDistriArrayFixed(randomNumber);
  const rz = getCorrelation(xAry, yAry);
  const lam = getLambda(r, rz);
  yAry = yTransform(xAry, yAry, lam);
  return xAry.map((d, i) => (r < 0 ? [d, -yAry[i]] : [d, yAry[i]]));
}

function getSTDNormalDistriArrayFixed(randomNumber) {
  const res = [];
  while (res.length < dataSize) {
    const rnumber = getSTDNormalDistriNumberFixed(randomNumber);
    if (rnumber >= -2 * sigma && rnumber <= sigma * 2) {
      res.push(rnumber);
    }
  }
  return res;
}

function getSTDNormalDistriArray() {
  const res = [];
  while (res.length < dataSize) {
    const rnumber = getSTDNormalDistriNumber();
    if (rnumber >= -2 * sigma && rnumber <= sigma * 2) {
      res.push(rnumber);
    }
  }
  return res;
}

function getSTDNormalDistriNumberFixed(randomNumber) {
  const u1 = randomNumber();
  const u2 = randomNumber();
  // console.log(u1)
  // console.log(u2)
  // Box-Muller
  const z0 = math.sqrt(-2 * math.log(u1)) * math.cos(two_pi * u2);
  return z0 * sigma + mu;
}

function getSTDNormalDistriNumber() {
  const u1 = rng();
  const u2 = rng();
  // console.log(u1)
  // console.log(u2)
  // Box-Muller
  const z0 = math.sqrt(-2 * math.log(u1)) * math.cos(two_pi * u2);
  return z0 * sigma + mu;
}

function getCorrelation(xAry, yAry) {
  if (xAry.length === yAry.length) {
    const xMean = math.mean(xAry);
    const yMean = math.mean(yAry);
    const xSTD = math.std(xAry);
    const ySTD = math.std(yAry);
    let sumOfDiff = 0;
    for (let i = 0; i < xAry.length; i++) {
      sumOfDiff += (xAry[i] - xMean) + (yAry[i] - yMean);
    }
    const covariance = sumOfDiff / (xAry.length - 1);
    return covariance / (xSTD * ySTD);
  }
  console.log('Invalid Correlation Calculation');
  return NaN;
}

function getLambda(r, rz) {
  const rSquare = r ** 2;
  const rZSquare = rz ** 2;
  return ((rz - 1) * (rSquare + rz) + Math.sqrt(rSquare * (rZSquare - 1) * (rSquare - 1))) / ((rz - 1) * (2 * rSquare + rz - 1));
}

function yTransform(xAry, yAry, lam) {
  const lamSquare = lam ** 2;
  return yAry.map((d, i) => (lam * xAry[i] + (1 - lam) * d) / Math.sqrt(lamSquare + (1 - lam) ** 2));
}
