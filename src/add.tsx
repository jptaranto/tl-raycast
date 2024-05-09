import { Form, ActionPanel, Action } from "@raycast/api"
import { execToastCommand } from "./lib/execCommand"
import { useRef } from "react"

interface AddFormValues extends Form.Values {
  issue: string
  hours: string
  comment: string
  date: Date
}

const Add = () => {
  const issueField = useRef<Form.TextField>(null)
  const hoursField = useRef<Form.TextField>(null)
  const commentField = useRef<Form.TextField>(null)

  const handleAdd = async ({ issue, hours, comment, date }: AddFormValues) => {
    try {
      await execToastCommand({
        commands: ["add", issue, hours, `"${comment}"`, ...(date ? [`-s ${new Date(date).toISOString()}`] : [])],
        inProgress: `Adding time entry for ${issue}`,
        success: `Added ${hours} to ${issue}`,
        failure: "Couldn't add time entry",
        callback: () => {
          issueField.current?.focus()
          issueField.current?.reset()
          hoursField.current?.reset()
          commentField.current?.reset()
        },
      })
    } catch {}
  }
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add" onSubmit={(values: AddFormValues) => handleAdd(values)} />
        </ActionPanel>
      }
    >
      <Form.TextField ref={issueField} id="issue" title="Issue or alias" />
      <Form.TextField ref={hoursField} id="hours" title="Hours" />
      <Form.TextField ref={commentField} id="comment" title="Comment" />
      <Form.DatePicker id="date" title="Date" defaultValue={new Date()} type={Form.DatePicker.Type.Date} />
    </Form>
  )
}

export default Add
