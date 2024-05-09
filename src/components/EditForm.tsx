import { Form, ActionPanel, Action, useNavigation } from "@raycast/api"
import { execToastCommand } from "../lib/execCommand"
import { FC, useRef } from "react"

interface EditFormProps {
  id: string
  time: string
  revalidate: Function
}

interface EditFormValues extends Form.Values {
  hours: string
}

export const EditForm: FC<EditFormProps> = ({ id, time, revalidate }) => {
  const { pop } = useNavigation()
  const handleEdit = async ({ hours }: EditFormValues) => {
    try {
      await execToastCommand({
        commands: ["edit", id, hours],
        inProgress: `Editing time entry`,
        success: `Time entry changed to ${hours}`,
        failure: "Couldn't edit time entry",
      })
      revalidate()
      pop()
    } catch {}
  }
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Edit" onSubmit={(values: EditFormValues) => handleEdit(values)} />
        </ActionPanel>
      }
    >
      <Form.TextField id="hours" title="Hours" defaultValue={time} />
    </Form>
  )
}
