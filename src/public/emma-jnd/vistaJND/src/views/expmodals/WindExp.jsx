import {Container, Title, Text, Image, Center, Group} from "@mantine/core";
import expImgNeg from '/src/assets/trainImg/scatter-neg-exp.png'
import expImgPos from '/src/assets/trainImg/scatter-pos-exp.png'
import Windflow from "../../components/vis/Windflow.jsx";

export function WindExp() {

    const expDataAry = [20,30,40,50,60]
    return (
        <Container  m={10}>
            <Title m = {10} order={3}>Example of windflow visualization at different speed level</Title>
            <Text m={10}>Higher wind speeds lead to faster, longer, denser, and brighter particle flows.</Text>
            <Group>
                {
                    expDataAry.map((v, i) => {
                        return (
                            <>
                                <Windflow v={v}/>
                                <Text key={i}>{v}px/s</Text>

                            </>
                        )
                    })
                }
            </Group>

        </Container>
    )
}
