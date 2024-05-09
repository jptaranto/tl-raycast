import { exec } from "node:child_process"
import { promisify } from "node:util"
import { getPreferenceValues } from "@raycast/api"
import { useExec } from "@raycast/utils"
import { ParseExecOutputHandler } from "@raycast/utils/dist/exec-utils"
import { parseError } from "./parse"

const execPromise = promisify(exec)

export interface Preferences {
  phpPath: string
  tlPath: string
}

const { phpPath, tlPath } = getPreferenceValues<Preferences>()

export const useExecTl = <ParseFunctionReturnType,>(commands: string[], parseOutput: Function) => {
  const handleParse: ParseExecOutputHandler<ParseFunctionReturnType> = ({ stdout, stderr, exitCode }) => {
    if (exitCode === 1) {
      const shouldError = parseError(stderr)
      if (shouldError) {
        return undefined
      }
    }
    return parseOutput(stdout)
  }
  return useExec(phpPath, [tlPath, ...commands], { parseOutput: handleParse })
}

export const execTl = async (commands: string[]) => {
  return await execPromise([phpPath, tlPath, ...commands].join(" "))
}
