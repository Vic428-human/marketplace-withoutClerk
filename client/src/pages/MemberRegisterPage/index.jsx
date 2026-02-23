import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/MemberRegisterPage/")({
  component: IndexRedirect,
});

function IndexRedirect() {
  return (
    <Navigate
      to="/MemberRegisterPage/register"
      replace
    />
  );
}