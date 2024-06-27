import {useContext, useEffect, useRef, useState} from "react";
import {Stepper, useMantineColorScheme} from "@mantine/core";
import {FlowContext} from "../App.jsx";






function Stepper4({activeStep, dark}){

    return (
        <Stepper active={activeStep}
                 orientation="vertical"
                 sx={{padding:10, paddingTop:30}}
                 color={dark ? 'yellow' : 'blue'}
        >
            <Stepper.Step label="Consent Form" description="Consent form"  loading={activeStep===0}/>
            <Stepper.Step label="VLAT" description="29 Questions" loading={activeStep===1}/>
            <Stepper.Step label="Debrief" description="Demographic survey"  loading={activeStep===2}/>
            <Stepper.Step label="Completion" description=""  loading={activeStep===3}/>

        </Stepper>
    );
}

function Stepper3({activeStep, dark}){

    return (
        <Stepper active={activeStep}
                 orientation="vertical"
                 sx={{padding:10, paddingTop:30}}
                 color={dark ? 'yellow' : 'blue'}
        >
            <Stepper.Step label="Consent Form" description="Consent form"  loading={activeStep===0}/>
            <Stepper.Step label="VLAT" description="29 Questions" loading={activeStep===1}/>
            <Stepper.Step label="Completion" description=""  loading={activeStep===2}/>

        </Stepper>
    );
}

function Stepper3Full({activeStep, dark}){

    return (
        <Stepper active={activeStep}
                 orientation="vertical"
                 sx={{padding:10, paddingTop:30}}
                 color={dark ? 'yellow' : 'blue'}
        >
            <Stepper.Step label="Consent Form" description="Consent form"  loading={activeStep===0}/>
            <Stepper.Step label="VLAT" description="56 Questions" loading={activeStep===1}/>
            <Stepper.Step label="Completion" description=""  loading={activeStep===2}/>

        </Stepper>
    );
}

function StepperVista({activeStep, dark}){

    return (
        <Stepper active={activeStep}
                 orientation="vertical"
                 sx={{padding:10, paddingTop:30}}
                 color={dark ? 'yellow' : 'blue'}
        >
            <Stepper.Step label="Trial" description=" Questions"  loading={activeStep===0}/>
            <Stepper.Step label="Thank you" description="Thank you" loading={activeStep===1}/>

        </Stepper>
    );
}

export default function StepperVertical({}) {
    const {activeStep, setActiveStep, expMode} = useContext(FlowContext);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';



    console.log(expMode,"mode")
    return (
        <>
            <StepperVista activeStep={activeStep} dark={dark}/>

            {/*{(() => {*/}
            {/*    switch (expMode) {*/}
            {/*        case 'adaptive-class':*/}
            {/*            return <Stepper4 activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'adaptive-class-at1':*/}
            {/*            return <Stepper4 activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'adaptive-class-at2':*/}
            {/*            return <Stepper4 activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'adaptive-prolific':*/}
            {/*            return <Stepper3 activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'full-class':*/}
            {/*            return <Stepper3Full activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'full-prolific':*/}
            {/*            return <Stepper3Full activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'full-prolific-1st':*/}
            {/*            return <Stepper3Full activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'full-prolific-2nd':*/}
            {/*            return <Stepper3Full activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'adaptive-prolific-at1':*/}
            {/*            return <Stepper3 activeStep={activeStep} dark={dark}/>*/}
            {/*        case 'adaptive-prolific-at2':*/}
            {/*            return <Stepper3 activeStep={activeStep} dark={dark}/>*/}
            {/*        default:*/}
            {/*            return  <Stepper3 activeStep={activeStep} dark={dark}/>*/}

            {/*    }*/}
            {/*})()}*/}

        </>
    )


}
