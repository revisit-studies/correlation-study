import {Button, Center, Container, Modal, Title} from "@mantine/core";


function ExplainModal({opened, close, title, Content}) {
    return (
        <Modal
            opened={opened}
            onClose={close}
            fullScreen
            radius={0}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <Center>
            <Container m={10}>
                <Center>
                    <Title order={2}>{title}</Title>
                    <Content />
                </Center>

            </Container>
            </Center>
            <Center>
                <Button onClick={close}> NEXT </Button>
            </Center>
        </Modal>
    );
}

export default ExplainModal;
