import { showHUD, showToast, Toast } from "@raycast/api"
import { execTl } from "./utils"

interface execCommandArgs {
  commands: string[]
  inProgress: string
  success: string
  failure: string
  callback?: Function
}

export const execHudCommand = async ({
  commands,
  inProgress,
  success,
  failure,
  callback = () => {},
}: execCommandArgs) => {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: inProgress,
  })
  try {
    await execTl(commands)
    showHUD(success)
    callback()
  } catch {
    showHUD(failure)
  }
}

export const execToastCommand = async ({
  commands,
  inProgress,
  success,
  failure,
  callback = () => {},
}: execCommandArgs) => {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: inProgress,
  })
  try {
    await execTl(commands)
    toast.style = Toast.Style.Success
    toast.title = success
    callback()
  } catch {
    toast.style = Toast.Style.Failure
    toast.title = failure
  }
}
