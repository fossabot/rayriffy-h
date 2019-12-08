import React, { useContext, useEffect, useState } from 'react'

import { chunk, get, isEmpty } from 'lodash'

import { Box, Flex, IconButton, Input, useColorMode } from '@chakra-ui/core'

import Heading from '../../../core/components/heading'
import Poster from '../../../core/components/poster'
import Pagination from './pagination'

import { searchHentai } from '../services/searchHentai'

import { Subtitle } from '../../../app/context'

import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'
import { IProps } from '../@types/IProps'

const SearchComponent: React.FC<IProps> = props => {
  const { raw, skip } = props.pageContext

  const { colorMode } = useColorMode()

  const [, setSubtitle] = useContext(Subtitle)

  const [query, setQuery] = useState<string>('')
  const [res, setRes] = useState<IFetchedRaw[]>([])

  const [page, setPage] = useState<number>(1)
  const [renderedRaw, setRenderedRaw] = useState<IFetchedRaw[]>([])

  const renderPage = (raws: IFetchedRaw[], page: number) => {
    setPage(page)
    setRenderedRaw(get(chunk(raws, skip), page - 1))
  }

  const searchButtonHandler = () => {
    if (query === '') {
      setRes([])
    } else {
      searchHentai(query, raw).then(results => setRes(results))
    }
  }

  useEffect(() => {
    if (!isEmpty(res)) {
      setPage(1)
      renderPage(res, 1)
    }
  }, [res])

  useEffect(() => {
    setSubtitle(`search`)
  }, [])

  return (
    <Box pt={3}>
      <Flex justifyContent='center'>
        <Box width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}>
          <Flex justifyContent='center'>
            <Input
              placeholder='Search'
              value={query}
              onChange={e => setQuery(e.target.value)}
              color={colorMode === 'dark' ? 'white' : undefined}
              _placeholder={{
                color: colorMode === 'dark' ? 'white' : 'gray.500',
              }}
              onKeyDown={e =>
                e.key === 'Enter' ? searchButtonHandler() : null
              }
            />
            <IconButton
              aria-label='Search'
              icon='search'
              variantColor='blue'
              onClick={() => searchButtonHandler()}
              ml={4}
            />
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent='center'>
        <Box width={22 / 24}>
          {isEmpty(res) ? (
            <Heading size='lg' textAlign='center' pt={6}>
              No result
            </Heading>
          ) : (
            <Box>
              <Flex justifyContent='center'>
                <Box width={18 / 24} py={6}>
                  <Pagination
                    current={page}
                    max={chunk(res, skip).length}
                    onChange={page => renderPage(res, page)}
                  />
                </Box>
              </Flex>
              <Flex justifyContent='center'>
                <Box width={22 / 24}>
                  <Flex flexWrap='wrap' alignItems='center'>
                    {renderedRaw.map(hentai => (
                      <Poster
                        key={`poster-${hentai.data.id}`}
                        raw={hentai.data.raw}
                      />
                    ))}
                  </Flex>
                </Box>
              </Flex>
              <Flex justifyContent='center'>
                <Box width={18 / 24} py={6}>
                  <Pagination
                    current={page}
                    max={chunk(res, skip).length}
                    onChange={page => renderPage(res, page)}
                  />
                </Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default SearchComponent
