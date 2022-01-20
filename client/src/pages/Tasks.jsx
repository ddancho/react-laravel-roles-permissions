import { Container, Wrapper, Button } from "./styles/Tasks.styled";
import Table from "../components/Table";

export default function Tasks() {
  return (
    <Container>
      <Wrapper>
        <Button>New Task</Button>
        <Table />
      </Wrapper>
    </Container>
  );
}
