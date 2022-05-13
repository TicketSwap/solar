import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin-block: -1px;
  margin-inline: -1px;
  padding-block: 0;
  padding-inline: 0;
  overflow: hidden;
  position: absolute;
`

export const VisuallyHidden = styled.div`
  ${visuallyHidden};
`
