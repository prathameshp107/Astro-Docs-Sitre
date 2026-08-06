import { Nav } from './landing/Nav.tsx';
import FeedbackButton from './FeedbackButton.jsx';

export default function AppNav(props) {
  return (
    <>
      <Nav {...props} />
      <FeedbackButton />
    </>
  );
}

export { Nav as AppNav };

