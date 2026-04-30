import { Button } from "../../ui/button";
import { ButtonGroup } from "../../ui/button-group";

export default function ProfileFilters() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        Latest
      </Button>
      <Button variant="outline" size="sm">
        Popular
      </Button>
      <Button variant="outline" size="sm">
        Oldest
      </Button>
    </ButtonGroup>
  );
}
