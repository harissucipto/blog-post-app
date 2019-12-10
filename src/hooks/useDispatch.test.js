import { renderHook, act } from "@testing-library/react-hooks";
import { StateContextWrapper } from "./testUtils";
import useUserState from "./useUserState";
import useDispatch from "./useDispatch";

test("should use dispatch", () => {
  const { result } = renderHook(() => useDispatch(), {
    wrapper: StateContextWrapper
  });

  expect(typeof result.current).toBe("function");
});

test("should update user state on login", () => {
  const { result } = renderHook(
    () => ({ state: useUserState(), dispatch: useDispatch() }),
    { wrapper: StateContextWrapper }
  );

  act(() => result.current.dispatch({ type: "LOGIN", username: "Test User" }));
  expect(result.current.state).toBe("Test User");
});

test("should update user state on register", () => {
  const { result } = renderHook(
    () => ({ state: useUserState(), dispatch: useDispatch() }),
    { wrapper: StateContextWrapper }
  );

  act(() =>
    result.current.dispatch({ type: "REGISTER", username: "Test User" })
  );
  expect(result.current.state).toBe("Test User");
});
