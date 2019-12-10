import { renderHook } from "@testing-library/react-hooks";
import useUserState from "./useUserState";
import { StateContextWrapper } from "./testUtils";

test("should use user state", () => {
  const { result } = renderHook(() => useUserState(), {
    wrapper: StateContextWrapper
  });

  expect(result.current).toBe("");
});
