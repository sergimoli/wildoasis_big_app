//example to use the most basic and most fundamental way in wich we can use styled components in order to basically build small resusable components

import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

//the styled function here also returns a component.

const StyledApp = styled.div`
  background-color: var(--color-grey-0);
  /* background-color: orangered;ç */
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* this component: GlobalStyles created, doesn't accept any children  and it needs to be a sibling of all other components. */}
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button>Check in!</Button>
              <Button variation="secondary" size="small">
                Check out!
              </Button>
            </div>
          </Row>
          <Heading as="h3">Form</Heading>
          <Row type="vertical">
            <form>
              <Input type="number" placeholder="Number of guests" />;
              <Input type="number" placeholder="Number of guests" />;
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
