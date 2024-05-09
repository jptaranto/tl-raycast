import { List, Color, Icon, ActionPanel, Action } from "@raycast/api"
import { ParsedReviewItem } from "../lib/parse"
import { ReactNode, FC } from "react"

interface EntriesListProps {
  empty: boolean
  children: ReactNode
}

export const EntriesList: FC<EntriesListProps> = ({ empty, children }) => (
  <>
    {empty && <List.EmptyView icon={"🍻"} title="All entries stored in remote system" />}
    {!empty && <List.Section title="Time entries">{children}</List.Section>}
  </>
)
