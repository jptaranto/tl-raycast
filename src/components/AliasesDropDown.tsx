import { FC } from "react"
import { Form } from "@raycast/api"
import { ParsedAliasItem } from "../lib/parse"

interface AliasesListProps {
  aliases: ParsedAliasItem[] | undefined
}

export const AliasesList: FC<AliasesListProps> = ({ aliases }) => (
  <>
    {aliases && (
      <Form.Dropdown.Section title="Aliases">
        {aliases.map((alias) => (
          <Form.Dropdown.Item
            key={`${alias.alias}.${alias.issue}`}
            value={alias.alias}
            title={`${alias.alias} (${alias.issue})`}
          />
        ))}
      </Form.Dropdown.Section>
    )}
  </>
)
