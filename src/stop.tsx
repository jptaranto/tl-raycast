import { showToast, Toast } from "@raycast/api"
import { execTl } from "./lib/utils"
import { execHudCommand } from "./lib/execCommand"

const Stop = async () => {
  return execHudCommand({
    commands: ["stop"],
    inProgress: "Stopping active time entry",
    success: "Active entry time stopped",
    failure: "No active time entry",
  })
}

export default Stop
