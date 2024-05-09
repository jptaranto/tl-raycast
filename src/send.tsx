import { showToast, Toast, showHUD, Icon, Color } from "@raycast/api"
import { execTl } from "./lib/utils"
import { List, ActionPanel, Action, confirmAlert } from "@raycast/api"
import { useEntries, useTotal } from "./lib/hooks"
import { EntriesList } from "./components/EntriesList"
import { EntriesListItem } from "./components/EntriesListItem"
import { EditForm } from "./components/EditForm"

const Send = () => {
  const { entries, isLoading, revalidate } = useEntries()
  const { total, revalidate: revalidateTotal } = useTotal()
  const handleRevalidate = () => {
    revalidate()
    revalidateTotal()
  }
  const handleSend = async () => {
    await confirmAlert({
      title: "Send all entries to backend?",
      primaryAction: {
        title: "Send",
        onAction: async () => {
          const toast = await showToast({
            style: Toast.Style.Animated,
            title: "Sending time entries",
          })
          try {
            await execTl(["tag-all"])
            await execTl(["send"])
            showHUD("All time entires sent 🎉")
            handleRevalidate()
          } catch {
            showHUD("Couldn't send time entries")
          }
        },
      },
    })
  }
  return (
    <List isLoading={isLoading}>
      {!!entries.length && (
        <List.Item
          title={`Send ${total} to backend`}
          actions={
            <ActionPanel>
              <Action title="Send" onAction={() => handleSend()} />
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
            revalidate={handleRevalidate}
          />
        ))}
      </EntriesList>
    </List>
  )
}

export default Send
