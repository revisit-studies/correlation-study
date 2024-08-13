/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ScatterWrapper from './ScatterWrapper';

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

  const chooseR1 = useCallback(() => {
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
      // If it is the second time using this key, remove it from the map so that it cannot be used a third time
      if (entry.usedIn.length === 1) {
        // console.log('key deleted');
        map.delete(key);
      } else {
        entry.usedIn.push(above);
      }
    }
    // console.log(map);
    return key;
  }, [index, above]);

  const chooseR2 = useCallback(() => {
    const aboveArr = [] as number[];
    const belowArr = [] as number[];

    if (above) {
      for (const key of map.keys()) {
        if (key > r1) {
          aboveArr.push(key);
        }
      }
      return aboveArr[Math.floor(Math.random() * aboveArr.length)];
    }
    for (const key of map.keys()) {
      if (key < r1) {
        belowArr.push(key);
      }
    }
    return belowArr[Math.floor(Math.random() * belowArr.length)];
  }, [above]);

  const [r1, setR1] = useState(chooseR1);
  const [r2, setR2] = useState(chooseR2);

  const onClick = useCallback((n: number) => {
    setParticipantSelections([...participantSelections, { r1, r2, correct: n === 1 }]);
    setCounter(counter + 1);

    // is correct
    if ((above && n === 2) || (!above && n === 1)) {
      if (above) {
        if (r2 < r1 || r2 - r1 <= 0.01) {
          setCounter(50);
        }
        setR2(Math.min(r2 - 0.01, 1));
      } else {
        if (r2 > r1 || r1 - r2 <= 0.01) {
          setCounter(50);
        }
        setR2(Math.min(r2 + 0.01, 1));
      }
    } else if (above && r2 < 1.0) {
      setR2(Math.max(r2 + 0.03, 0));
    } else if (!above && r2 > 0.0) {
      setR2(Math.max(r2 - 0.03, 0));
    }
  }, [above, counter, participantSelections, r1, r2]);

  useEffect(() => {
    // console.log(above);
    if (counter === 50) {
      setAnswer({
        status: true,
        provenanceGraph: undefined,
        answers: { scatterSelections: participantSelections },
      });
      setCompleted(completed + 1);
      setCounter(0);
      // reset values for next trial
      setIndex(Math.floor(Math.random() * map.size));
      setAbove(Math.random() > 0.5);
      setR1(chooseR1);
      setR2(chooseR2);
    }
  }, [chooseR1, chooseR2, completed, counter, participantSelections]);

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
        <ScatterWrapper onClick={onClick} r1={r1} r2={r2} />
      </Center>
      <progress value={counter} max={50} />
    </Stack>
  );
}
