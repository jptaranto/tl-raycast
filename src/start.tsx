import { LaunchProps } from "@raycast/api"
import { execTl } from "./lib/utils"
import { execHudCommand } from "./lib/execCommand"

const Start = async (props: LaunchProps<{ arguments: Arguments.Start }>) => {
  const { issue, comment } = props.arguments
  return execHudCommand({
    commands: ["start", issue, `"${comment}"`],
    inProgress: `Starting time entry for ${issue}`,
    success: `Time entry for ${issue} started`,
    failure: "Couldn't start time entry",
  })
}

export default Start
