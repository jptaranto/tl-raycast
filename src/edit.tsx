import { Color, Icon, List, showToast, Toast, ActionPanel, Action } from "@raycast/api"
import { execTl, useExecTl } from "./lib/utils"
import { useMemo } from "react"
import { ParsedReviewItem, parseReview } from "./lib/parse"
import { execToastCommand } from "./lib/execCommand"
import { useEntries } from "./lib/hooks"
import { EntriesList } from "./components/EntriesList"
import { EntriesListItem } from "./components/EntriesListItem"
import { EditForm } from "./components/EditForm"

const Edit = () => {
  const { entries, isLoading, revalidate } = useEntries()
  return (
    <List isLoading={isLoading}>
      <EntriesList empty={!entries.length}>
        {entries.map((entry) => (
          <EntriesListItem
            key={entry.id}
            id={entry.id}
            issue={entry.issue}
            time={entry.time}
            revalidate={revalidate}
            comment={entry.comment}
          />
        ))}
      </EntriesList>
    </List>
  )
}

export default Edit
