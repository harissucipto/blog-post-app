import { renderHook } from "@testing-library/react-hooks";
import useTheme from "./useTheme";
import { ThemeContextWrapper } from "./testUtils";

// diwrapper untuk mengetest context karena
// wrraper itu provider
// sedangakn useTheme memebutuhkan provider nya
test("should use theme", () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: ThemeContextWrapper
  });

  expect(result.current.primaryColor).toBe("deepskyblue");
  expect(result.current.secondaryColor).toBe("coral");
});
