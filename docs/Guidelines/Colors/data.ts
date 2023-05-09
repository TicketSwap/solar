import { color } from '../../../src/theme'

export const colors = [
  {
    label: 'Earth',
    variant: color.earth,
    cymk: '83 0 0 0',
    rgb: '0 182 240',
    hex: '#00B6F0',
    description:
      'This is our main color we use for both UI and marketing expressions. It’s a core asset to our brand and we use it with care.',
    keyWords: ['Trust', 'Secure', 'Friendliness', 'Loyalty'],
  },
  {
    label: 'Mars',
    variant: color.mars,
    cymk: '83 0 0 0',
    rgb: '0 182 240',
    hex: '#FE4A49',
    description:
      'This color is generally used to warn users for serious problems. Mars is a hard red tone, with a touch of friendliness. We insist, but in a nice way.',
    keyWords: ['Passion', 'Energy', 'Strength', 'Courage'],
  },
  {
    label: 'Titan',
    variant: color.titan,
    cymk: '83 0 0 0',
    rgb: '0 182 240',
    hex: '#00CE5C',
    description:
      'This is a positive color that attracts attention in a good way. Titan is used for highlighting positive touchpoints with the user, such as selling and buying a ticket.',
    keyWords: ['Luck', 'Success', 'Harmony', 'Growth', 'Money'],
  },
  {
    label: 'Sun',
    variant: color.sun,
    cymk: '83 0 0 0',
    rgb: '0 182 240',
    hex: '#FFA600',
    description:
      'This color is used to point out potential problems. It asks for action, but in a playful manner. Sun is a less attractive color than Mars, but able to solve most problems.',
    keyWords: ['Action', 'Haste', 'Playful', 'Confident', 'Change'],
  },
  {
    label: 'Space',
    variant: '#00131A',
    cymk: '83 0 0 0',
    rgb: '0 182 240',
    hex: '#00131A',
    description:
      'This color is the overall tone we use in our UI. It is based on blue, which is in harmony with Earth. A friendly and warm tone that connects all colours.',
    keyWords: ['Flexible', 'Stable', 'Serious', 'Strong'],
  },
  {
    label: 'Stardust',
    variant: '#CCD0D1',
    cymk: '83 0 0 0',
    rgb: '0 182 240',
    hex: '#CCD0D1',
    description:
      'This tone is crucial within UI elements like forms. It is in harmony with white space and it feels modern with the blue tone blended in.',
    keyWords: ['Depth', 'Warmth', 'Clarity', 'Focus'],
  },
]

