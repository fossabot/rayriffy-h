import React, { useContext } from 'react'

import LazyLoad from 'react-lazyload'

import styled from '@emotion/styled'

import { Settings } from '../../store'

import { BluredImageProps } from '../@types'

interface ImageCoverProps {
  blur: boolean
}

const ImageCover = styled('img')<ImageCoverProps>`
  width: 100%;
  margin: 0;

  ${(props: ImageCoverProps) => props.blur && `filter: blur(15px);`}
`

const Component: React.FC<BluredImageProps> = props => {
  const { height, src, alt } = props

  const { 0: settings } = useContext(Settings)

  return (
    <LazyLoad height={height}>
      <ImageCover blur={settings.safemode} src={src} alt={alt} height='100%' />
    </LazyLoad>
  )
}

export const BluredImage = React.memo(Component)