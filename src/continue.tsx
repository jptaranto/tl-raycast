import { List, ActionPanel, Action } from "@raycast/api"
import { useEntries } from "./lib/hooks"
import { EntriesList } from "./components/EntriesList"
import { execHudCommand } from "./lib/execCommand"
import { EntriesListItem } from "./components/EntriesListItem"

const Continue = () => {
  const { entries, isLoading, revalidate } = useEntries()
  const handleContinue = async (id: string | null = null) => {
    await execHudCommand({
      commands: ["continue", ...(id ? [id] : [])],
      inProgress: "Continuing entry",
      success: "Continuing entry",
      failure: "Entry could not be continued",
      callback: revalidate,
    })
  }
  return (
    <List isLoading={isLoading}>
      {!!entries.length && (
        <List.Item
          title="Continue active time entry"
          actions={
            <ActionPanel>
              <Action title="Continue" onAction={() => handleContinue()} />
            </ActionPanel>
          }
        />
      )}
      <EntriesList empty={!entries.length}>
        {entries.map((entry) => (
          <EntriesListItem
            key={entry.id}
            id={entry.id}
            issue={entry.issue}
            time={entry.time}
            comment={entry.comment}
            revalidate={revalidate}
            actions={<Action title="Continue" onAction={() => handleContinue(entry.id)} />}
          />
        ))}
      </EntriesList>
    </List>
  )
}

export default Continue
