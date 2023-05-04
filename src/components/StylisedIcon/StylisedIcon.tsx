import React, { ReactElement } from 'react'
import styled from '@emotion/styled'
import { color, device, space } from '../../theme'
import { css } from '@emotion/react'

export enum StylisedIconVariant {
  default = 'default',
  light = 'light',
}

export enum StylisedIconSize {
  large = 'large',
  small = 'small',
}

interface IconBackgroundProps {
  size: keyof typeof StylisedIconSize
  variant: keyof typeof StylisedIconVariant
}

const IconBackground = styled.div<IconBackgroundProps>`
  background-color: var(
    --_stylisedIconBackgroundColor,
    ${color.elevatedBackground}
  );
  border-radius: 50%;
  opacity: 0.6;
  padding: ${space[16]};
  inline-size: var(--_stylisedIconBackgroundSize, ${space[64]});
  block-size: var(--_stylisedIconBackgroundSize, ${space[64]});
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    inline-size: var(--_stylisedIconIconSize, ${space[24]});
    block-size: var(--_stylisedIconIconSize, ${space[24]});
    max-inline-size: var(--_stylisedIconIconSize, ${space[24]});
    max-block-size: var(--_stylisedIconIconSize, ${space[24]});

    svg {
      color: var(--_stylisedIconIconColor, ${color.foregroundMuted});
    }
  }

  @media ${device.tablet} {
    --_stylisedIconBackgroundSize: ${space[72]};
    --_stylisedIconIconSize: ${space[32]};
  }

  ${({ size }) =>
    size === 'large' &&
    css`
      --_stylisedIconBackgroundSize: ${space[80]};
      --_stylisedIconIconSize: ${space[32]};

      @media ${device.tablet} {
        --_stylisedIconBackgroundSize: ${space[96]};
        --_stylisedIconIconSize: ${space[40]};
      }
    `}

  ${({ variant }) =>
    variant === 'light' &&
    css`
      --_stylisedIconBackgroundColor: ${color.lightElevatedBackground};
      --_stylisedIconIconColor: ${color.darkForegroundMuted};
    `}
`

interface Props {
  icon: ReactElement
  size?: keyof typeof StylisedIconSize
  variant?: keyof typeof StylisedIconVariant
}

export const StylisedIcon = ({
  icon,
  size = StylisedIconSize.small,
  variant = StylisedIconVariant.default,
}: Props) => (
  <IconBackground size={size} variant={variant}>
    {icon}
  </IconBackground>
)
