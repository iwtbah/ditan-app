import { useState } from "react";
import { Layers, Smartphone } from "lucide-react";
import { Outlet } from "react-router-dom";
import {
  ViewStateContext,
  type AppState,
  type SubState,
} from "@/contexts/view-state-context";

export function WorkspaceLayout() {
  const [appState, setAppState] = useState<AppState>("Normal");
  const [subState, setSubState] = useState<SubState>("Normal");

  return (
    <ViewStateContext.Provider value={{ appState, setAppState, subState, setSubState }}>
      <div className="flex h-screen w-full overflow-hidden bg-gray-100 font-sans text-gray-800">
        <div className="z-50 hidden w-72 shrink-0 flex-col gap-6 overflow-y-auto border-r border-gray-200 bg-white p-6 shadow-sm md:flex">
          <div>
            <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Layers size={22} className="text-gray-700" />
              状态管理器
            </h2>
            <p className="mb-6 text-[13px] leading-relaxed text-gray-500">
              切换下方选项，右侧的低保真原型会实时渲染对应的状态（模拟 Figma State Frames）。
            </p>

            <div className="mb-8">
              <h3 className="mb-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13px] font-bold text-gray-900">
                主页面状态 (Page Level)
              </h3>
              <div className="flex flex-col gap-3 px-2">
                {(["Normal", "Loading", "Empty", "Error"] as AppState[]).map((state) => (
                  <label key={state} className="group flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      checked={appState === state}
                      className="h-4 w-4 border-gray-300 text-gray-900 transition-colors focus:ring-gray-900"
                      name="appState"
                      onChange={() => setAppState(state)}
                      type="radio"
                    />
                    <span
                      className={`font-medium ${
                        appState === state ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {state} State
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[13px] font-bold text-gray-900">
                局部状态 (Sub-level)
              </h3>
              <p className="mb-4 px-2 text-[11px] text-gray-400">
                影响部分页面的子模块：
                <br />- 笔记详情的「评论区」
                <br />- 店铺详情的「笔记/评价」
              </p>
              <div className="flex flex-col gap-3 px-2">
                {(["Normal", "Loading", "Empty"] as SubState[]).map((state) => (
                  <label key={state} className="group flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      checked={subState === state}
                      className="h-4 w-4 border-gray-300 text-gray-900 transition-colors focus:ring-gray-900"
                      name="subState"
                      onChange={() => setSubState(state)}
                      type="radio"
                    />
                    <span
                      className={`font-medium ${
                        subState === state ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {state} State
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Smartphone size={14} />
              <span>移动端布局模拟器 (iPhone)</span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gray-200/50 p-0 md:p-6">
          <Outlet />
        </div>
      </div>
    </ViewStateContext.Provider>
  );
}
