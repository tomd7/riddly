import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="h-full w-full bg-[url('/background.png')] bg-cover bg-center">
      <div className="w-full h-full flex flex-col justify-center items-center p-4 gap-10 bg-white/70 backdrop-blur">
        <Outlet />
      </div>
    </div>
  );
}
