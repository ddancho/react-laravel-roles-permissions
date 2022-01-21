import {
  Container,
  Wrapper,
  TableContainer,
  TableRow,
  TableHeader,
  TableData,
  PriorityContainer,
  Priority,
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
                  <PriorityContainer>
                    {[...Array(item.priority)].map((v, i) => (
                      <Priority key={i} />
                    ))}
                  </PriorityContainer>
                </TableData>
                <TableData>{item.in_charge.role}</TableData>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </Wrapper>
    </Container>
  );
}
