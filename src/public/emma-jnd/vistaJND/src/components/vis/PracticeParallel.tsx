import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ParallelCoordinatesWrapper from './ParallelCoordinatesWrapper';
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const lowArr = [0.1, 0.2, 0.3, 0.4, 0.5];
const highArr = [0.6, 0.7, 0.8, 0.9, 1.0];

export default function PracticeScatter({ setAnswer } : StimulusParams<Record<string, never>>) {
  const [counter, setCounter] = useState(0);
  const [r1, setR1] = useState(highArr[Math.floor(Math.random() * highArr.length)]);
  const [r2, setR2] = useState(highArr[Math.floor(Math.random() * highArr.length)]);
  const [result, setResult] = useState('');

  const setRValue = (arr: number[]) => {
    setR1(arr[Math.floor(Math.random() * arr.length)]);
    setR2(arr[Math.floor(Math.random() * arr.length)]);
  };

  const onClick = useCallback((n: number) => {
    setCounter(counter + 1);

    if ((n === 1 && r1 > r2) || (n === 2 && r2 > r1)) {
      setResult('Correct');
    } else {
      setResult('Incorrect');
    }
    if (counter < 10) {
      setRValue(highArr);
    } else {
      setRValue(lowArr);
    }
  }, [counter, r1, r2]);

  useEffect(() => {
    if (r1 === r2) {
      if (counter < 10) {
        setRValue(highArr);
      } else {
        setRValue(lowArr);
      }
    }
    if (counter === 20) {
      setAnswer({
        status: true,
        provenanceGraph: undefined,
        answers: { completed: true },
      });
      setResult('Practice Completed, please continue.');
    }
  }, [counter]);

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      <Text>
        {counter}
        /20
      </Text>
      <Text style={{ textAlign: 'center' }}>Select the option with the higher correlation</Text>
      <Center>
        <ParallelCoordinatesWrapper onClick={onClick} r1={r1} r2={r2} />
      </Center>
      <Text style={{ textAlign: 'center' }}>{result}</Text>
    </Stack>
  );
}
