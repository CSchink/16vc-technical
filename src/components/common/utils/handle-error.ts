import iTools from "../../../api/utils/i-tools";

/**
 * Function to abstract and type guard errors from the App
 * @param e Unknown error
 * @returns Void
 */
export const handleException = (e: unknown): void => {
  if (typeof e === "string") {
    iTools.log(e);
  } else if (e instanceof Error) {
    iTools.log(e.message);
  }
};
