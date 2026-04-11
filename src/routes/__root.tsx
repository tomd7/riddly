import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="h-full w-full bg-[url('/background.png')] bg-cover bg-center">
      <div className="w-full h-full p-4 bg-white/70 backdrop-blur overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
