import './App.css'
import {HeaderResponsive} from "./components/HeaderResponsive.jsx";
import {
    AppShell,
    ColorSchemeProvider,
    DEFAULT_THEME,
    Header,
    LoadingOverlay,
    MantineProvider,
    Navbar
} from '@mantine/core';
import {FooterResponsive} from "./components/FooterResponsive";
import Consent from "./views/Consent.jsx";
import {Route, Routes, useSearchParams} from "react-router-dom";
import StepperVertical from "./components/StepperVertical.jsx";
import React, {useEffect, useState} from "react";
import VLAT from "./views/VLAT";
import Debrief from "./views/Debrief";
import Thankyou from "./views/Thankyou.jsx";
import ConsentProlific from "./views/ConsentProlific.jsx";
import ThankyouProlific from "./views/ThankyouProlific.jsx";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {fb} from "./firebase/firebase-config.js";
import ExpSetting from "./views/ExpSetting.jsx";
import ls from 'localstorage-slim';
import VLATFull from "./views/VLATFull.jsx";
import Training from "./views/Training.jsx";
import JndTrial from "./views/JndTrial.jsx";
import ParallelCoordinates from "./components/vis/ParallelCoordinates.jsx";
import ScatterPlots from "./components/vis/ScatterPlots.jsx";
import Windflow from "./components/vis/Windflow.jsx";
import JndTraining from "./views/JndTraining.jsx";

const mockHeaderdata = {
    "links": [
        {
            "link": "/about",
            "label": "Assessment"
        },

    ]
}


const customLoader = (
    <>
        <svg
            width="300"
            height="300"
            viewBox="-30 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            stroke={DEFAULT_THEME.colors.blue[6]}
        >
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <text x={3} y={55} fontSize={15} fontWeight={"lighter"} stroke={"black"}  strokeWidth="1">Wait</text>
                    <text x={-20} y={70} fontSize={8}  fontWeight={"lighter"} stroke={"black"}  strokeWidth="1">Survey will start soon</text>

                </g>
            </g>
        </svg>
    </>

);


export const FlowContext = React.createContext(null);

