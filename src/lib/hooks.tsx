import { useMemo } from "react"
import {
  ParsedAliasItem,
  ParsedBitbar,
  ParsedReviewItem,
  parseAlias,
  parseBitbar,
  parseReview,
  parseTotal,
} from "./parse"
import { useExecTl } from "./utils"

interface EntriesResults {
  entries: ParsedReviewItem[]
  isLoading: boolean
  revalidate: Function
}

export const useEntries = (): EntriesResults => {
  const { isLoading, data, revalidate } = useExecTl<ParsedReviewItem[]>(["review"], parseReview)
  const entries = useMemo<ParsedReviewItem[]>(() => {
    return data ?? []
  }, [data])
  return {
    entries,
    isLoading,
    revalidate,
  }
}

interface TotalResult {
  total: string
  isLoading: boolean
  revalidate: Function
}

export const useTotal = (): TotalResult => {
  const { isLoading, data, revalidate } = useExecTl<string>(["total"], parseTotal)
  const total = useMemo<string>(() => {
    return data ?? "0"
  }, [data])
  return {
    total: `${total}h`,
    isLoading,
    revalidate,
  }
}

interface BitBarResult {
  isActive: boolean
  statusText: string
}

interface BitBarResults extends BitBarResult {
  isLoading: boolean
  revalidate: Function
}

export const useBitBar = (): BitBarResults => {
  const { isLoading, data, revalidate } = useExecTl<BitBarResult>(["bitbar"], parseBitbar)
  const { isActive, statusText } = useMemo<ParsedBitbar>(() => {
    return (
      data ?? {
        isActive: false,
        statusText: "Check configuration",
      }
    )
  }, [data])
  return {
    isActive,
    statusText,
    isLoading,
    revalidate,
  }
}

interface AliasResults {
  aliases: ParsedAliasItem[]
  isLoading: boolean
  revalidate: Function
}

export const useAliases = (): AliasResults => {
  const { isLoading, data, revalidate } = useExecTl<ParsedAliasItem[]>(["alias", "--list"], parseAlias)
  const aliases = useMemo<ParsedAliasItem[]>(() => {
    return data ?? []
  }, [data])
  return {
    aliases,
    isLoading,
    revalidate,
  }
}
