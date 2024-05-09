import { List, confirmAlert, Alert, Action, ActionPanel } from "@raycast/api"
import { execToastCommand } from "./lib/execCommand"
import { useEntries } from "./lib/hooks"
import { EntriesList } from "./components/EntriesList"
import { EntriesListItem } from "./components/EntriesListItem"

const Delete = () => {
  const { entries, isLoading, revalidate } = useEntries()
  const handleDelete = async (id: string) => {
    await confirmAlert({
      title: "Delete time entry?",
      primaryAction: {
        title: "Delete",
        style: Alert.ActionStyle.Destructive,
        onAction: async () =>
          await execToastCommand({
            commands: ["delete", "-y", id],
            inProgress: "Deleting entry",
            success: "Entry deleted",
            failure: "Entry could not be deleted",
            callback: revalidate,
          }),
      },
    })
  }
  return (
    <List isLoading={isLoading}>
      <EntriesList empty={!entries.length}>
        {entries.map((entry) => (
          <EntriesListItem
            key={entry.id}
            id={entry.id}
            issue={entry.issue}
            time={entry.time}
            comment={entry.comment}
            revalidate={revalidate}
            actions={<Action title="Delete" onAction={() => handleDelete(entry.id)} />}
          />
        ))}
      </EntriesList>
    </List>
  )
}

export default Delete
