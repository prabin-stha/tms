import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/traffic/$id")({
  component: VehicleDetail,
});

function VehicleDetail() {
  const { id } = Route.useParams();

  return <div>Vehicle Number {id}</div>;
}
