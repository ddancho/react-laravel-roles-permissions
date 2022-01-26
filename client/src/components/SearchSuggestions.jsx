import { Dropdown, List, Item } from "./styles/SearchSuggestions.styled";

export default function SearchSuggestions({ users = [], onClickSuggestion }) {
  const handleClick = (e) => {
    onClickSuggestion(e.target.value, e.target.innerText);
  };

  return (
    <Dropdown>
      <List>
        {users.map((user) => (
          <Item key={user.id} value={user.id} onClick={handleClick}>
            {user.name}
          </Item>
        ))}
      </List>
    </Dropdown>
  );
}
