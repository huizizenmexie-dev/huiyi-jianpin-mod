import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "xjm8do23p8";

export function initializeClarity() {
  Clarity.init(CLARITY_PROJECT_ID);
}
