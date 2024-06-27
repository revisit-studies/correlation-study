import {Container, Title, Text, Image, Center} from "@mantine/core";
import expImgNeg from '/src/assets/trainImg/parallel-neg-exp.png'
import expImgPos from '/src/assets/trainImg/parallel-pos-exp.png'

export function ParralelCoordinatesExp() {


    return (
        <Container  size="lg" m={20}>
            <Title order={3}>What is correlation</Title>
            <Text>Correlation, roughly defined, is the degree to which two variables are related. Below are several examples of correlation. The r value(correlation value) can range from -1 to 1, and the closer it is to 0 the less correlated the two variables are. In the main task, you will be shown several pairs of charts and asked to choose which visualization appears more correlated. Please review the examples below, and hit "next" at the bottom when you're ready for a practice section.</Text>
            <Title order={3}>
                How to read a parallel coordinates plot
            </Title>
            <Title order={4}>
                For Positive Correlation
            </Title>
            <Image width={800} src={expImgPos}></Image>
            <Text>Image (1) represents a correlation value (r value) of 0.0, which is the lowest possible correlation value. Lines are randomly drawn between two parallel coordinates.

                Image (3) represents a correlation value of 0.5. Visually, the lines are not as scrambled as lines in the plot of r=0.0 to the left This is a moderate correlation where (x, y) values are somewhat related to each other

                Image (5) represents a correlation value of 1.0. When one value is high, the other value is high .</Text>
            <Title order={4}>
                For Negative Correlation
            </Title>
            <Image width={800} src={expImgNeg}></Image>
            <Text>Image (1) represents a correlation value (r value) of 0.0, which is the lowest possible correlation value. Lines are randomly drawn between two parallel coordinates.

                Image (3) represents a correlation value of -0.5. Visually, the lines are not as scrambled as lines in the plot of r=0.0 to the left This is a moderate correlation where (x, y) values are somewhat related to each other

                Image (5) represents a correlation value of -1.0. When one value is high, the other value is low .</Text>

        </Container>
    )
}
