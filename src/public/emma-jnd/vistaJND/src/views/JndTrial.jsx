import {useNavigate,useSearchParams} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {generateDataSet, shuffle} from "../utils/dataGeneration.js";
import {Box, Button, Center, Container, Group, LoadingOverlay, Paper, Text, Title} from "@mantine/core";
import {corr} from "mathjs";
import {useDisclosure} from "@mantine/hooks";
import {FlowContext} from "../App.jsx";
import {addRecord, fb, defaultExpName, getAttempt, completeModule} from "../firebase/firebase-config.js";

const startTime = Date.now()

export default function JndTrial({instruction="instruction",step,module,testName,expID,upperBound,lowerBound,nxtUrl,initalBase,initialCompare,correctStepLen,wrongStepLen, stairLength,Stimuli, correctSelection='L'}) {
    const navigate = useNavigate();
    const [base, setBase] = useState(initalBase);
    const [compare, setCompare] = useState(initialCompare);
    const [displayData, setDisplayData] = useState(shuffle([base,compare]));
    const [correctCount, setCorrectCount] = useState(0);
    const [selected, setSelected] = useState(null);
    const [idx,setIdx] = useState(1);
    const [visible,setVisible] = useState(false);
    const {activeStep, setActiveStep} = useContext(FlowContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const userID = searchParams.get('user')

    const isCorrect = () =>{
        let correct = false;
        if(displayData[0] > displayData[1]) {
            correct = selected === 'L'
        }else{
            correct = selected === 'R'
        }
        return correctSelection === "L" ? correct : !correct
    }

    const onSelect = (position) => {
        setSelected(position)
    }

    const getdataEntry = () => {
        return {
            "qid":idx,
            "base":initalBase,
            "compare":compare,
            "correct":isCorrect(),
            "module":module,
        }
    }

    const onNext = async () => {
        setVisible(true)
        const newCorrectCount = correctCount + isCorrect()? 1 : 0;
        const recordData = getdataEntry();

        const attempt = await getAttempt(userID, testName, module) + 1
        //send to firebase
        await addRecord(userID, module,attempt,idx,recordData,testName).then(async () => {
            if (idx >= stairLength) {
                completeModule(userID,testName,module,attempt,Math.round((newCorrectCount/stairLength) * 100), startTime)
                navigate(nxtUrl)
            }
        })
            .catch((e)=>{
                console.log(e)
                alert("database disconnected")
            })
        //
        //

        if(idx === stairLength){
            navigate(nxtUrl)
        }else{
            setSelected(null)
            setCorrectCount(newCorrectCount)
            setIdx(idx+1)
            const newCompare = isCorrect()? compare+correctStepLen : compare+wrongStepLen
            if(initalBase<initialCompare === base<newCompare && newCompare <= upperBound && newCompare >= lowerBound){
                setCompare(newCompare)
            }
        }
    }

    useEffect(() => {
        setDisplayData(shuffle([base,compare]))
        setTimeout(()=>setVisible(false),1000)
    }, [compare,base]);

    useEffect(() => {
        setActiveStep(step)
    }, []);


    return(
        <Container>
            <Title m={10} order={3}>{instruction}</Title>
            <Group position="center" m={15} spacing={'lg'} >
                <LoadingOverlay visible={visible} overlayBlur={2} />

                <Paper h={350} p={20} onClick={()=>{onSelect('L')}}>
                    <Stimuli v={displayData[0]}/>
                    {displayData[0]}
                    {selected === 'L' && <Text>Selected</Text>}

                </Paper>
                <Paper h={350} p={20} onClick={()=>{onSelect('R')}}>
                    <Stimuli v={displayData[1]}/>
                    {displayData[1]}
                    {selected === 'R' && <Text>Selected</Text>}

                </Paper>
            </Group>
            <Center><Button disabled={selected===null} onClick={onNext}>NEXT</Button></Center>
        </Container>
    )
}
