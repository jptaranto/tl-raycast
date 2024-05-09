import { List, Color, Icon, ActionPanel, Action } from "@raycast/api"
import { ParsedReviewItem } from "../lib/parse"
import { ReactNode, FC } from "react"
import { EditForm } from "./EditForm"
import { execHudCommand } from "../lib/execCommand"

interface EntriesListItemProps {
  id: string
  comment?: string
  issue: string
  time: string
  revalidate: Function
  actions?: ReactNode
}

export const EntriesListItem: FC<EntriesListItemProps> = ({ id, comment, issue, time, revalidate, actions = null }) => {
  return (
    <List.Item
      title={issue}
      subtitle={comment}
      accessories={[{ tag: { color: Color.Green, value: `${time}h` }, icon: Icon.Clock }]}
      actions={
        <ActionPanel>
          {actions}
          <Action.Push title="Edit" target={<EditForm id={id} time={time} revalidate={revalidate} />} />
          <Action.OpenInBrowser title="Open issue" url={`https://previousnext.atlassian.net/browse/${issue}`} />
        </ActionPanel>
      }
    />
  )
}
