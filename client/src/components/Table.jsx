import {
  Container,
  Wrapper,
  TableContainer,
  TableRow,
  TableHeader,
  TableData,
  Priority,
  ActionsContainer,
  Action,
} from "./styles/Table.styled";

export default function Table({ data = [] }) {
  return (
    <Container>
      <Wrapper>
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
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableData>{item.name}</TableData>
                <TableData>{item.in_charge.name}</TableData>
                <TableData>{item.due_date}</TableData>
                <TableData>
                  {[...Array(item.priority)].map((v, i) => (
                    <Priority key={i} />
                  ))}
                </TableData>
                <TableData>
                  <ActionsContainer>
                    <Action>Edit</Action>
                  </ActionsContainer>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Wrapper>
    </Container>
  );
}
