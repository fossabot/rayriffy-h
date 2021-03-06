import { fetch } from '@rayriffy-h/fetch'

import { RawHentai } from '../@types/RawHentai'
import { APIResponse } from '../@types/APIResponse'

export const getRawHentai = async (
  id: number | string,
  server?: boolean
): Promise<RawHentai> => {
  if (server) {
    const out = await fetch<RawHentai>(`https://nhentai.net/api/gallery/${id}`)
    return out
  } else {
    const out = await fetch<APIResponse<RawHentai>>(
      `https://h.api.rayriffy.com/v1/gallery/${id}`
    )

    const rawHentai = out.response.data
    return {
      ...rawHentai,
      title: {
        ...rawHentai.title,
        english: rawHentai.title.english === null ? rawHentai.title.japanese : rawHentai.title.english,
        japanese: rawHentai.title.japanese === null ? rawHentai.title.english : rawHentai.title.japanese,
      },
    }
  }
}
