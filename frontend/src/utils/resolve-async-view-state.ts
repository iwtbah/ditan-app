import type { AsyncViewState } from "@/types/common";

interface ResolveAsyncViewStateOptions {
  isEmpty?: boolean;
  isError?: boolean;
  isLoading?: boolean;
}

export function resolveAsyncViewState({
  isEmpty = false,
  isError = false,
  isLoading = false,
}: ResolveAsyncViewStateOptions): AsyncViewState {
  if (isLoading) {
    return "Loading";
  }

  if (isError) {
    return "Error";
  }

  if (isEmpty) {
    return "Empty";
  }

  return "Normal";
}
