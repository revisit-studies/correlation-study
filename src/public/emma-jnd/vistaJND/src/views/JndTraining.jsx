import {Button, Center, Container, Group, Paper, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Tour from "reactour";
import ExplainModal from "./ExplainModal.jsx";
import {useDisclosure} from "@mantine/hooks";
import {ParralelCoordinatesExp} from "./expmodals/ParralelCoordinatesExp.jsx";
import {ScatterPlotExp} from "./expmodals/ScatterPlotExp.jsx";
import {WindExp} from "./expmodals/WindExp.jsx";
import {completeModule} from "../firebase/firebase-config.js";
import {useSearchParams} from "react-router-dom";

const trainStepsWind = [
    {
        selector: '[data-tut="intro"]',
        content: 'Welcome to the training module for windflow precision assessment. This tutorial will help you get familiar with the task'
    },
    {
        selector: '[data-tut="stimuli"]',
        content: (<p>'In each trial, you will see two moving windflow visualization. Click on the one that appears to represent<Text span color={"red"}> faster windflow</Text>. Try to click one!'</p>)
    },
    {
        selector: '[data-tut="nxt"]',
        content: 'After the selection, click on the next button to proceed to the next trial'
    },
    // ...
]


const trainStepsScatter = [
    {
        selector: '[data-tut="intro"]',
        content: 'Welcome to the training module for scatter plot precision assessment. This tutorial will help you get familiar with the task'
    },
    {
        selector: '[data-tut="stimuli"]',
        content: (<p>'In each trial, you will see two moving windflow visualization. Click on the one that appears to represent<Text span color={"red"}> higher correlation </Text>. Try to click one!'</p>)
    },
    {
        selector: '[data-tut="nxt"]',
        content: 'After the selection, click on the next button to proceed to the next trial'
    },
    // ...
]


const trainStepsParallel = [
    {
        selector: '[data-tut="intro"]',
        content: 'Welcome to the training module for parallel coordinates lot precision assessment. This tutorial will help you get familiar with the task'
    },
    {
        selector: '[data-tut="stimuli"]',
        content: (<p>In each trial, you will see two moving windflow visualization. Click on the one that appears to represent<Text span color={"red"}> higher correlation</Text>. Try to click one!</p>)
    },
    {
        selector: '[data-tut="nxt"]',
        content: 'After the selection, click on the next button to proceed to the next trial'
    },
    // ...
]

const trainingStepMap = {
    "windjnd": trainStepsWind,
    "scatterjnd": trainStepsScatter,
    "paralleljnd": trainStepsParallel
}

const expContentMap = {
    "paralleljnd": ParralelCoordinatesExp,
    "scatterjnd": ScatterPlotExp,
    "windjnd": WindExp,

}

export default function JndTraining({instruction="instruction", displayData, Stimuli,nxtURL, testName}) {
    const [opened, { open, close }] = useDisclosure(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const userID = searchParams.get('user')

    const [selected, setSelected] = useState(null);
    const [tourOpen, setTourOpen] = useState(false);
    const navigate = useNavigate();
    const onNext = () => {
        completeModule(userID,testName,"train",1,0,Date.now())

        navigate(nxtURL)
    }

    const onSelect = (position) => {
        setSelected(position)
    }

    useEffect(() => {
        if(!opened)
            setTourOpen(true)
    }, [opened]);

    return (
    <Container data-tut={"container"}>
        <Title data-tut={"intro"} m={10} order={3}>{instruction}</Title>
        <Group position="center" m={15} spacing={'lg'} data-tut={"stimuli"}>
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
        <Center><Button data-tut="nxt" disabled={selected===null} onClick={onNext}>NEXT</Button></Center>
        <Tour
            steps={trainingStepMap[testName]}
            isOpen={tourOpen}
            onRequestClose={()=>setTourOpen(false)} />
        <ExplainModal opened={opened} close={close} Content={expContentMap[testName]} />
    </Container>
    )

}
