/* eslint-disable no-plusplus */
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Center, Stack, Text } from '@mantine/core';
import { StimulusParams } from '../../../../../../store/types';
import ScatterWrapper from './ScatterWrapper';
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const startingArr = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

function JND({ setAnswer } : StimulusParams<Record<string, never>>) {
  const [counter, setCounter] = useState(0);

  const [r1, setR1] = useState(() => {
    const index = Math.floor(Math.random() * startingArr.length);
    return startingArr[index];
  });

  const [r2, setR2] = useState(() => {
    let aboveArr = [] as number[];
    let belowArr = [] as number[];
    const index = startingArr.indexOf(r1);

    if (index >= 0) {
      let above = Math.random() > 0.5;
      if (r1 === 0.9) {
        above = false;
      } else if (r1 === 0.1) {
        above = true;
      }

      if (above) {
        aboveArr = startingArr.slice(index + 1);
        return aboveArr[Math.floor(Math.random() * aboveArr.length)];
      }
      belowArr = startingArr.slice(0, index);
      return belowArr[Math.floor(Math.random() * belowArr.length)];
    }
    return r1; // Fallback if r1 not found in startingArr
  });

  const [participantSelections, setParticipantSelections] = useState<{r1: number, r2: number, correct: boolean}[]>([]);

  const onClick = useCallback((n: number) => {
    setParticipantSelections([...participantSelections, { r1, r2, correct: n === 1 }]);
    setCounter(counter + 1);

    const flip = Math.random() > 0.5;
    // is correct
    if (n === 1) {
      if (flip) {
        setR2(Math.min(r2 + 0.01, 1));
      } else {
        setR1(Math.min(r1 - 0.01, 1));
      }
    } else if (flip) {
      setR2(Math.max(r2 - 0.03, 0));
    } else {
      setR1(Math.max(r1 + 0.03, 0));
    }
  }, [counter, participantSelections, r1, r2]);

  useEffect(() => {
    if (counter === 50) {
      setAnswer({
        status: true,
        provenanceGraph: undefined,
        answers: { scatterSelections: participantSelections },
      });
    }
  }, [counter, participantSelections]);

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      <Text>
        {counter}
        /50
      </Text>
      <Text style={{ textAlign: 'center' }}>Select an option</Text>
      <Center>
        <ScatterWrapper onClick={onClick} r1={r1} r2={r2} />
      </Center>
    </Stack>
  );
}

export default JND;
