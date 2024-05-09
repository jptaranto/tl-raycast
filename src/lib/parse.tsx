export const parseError = (data: string | Buffer): boolean => {
  if (data instanceof Buffer) {
    return true
  }
  const matchNoEntries = data.match(/All entries stored in remote system/g)
  return matchNoEntries ? false : true
}

export const parseTotal = (data: string): string => {
  const matchHours = data.match(/[0-9]+(.[0-9]+)?/g)
  return matchHours ? matchHours[0] : "0"
}

export interface ParsedBitbar {
  isActive: boolean
  statusText: string
}

export const parseBitbar = (data: string): ParsedBitbar => {
  const matchJobId = data.match(/^[0-9]+:\s/g)
  const matchInactive = data.match(/^Inactive/g)
  return {
    isActive: !matchInactive,
    statusText: matchJobId ? data.replace(matchJobId[0], "") : data,
  }
}

export interface ParsedStatusItem {
  id: string
  time: string
  issue: string
  issueName: string
}

export const parseStatus = (data: string): ParsedStatusItem[] => {
  const results: ParsedStatusItem[] = []
  const matchSlots = data.match(/(?<=^\|\s)[0-9]+/gm)

  if (!matchSlots) {
    return results
  }

  const matchTimes = data.match(/(?<=\|\s)[0-9:A-Za-z\s]+(?=\s\|\s\[)/gm)
  const matchIssues = data.match(/(?<=\[).*(?=\])/gm)
  const matchIssueNames = data.match(/(?<=\]\s).*(?=\|)/gm)

  matchSlots.forEach((slot, index) => {
    results.push({
      id: slot,
      time: matchTimes?.[index] ?? "",
      issue: matchIssues?.[index] ?? "",
      issueName: matchIssueNames?.[index]?.trim() ?? "",
    })
  })

  return results
}

export interface ParsedReviewItem {
  id: string
  time: string
  issue: string
  comment: string
}

export const parseReview = (data: string): ParsedReviewItem[] => {
  const results: ParsedReviewItem[] = []
  const matchSlots = data.match(/(?<=^\|\s)[0-9]+/gm)

  if (!matchSlots) {
    return results
  }

  const matchTimes = data.match(/(?<=\|\s)[0-9.0-9\s]+(?=\s\|\s\[)/gm)
  const matchIssues = data.match(/(?<=\[).*(?=\])/gm)
  // @todo needs work to better match all characters.
  const matchComments = data.match(/[a-zA-Z0-9,./\s]+(?=\s\|$)/gm)

  matchSlots.forEach((slot, index) => {
    results.push({
      id: slot,
      time: matchTimes?.[index]?.trim() ?? "",
      issue: matchIssues?.[index] ?? "",
      comment: matchComments?.[index + 1]?.trim() ?? "",
    })
  })

  return results
}

export interface ParsedAliasItem {
  alias: string
  issue: string
}

export const parseAlias = (data: string): ParsedAliasItem[] => {
  const results: ParsedAliasItem[] = []
  const matchAliases = data.match(/(?<=^\|\s)[a-z-]+/gm)

  if (!matchAliases) {
    return results
  }

  const matchIssues = data.match(/(?<=[a-z-]+\s+\|\s)[A-Za-z-[0-9]+/gm)

  matchAliases.forEach((alias, index) => {
    results.push({
      alias,
      issue: matchIssues?.[index + 1] ?? "",
    })
  })

  return results
}
