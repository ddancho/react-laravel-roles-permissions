import {
  Container,
  Wrapper,
  ButtonAction,
  Button,
  TableContainer,
  TableRow,
  TableHeader,
  TableData,
} from "./styles/Table.styled";

const arr = ["some data1", "some data2", "some data3", "some data4", "somedata5"];

export default function Table() {
  return (
    <Container>
      <Wrapper>
        <ButtonAction>
          <Button>New Task</Button>
        </ButtonAction>
        <TableContainer>
          <thead>
            <TableRow header={true}>
              <TableHeader>Task</TableHeader>
              <TableHeader>In Charge</TableHeader>
              <TableHeader>Due Date</TableHeader>
              <TableHeader>Priority</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              {arr.map((sd) => {
                return <TableData>{sd}</TableData>;
              })}
            </TableRow>
            <TableRow>
              {arr.map((sd) => {
                return <TableData>{sd}</TableData>;
              })}
            </TableRow>
            <TableRow>
              {arr.map((sd) => {
                return <TableData>{sd}</TableData>;
              })}
            </TableRow>
          </tbody>
        </TableContainer>
      </Wrapper>
    </Container>
  );
}
