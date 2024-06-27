import {Button, Grid, Image, LoadingOverlay, Radio, useMantineColorScheme} from "@mantine/core";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {FlowContext} from "../App.jsx";
import {completeModule} from "../firebase/firebase-config.js";
import vlat9  from "../assets/vlatImg/VLAT9.png"
import {ACQuestions} from "../assets/AttentionQ.js"
import Tour from "reactour";


const tourConfig = [
    {
        selector: '[data-tut="stimuli"]',
        content: `On the left side, you will see a visualization based on real data. Topic may varies`
    },
    {
        selector: '[data-tut="options"]',
        content: `Questions and options will appear on the right side. Please select the one you believe is correct. If you don't know the answer, you can skip this question.`
    },
    {
        selector: '[data-tut="btn"]',
        content: `After you select the answer, the NEXT button will be enabled. You can click to proceed to the next question.`
    },
]


export default function Training ({nxtUrl,step}){
    const [isTourOpen, setIsTourOpen] = useState(true)
    const navigate = useNavigate()
    const {activeStep, setActiveStep} = useContext(FlowContext);
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const [searchParams, setSearchParams] = useSearchParams();
    const userID = searchParams.get('user')
    const activeQuestion = ACQuestions[0]
    const [answer, setAnswer] = useState('')
    const setUserAnswer = (e) => {
        setAnswer(e.target.value)

    }

    useEffect(() => {
        setActiveStep(step)

    }, []);
    const nxtPage = ()=>{
        completeModule(userID,"vlat","train",1,0,Date.now())

        navigate(nxtUrl)
    }
    return (
        <div>
            <Tour
                onRequestClose={() => setIsTourOpen(false)}
                steps={tourConfig}
                isOpen={isTourOpen}
                // maskClassName="mask"
                className="helper"
                rounded={5}
                accentColor={"#5cb7b7"}
                // onAfterOpen={this.disableBody}
                // onBeforeClose={this.enableBody}
            />
            <h1>Training</h1>
            <>
                <Grid>
                    <Grid.Col md={8} sm={12}>
                        <Image
                            data-tut="stimuli"
                            radius="sm"
                            src={vlat9}
                            alt="VIS"
                            style={{width:"100%"}}
                            onLoad={() => setLoading(false)}

                        />
                    </Grid.Col>
                    <Grid.Col md={4} sm={12}>
                        <div data-tut={"options"} style={{textAlign:"left",  paddingLeft: '20px',display:"inline-block" }}>
                            <Radio.Group
                                name="question"
                                orientation="vertical"
                                label={ activeQuestion["question"]}
                                value={answer}
                                size={"md"}

                            >
                                {
                                    activeQuestion["options"].map((op,idx)=>{
                                        return  <Radio
                                            color={dark ? 'yellow' : 'blue'}
                                            value={op}
                                            label={op}
                                            key={"op"+idx}
                                            onClick={setUserAnswer}/>
                                    })
                                }


                            </Radio.Group>
                        </div>

                    </Grid.Col>
                </Grid>
                <Button variant="gradient"
                        data-tut={"btn"}
                        disabled={answer === ''}
                        onClick={nxtPage}
                        style={{marginTop: '30px'}}
                        gradient={dark ?{ from: 'yellow', to: 'orange' } :{ from: 'indigo', to: 'cyan' }}>
                    NEXT
                </Button>

            </>
        </div>
    )
}
