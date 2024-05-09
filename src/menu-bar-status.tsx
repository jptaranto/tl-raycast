import { Color, Icon, MenuBarExtra } from "@raycast/api"
import { useExecTl } from "./lib/utils"
import { useMemo } from "react"
import { ParsedBitbar, parseBitbar } from "./lib/parse"
import { useBitBar, useEntries } from "./lib/hooks"

const MenuBarStatus = () => {
  const { isActive, statusText, isLoading } = useBitBar()
  const { entries } = useEntries()
  return (
    <MenuBarExtra icon={{ source: Icon.Stopwatch, tintColor: Color.PrimaryText }} tooltip="tl" isLoading={isLoading}>
      <MenuBarExtra.Item title="Status" />
      <MenuBarExtra.Item
        title={isLoading ? "Refreshing..." : statusText}
        icon={{ source: Icon.Dot, tintColor: isActive ? Color.Green : Color.Red }}
      />
      {!!entries.length && (
        <MenuBarExtra.Section>
          <MenuBarExtra.Item title="Time entries" />
          {entries.map((entry) => (
            <MenuBarExtra.Item key={entry.id} title={entry.comment} subtitle={`(${entry.time}h)`} />
          ))}
        </MenuBarExtra.Section>
      )}
    </MenuBarExtra>
  )
}

export default MenuBarStatus
