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
import { Suspense, lazy } from "react";
import { ModelRoutes } from "../helpers/modelRoutes";
import { TaskActions } from "../helpers/modelActions";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const IsAuthorized = lazy(() => import("./IsAuthorized"));

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
                    <Priority key={i} status={item.status} />
                  ))}
                </TableData>
                <TableData>
                  <ActionsContainer>
                    <Suspense fallback={<BeatLoader size={16} />}>
                      <IsAuthorized model={ModelRoutes.task} action={TaskActions.updateTask} id={item.id}>
                        <Link to={`/tasks/${item.id}/edit`}>
                          <Action>Edit</Action>
                        </Link>
                      </IsAuthorized>
                    </Suspense>
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
