import { createFileRoute } from "@tanstack/react-router";

const Messages = () => {
  return <div> messages </div>;
};

export default Messages;

export const Route = createFileRoute("/Messages")({
  component: Messages,
});
