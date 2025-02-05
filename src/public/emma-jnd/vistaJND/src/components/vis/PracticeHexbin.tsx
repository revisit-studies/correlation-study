import { useState, useCallback } from 'react';
import {
  Center, Stack, Text, Button,
} from '@mantine/core';
import HexbinWrapper from './HexbinWrapper';
import { StimulusParams } from '../../../../../../store/types';

const lowArr = [0.1, 0.2, 0.3, 0.4, 0.5];
const highArr = [0.6, 0.7, 0.8, 0.9, 1.0];

const generateRValues = (arr: number[]): [number, number] => {
  const r1 = arr[Math.floor(Math.random() * arr.length)];
  let r2 = arr[Math.floor(Math.random() * arr.length)];
  while (r1 === r2) {
    r2 = arr[Math.floor(Math.random() * arr.length)];
  }
  return [r1, r2];
};

export default function PracticeHexbin({
  setAnswer,
}: StimulusParams<Record<string, never>>) {
  const [counter, setCounter] = useState(0);
  const [rValues, setRValues] = useState<[number, number]>(() => generateRValues(highArr));
  const [result, setResult] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);

  const onClick = useCallback(
    (n: number) => {
      const [r1, r2] = rValues;
      if (result === null) {
        if ((n === 1 && r1 > r2) || (n === 2 && r2 > r1)) {
          setResult('Correct');
        } else {
          setResult('Incorrect');
        }
        setShowNext(true);
      }
    },
    [rValues, result],
  );

  const onNext = () => {
    setResult(null);
    setShowNext(false);
    setCounter((prev) => prev + 1);

    if (counter + 1 < 10) {
      setRValues(generateRValues(highArr));
    } else if (counter + 1 < 20) {
      setRValues(generateRValues(lowArr));
    } else {
      setAnswer({
        status: true,
        provenanceGraph: undefined,
        answers: { completed: true },
      });
      setResult('Practice Completed, please continue.');
    }
  };

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      <Text>
        {counter}
        /20
      </Text>
      <Text style={{ textAlign: 'center' }}>Select the option with the higher correlation</Text>
      <Center>
        <HexbinWrapper
          onClick={onClick}
          r1={rValues[0]}
          r2={rValues[1]}
          shouldReRender={false}
        />
      </Center>
      {result && (
        <Text style={{ textAlign: 'center', marginTop: '1rem' }}>{result}</Text>
      )}
      {showNext && (
        <Center>
          <Button onClick={onNext} style={{ marginTop: '1rem' }}>
            Next
          </Button>
        </Center>
      )}
    </Stack>
  );
}
