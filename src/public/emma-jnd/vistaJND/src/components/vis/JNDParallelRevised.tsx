/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ParallelCoordinatesWrapper from './ParallelCoordinatesWrapper';

const vals = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

const map = new Map([
  [0.1, { usedIn: [false] }],
  [0.2, { usedIn: [] as boolean[] }],
  [0.3, { usedIn: [] as boolean[] }],
  [0.4, { usedIn: [] as boolean[] }],
  [0.5, { usedIn: [] as boolean[] }],
  [0.6, { usedIn: [] as boolean[] }],
  [0.7, { usedIn: [] as boolean[] }],
  [0.8, { usedIn: [] as boolean[] }],
  [0.9, { usedIn: [true] }],
]);

export default function JND({ setAnswer } : StimulusParams<Record<string, never>>) {
  const [counter, setCounter] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [index, setIndex] = useState(Math.floor(Math.random() * map.size));
  const [above, setAbove] = useState(Math.random() > 0.5);
  const [participantSelections, setParticipantSelections] = useState<{r1: number, r2: number, correct: boolean}[]>([]);

  const chooseR1: () => number = useCallback(() => {
    const key = Array.from(map.keys())[index];
    const entry = map.get(key);
    if (entry) {
      if (key === 0.9) {
        setAbove(false);
      } else if (key === 0.1) {
        setAbove(true);
      } else if (entry.usedIn.includes(above)) {
        setAbove(false);
      } else if (entry.usedIn.includes(!above)) {
        setAbove(true);
      }
      entry.usedIn.push(above);

      // If it is the second time using this key, remove it from the map so that it cannot be used a third time
      if (entry.usedIn.length === 2) {
        map.delete(key);
      }
    }
    // console.log(map);
    return key;
  }, [index, above]);

  const [r1, setR1] = useState(chooseR1);

  const chooseR2 = useCallback(() => {
    const aboveArr = [] as number[];
    const belowArr = [] as number[];

    if (above) {
      for (const val of vals) {
        if (val > r1) {
          aboveArr.push(val);
        }
      }
      return aboveArr[Math.floor(Math.random() * aboveArr.length)];
    }
    for (const val of vals) {
      if (val < r1) {
        belowArr.push(val);
      }
    }
    return belowArr[Math.floor(Math.random() * belowArr.length)];
  }, [above, r1]);

  const [r2, setR2] = useState(chooseR2);

  const onClick = useCallback((n: number) => {
    setParticipantSelections([...participantSelections, { r1, r2, correct: n === 1 }]);
    setCounter(counter + 1);

    if (above && n === 2) {
      if (r2 < r1 || r2 - r1 <= 0.01) {
        // correct and user converges graphs
        setCounter(50);
      } else {
        // correct
        setR2(Math.min(r2 - 0.01, 1));
      }
    } else if (above && n === 1) {
      // incorrect
      setR2(Math.max(r2 + 0.03, 0));
    } else if (!above && n === 1) {
      if (r1 < r2 || r1 - r2 <= 0.01) {
        // correct and user converges graphs
        setCounter(50);
      } else {
        // correct
        setR2(Math.min(r2 + 0.01, 1));
      }
    } else if (!above && n === 2) {
      // incorrect
      setR2(Math.max(r2 - 0.03, 0));
    }
  }, [above, counter, participantSelections, r1, r2]);

  useEffect(() => {
    if (counter === 50) {
      setAnswer({
        status: true,
        provenanceGraph: undefined,
        answers: { scatterSelections: participantSelections },
      });
      setCompleted(completed + 1);
      // reset values for next trial
      setCounter(0);
      setIndex(Math.floor(Math.random() * map.size));
      setAbove(Math.random() > 0.5);
      setR1(chooseR1);
      setR2(chooseR2);
    }
  }, [completed, counter, participantSelections, chooseR1, chooseR2]);

  if (r1 === undefined || r2 === undefined) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      <Text>
        current r1:
        {' '}
        {r1}
        {' '}
        current r2:
        {' '}
        {r2}
      </Text>
      <Text>
        Trials left:
        {' '}
        {completed}
        /16
      </Text>
      <Text style={{ textAlign: 'center' }}>Select an option</Text>
      <Center>
        <ParallelCoordinatesWrapper onClick={onClick} r1={r1} r2={r2} />
      </Center>
      <progress value={counter} max={50} />
    </Stack>
  );
}
