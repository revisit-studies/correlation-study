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

export default function JND({ setAnswer, parameters } : StimulusParams<{r1: number, r2:number, above: boolean}>) {
  const [counter, setCounter] = useState(0);
  const [above, setAbove] = useState(parameters.above);
  const [participantSelections, setParticipantSelections] = useState<{correct: boolean}[]>([]);
  const [r1, setR1] = useState(parameters.r1);
  const [r2, setR2] = useState(parameters.r2);

  const onClick = useCallback((n: number) => {
    setParticipantSelections([...participantSelections, { correct: n === 1 }]);
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
      if (r2 >= 1) {
        setR2(1);
      } else {
        setR2(Math.max(r2 + 0.03, 0));
      }
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
      if (r2 <= 0) {
        setR2(0);
      }
      setR2(Math.max(r2 - 0.03, 0));
    }
  }, [above, counter, participantSelections, r1, r2]);

  useEffect(() => {
    if (counter === 50) {
      setAnswer({
        status: true,
        provenanceGraph: undefined,
        answers: { parallelSelections: participantSelections },
      });
    }
  }, [counter, participantSelections]);

  if (counter === 50) {
    return (
      <Text>Completed! Great job, please continue.</Text>
    );
  }

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      <Text>
        {`current r1: ${r1} current r2: ${r2}`}
      </Text>
      <Text style={{ textAlign: 'center' }}>Select an option</Text>
      <Center>
        <ParallelCoordinatesWrapper onClick={onClick} r1={r1} r2={r2} />
      </Center>
      <progress value={counter} max={50} />
    </Stack>
  );
}
