import { Outlet } from "react-router-dom";

export function WorkspaceLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 font-sans text-gray-800">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gray-200/50 p-0 md:p-6">
        <Outlet />
      </div>
    </div>
  );
}