export const semanticColors = [
  {
    title: 'Brand',
    colors: [
      {
        label: 'Brand',
        variant: color.brand,
        hex: '#00B6F0',
        foreground: color.lightForeground,
      },
      {
        label: 'On Brand',
        variant: color.onBrand,
        hex: '#FFFFFF',
        foreground: color.onBrand,
      },
    ],
  },
  {
    title: 'Foreground',
    colors: [
      {
        label: 'Foreground',
        variant: color.foreground,
        hex: '#1A2129',
        foreground: color.lightForeground,
      },
      {
        label: 'Foreground Muted',
        variant: color.foregroundMuted,
        hex: '#667175',
        foreground: color.lightForeground,
      },
      {
        label: 'Foreground Subtle',
        variant: color.foregroundSubtle,
        hex: '#99A1A3',
        foreground: color.lightForeground,
      },
    ],
  },
  {
    title: 'Background',
    colors: [
      {
        label: 'Background',
        variant: color.background,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
      {
        label: 'Elevated Background',
        variant: color.elevatedBackground,
        hex: '#F5F5F6',
        foreground: color.darkForeground,
      },
    ],
  },
  {
    title: 'Action',
    colors: [
      {
        label: 'Action',
        variant: color.action,
        hex: '#00B6F0',
        foreground: color.onAction,
      },
      {
        label: 'Action Background',
        variant: color.actionBackground,
        hex: '#F0FBFE0F',
        foreground: color.darkForeground,
      },
      {
        label: 'On Action',
        variant: color.onAction,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
    ],
  },
  {
    title: 'Success',
    colors: [
      {
        label: 'Success',
        variant: color.success,
        hex: '#00CE5C',
        foreground: color.onSuccess,
      },
      {
        label: 'Success Background',
        variant: color.successBackground,
        hex: '#EEFCF4',
        foreground: color.darkForeground,
      },
      {
        label: 'On Success',
        variant: color.onSuccess,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
    ],
  },
  {
    title: 'Warning',
    colors: [
      {
        label: 'Warning',
        variant: color.warning,
        hex: '#FFA600',
        foreground: color.onWarning,
      },
      {
        label: 'Warning Background',
        variant: color.warningBackground,
        hex: '#FFF8EB',
        foreground: color.darkForeground,
      },
      {
        label: 'On Warning',
        variant: color.onWarning,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
    ],
  },
  {
    title: 'Failure',
    colors: [
      {
        label: 'Failure',
        variant: color.failure,
        hex: '#FE4A49',
        foreground: color.onFailure,
      },
      {
        label: 'Failure Background',
        variant: color.failureBackground,
        hex: '#FFF4F4',
        foreground: color.darkForeground,
      },
      {
        label: 'On Failure',
        variant: color.onFailure,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
    ],
  },
  {
    title: 'Info',
    colors: [
      {
        label: 'Info',
        variant: color.info,
        hex: '#00B6F0',
        foreground: color.onInfo,
      },
      {
        label: 'Info Background',
        variant: color.infoBackground,
        hex: '#F0FBFE',
        foreground: color.darkForeground,
      },
      {
        label: 'On Info',
        variant: color.onInfo,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
    ],
  },
  {
    title: 'Inactive',
    colors: [
      {
        label: 'Inactive',
        variant: color.inactive,
        hex: '#00B6F0',
        foreground: color.onInactive,
      },
      {
        label: 'Inactive Background',
        variant: color.inactiveBackground,
        hex: '#F0FBFE',
        foreground: color.darkForeground,
      },
      {
        label: 'On Inactive',
        variant: color.onInactive,
        hex: '#FFFFFF',
        foreground: color.lightForeground,
      },
    ],
  },
  {
    title: 'Miscellaneous',
    colors: [
      {
        label: 'Accent',
        variant: color.accent,
        hex: '#FE4A49',
        foreground: color.lightForeground,
      },
      {
        label: 'Stroke',
        variant: color.stroke,
        hex: '#E5E7E8',
        foreground: color.darkForeground,
      },
      {
        label: 'Stroke Strong',
        variant: color.strokeStrong,
        hex: '#CCD0D1',
        foreground: color.darkForeground,
      },
      {
        label: 'Shadow',
        variant: color.shadow,
        hex: '#1A2129',
        foreground: color.lightForeground,
      },
      {
        label: 'Inverted foreground',
        variant: color.invertedForeground,
        hex: '#FFFFFF',
        foreground: color.invertedBackground,
      },
      {
        label: 'Inverted background',
        variant: color.invertedBackground,
        hex: '#1A2129',
        foreground: color.invertedForeground,
      },
    ],
  },
  {
    title: 'Palette',
    colors: [
      {
        label: 'Earth',
        variant: color.earth,
        hex: '#00B6F0',
        foreground: color.onInfo,
      },
      {
        label: 'Titan',
        variant: color.titan,
        hex: '#00CE5C',
        foreground: color.onSuccess,
      },
      {
        label: 'Sun',
        variant: color.sun,
        hex: '#FFA600',
        foreground: color.onWarning,
      },
      {
        label: 'Mars',
        variant: color.mars,
        hex: '#FE4A49',
        foreground: color.onFailure,
      },
    ],
  },
  {
    title: 'Theme Independent',
    colors: [
      {
        label: 'Light Background',
        variant: color.lightBackground,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
      {
        label: 'Light Elevated Background',
        variant: color.lightElevatedBackground,
        hex: '#F5F5F6',
        foreground: color.darkForeground,
      },
      {
        label: 'Light Foreground',
        variant: color.lightForeground,
        hex: '#FFFFFF',
        foreground: color.darkForeground,
      },
      {
        label: 'Light Foreground Muted',
        variant: color.lightForegroundMuted,
        hex: '#99A1A3',
        foreground: color.lightForeground,
      },
      {
        label: 'Dark Background',
        variant: color.darkBackground,
        hex: '#1A2129',
        foreground: color.lightForeground,
      },
      {
        label: 'Dark Elevated Background',
        variant: color.darkElevatedBackground,
        hex: '#00131A',
        foreground: color.lightForeground,
      },
      {
        label: 'Dark Foreground',
        variant: color.darkForeground,
        hex: '#1A2129',
        foreground: color.lightForeground,
      },
      {
        label: 'Dark Foreground Muted',
        variant: color.darkForegroundMuted,
        hex: '#667175',
        foreground: color.lightForeground,
      },
    ],
  },
]