function App() {
    const [activeStep, setActiveStep] = useState(0);
    const [totalStep, setTotalStep] = useState(4);
    const [searchParams, setSearchParams] = useSearchParams();
    const [expMode, setExpMode] = useState(ls.get('expmode',  { decrypt: true }) || "adaptive-class");
    const [expOn, setExpOn] = useState(false);
    const [expDB, setExpDB] = useState(searchParams.get("db") || ls.get('expname',  { decrypt: true }))



    //for theme
    const [colorScheme, setColorScheme] = useState('light');
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));





    return (
        <FlowContext.Provider value={{activeStep, setActiveStep,totalStep, setTotalStep, setExpMode, expMode, setExpDB}}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>

                <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                    {/*<LoadingOverlay visible={!expOn} overlayBlur={4} loader={customLoader}/>*/}
                    <AppShell

                        padding="md"
                        navbar={<StepperVertical />}
                        header={<HeaderResponsive links={mockHeaderdata.links}/>}
                        styles={(theme) => ({
                            main: {
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                                minHeight: "90vh",
                                paddingTop: 30
                            },
                        })}
                    >
                        <Routes>
                            <Route path="thankyou" element={<Thankyou step={1} />} />

                            <Route path="windjnd">
                                <Route path={"train"}  element={<JndTraining Stimuli={Windflow} testName={"windjnd"} displayData={[20,30]} instruction={"Training for wind stimuli"} nxtURL={"/thankyou"}/>} />
                                <Route path={"m1"}>
                                    <Route path="trial" element={<JndTrial Stimuli={Windflow}
                                                                           module={"m1"}
                                                                           upperBound={120}
                                                                           lowerBound={1}
                                                                           initalBase={30}
                                                                           initialCompare={50}
                                                                           correctStepLen={-1}
                                                                           wrongStepLen={3}
                                                                           testName={"windjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m2"}>
                                    <Route path="trial" element={<JndTrial Stimuli={Windflow}
                                                                           module={"m1"}
                                                                           upperBound={120}
                                                                           lowerBound={1}
                                                                           initalBase={30}
                                                                           initialCompare={10}
                                                                           correctStepLen={1}
                                                                           wrongStepLen={-3}
                                                                           testName={"windjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m3"}>
                                    <Route path="trial" element={<JndTrial Stimuli={Windflow}
                                                                           module={"m1"}
                                                                           upperBound={150}
                                                                           lowerBound={1}
                                                                           initalBase={80}
                                                                           initialCompare={60}
                                                                           correctStepLen={1}
                                                                           wrongStepLen={-3}
                                                                           testName={"windjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m4"}>
                                    <Route path="trial" element={<JndTrial Stimuli={Windflow}
                                                                           module={"m1"}
                                                                           upperBound={150}
                                                                           lowerBound={1}
                                                                           initalBase={80}
                                                                           initialCompare={100}
                                                                           correctStepLen={-1}
                                                                           wrongStepLen={3}
                                                                           testName={"windjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>


                            </Route>

                            <Route path="scatterjnd">
                                <Route path={"train"}  element={<JndTraining Stimuli={ScatterPlots} testName={"scatterjnd"} displayData={[0.5,1]} instruction={"Training for scatter plot stimuli"} nxtURL={"/thankyou"}/>} />

                                <Route path={"m1"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ScatterPlots}
                                                                           module={"m1"}
                                                                           upperBound={1}
                                                                           lowerBound={0}
                                                                           initalBase={0.5}
                                                                           initialCompare={0.7}
                                                                           correctStepLen={-0.02}
                                                                           wrongStepLen={0.06}
                                                                           testName={"scatterjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m2"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ScatterPlots}
                                                                           module={"m2"}
                                                                           upperBound={1}
                                                                           lowerBound={0}
                                                                           initalBase={0.5}
                                                                           initialCompare={0.3}
                                                                           correctStepLen={0.02}
                                                                           wrongStepLen={-0.06}
                                                                           testName={"scatterjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m3"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ScatterPlots}
                                                                           module={"m3"}
                                                                           upperBound={0}
                                                                           lowerBound={-1}
                                                                           initalBase={-0.5}
                                                                           initialCompare={-0.7}
                                                                           correctStepLen={0.02}
                                                                           wrongStepLen={-0.06}
                                                                           testName={"scatterjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m4"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ScatterPlots}
                                                                           module={"m4"}
                                                                           upperBound={0}
                                                                           lowerBound={-1}
                                                                           initalBase={-0.5}
                                                                           initialCompare={-0.3}
                                                                           correctStepLen={-0.02}
                                                                           wrongStepLen={0.06}
                                                                           testName={"scatterjnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>
                            </Route>

                            <Route path="paralleljnd">
                                <Route path={"train"}  element={<JndTraining testName={"paralleljnd"} Stimuli={ParallelCoordinates} displayData={[0.5,0.99]} instruction={"Training for parallel coordinates stimuli"} nxtURL={"/thankyou"}/>} />

                                <Route path={"m1"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ParallelCoordinates}
                                                                           module={"m1"}
                                                                           upperBound={1}
                                                                           lowerBound={0}
                                                                           initalBase={0.5}
                                                                           initialCompare={0.7}
                                                                           correctStepLen={-0.02}
                                                                           wrongStepLen={0.06}
                                                                           testName={"paralleljnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m2"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ParallelCoordinates}
                                                                           module={"m2"}
                                                                           upperBound={1}
                                                                           lowerBound={0}
                                                                           initalBase={0.5}
                                                                           initialCompare={0.3}
                                                                           correctStepLen={0.02}
                                                                           wrongStepLen={-0.06}
                                                                           testName={"paralleljnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m3"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ParallelCoordinates}
                                                                           module={"m3"}
                                                                           upperBound={0}
                                                                           lowerBound={-1}
                                                                           initalBase={-0.5}
                                                                           initialCompare={-0.7}
                                                                           correctStepLen={0.02}
                                                                           wrongStepLen={-0.06}
                                                                           testName={"paralleljnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                                <Route path={"m4"}>
                                    <Route path="trial" element={<JndTrial Stimuli={ParallelCoordinates}
                                                                           module={"m4"}
                                                                           upperBound={0}
                                                                           lowerBound={-1}
                                                                           initalBase={-0.5}
                                                                           initialCompare={-0.3}
                                                                           correctStepLen={-0.02}
                                                                           wrongStepLen={0.06}
                                                                           testName={"paralleljnd"}
                                                                           step={0}
                                                                           stairLength={10}
                                                                           nxtUrl={"/thankyou"}/>}/>
                                </Route>

                            </Route>
                        </Routes>

                    </AppShell>

                </MantineProvider>
            </ColorSchemeProvider>

        </FlowContext.Provider>

    )
}

export default App
