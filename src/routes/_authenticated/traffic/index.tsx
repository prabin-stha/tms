import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/traffic/")({
  component: Traffic,
});

function Traffic() {
  return (
    <>
      <h1 className="mb-6">Traffic</h1>
      {Array.from({ length: 10 }, (_, idx) => (
        <Link className="block" to="/traffic/$id" params={{ id: idx.toString() }}>
          Vehicle {idx}
        </Link>
      ))}
    </>
  );
}
