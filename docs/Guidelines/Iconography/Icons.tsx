import React, { ReactElement, useState } from 'react'
import styled from '@emotion/styled'
import * as Icon from '../../../src/icons'
import { device, fontSize, radius, SmallText, space } from '../../../src'
import { BaseStyles } from '../../../src/components/BaseStyles'

const IconGrid = styled.div`
  display: grid;
  grid-gap: ${space[8]};
  grid-template-columns: repeat(auto-fit, minmax(${space[128]}, 1fr));
`

const IconName = styled(SmallText)`
  font-size: ${fontSize[12]};
  margin-block-start: ${space[8]};

  @media ${device.tablet} {
    font-size: ${fontSize[12]};
  }
`

const IconBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  word-wrap: no-wrap;
  text-align: center;
  padding-block: ${space[12]};
  padding-inline: ${space[4]};
  background-color: rgb(245, 245, 246); //Stardust
  border-radius: ${radius.md};
`

const CopyButton = styled.button`
  position: absolute;
  top: ${space[4]};
  right: ${space[4]};
  border: none;
  background-color: transparent;
  cursor: pointer;
`

interface IconWrapperProps {
  icon: ReactElement
  name: string
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, name }) => {
  const [copied, setCopied] = useState(false)

  return (
    <IconBlock>
      <BaseStyles></BaseStyles>
      {icon}
      <IconName>{name}</IconName>
      <CopyButton
        onClick={() => {
          setCopied(true)
          navigator.clipboard.writeText(`<${name} title="${name}" />`)

          setTimeout(() => {
            setCopied(false)
          }, 2000)
        }}
      >
        {copied ? (
          <Icon.Checkmark size={12} />
        ) : (
          <Icon.Copy title="Copy name" size={12} />
        )}
      </CopyButton>
    </IconBlock>
  )
}

export const Icons = () => {
  return (
    <IconGrid>
      <IconWrapper icon={<Icon.Alert title="Alert" />} name="Alert" />
      <IconWrapper icon={<Icon.AlertOff title="AlertOff" />} name="AlertOff" />
      <IconWrapper
        icon={<Icon.AlertRounded title="AlertRounded" />}
        name="AlertRounded"
      />
      <IconWrapper icon={<Icon.Android title="Android" />} name="Android" />
      <IconWrapper icon={<Icon.Apple title="Apple" />} name="Apple" />
      <IconWrapper
        icon={<Icon.ArrowDown title="ArrowDown" />}
        name="ArrowDown"
      />
      <IconWrapper
        icon={<Icon.ArrowDownRounded title="ArrowDownRounded" />}
        name="ArrowDownRounded"
      />
      <IconWrapper
        icon={<Icon.ArrowUpRounded title="ArrowUpRounded" />}
        name="ArrowUpRounded"
      />
      <IconWrapper icon={<Icon.Avatar title="Avatar" />} name="Avatar" />
      <IconWrapper icon={<Icon.Barcode title="Barcode" />} name="Barcode" />
      <IconWrapper icon={<Icon.Calendar title="Calendar" />} name="Calendar" />
      <IconWrapper
        icon={<Icon.CalendarClock title="CalendarClock" />}
        name="CalendarClock"
      />
      <IconWrapper
        icon={<Icon.CalendarDay title="CalendarDay" />}
        name="CalendarDay"
      />
      <IconWrapper
        icon={<Icon.CalendarWeekend title="CalendarWeekend" />}
        name="CalendarWeekend"
      />
      <IconWrapper icon={<Icon.Cart title="Cart" />} name="Cart" />
      <IconWrapper icon={<Icon.Chat title="Chat" />} name="Chat" />
      <IconWrapper
        icon={<Icon.Checkmark title="Checkmark" />}
        name="Checkmark"
      />
      <IconWrapper
        icon={<Icon.CheckmarkRounded title="CheckmarkRounded" />}
        name="CheckmarkRounded"
      />
      <IconWrapper
        icon={<Icon.ChevronDown title="ChevronDown" />}
        name="ChevronDown"
      />
      <IconWrapper
        icon={<Icon.ChevronDownAlt title="ChevronDownAlt" />}
        name="ChevronDownAlt"
      />
      <IconWrapper
        icon={<Icon.ChevronLeft title="ChevronLeft" />}
        name="ChevronLeft"
      />
      <IconWrapper
        icon={<Icon.ChevronLeftAlt title="ChevronLeftAlt" />}
        name="ChevronLeftAlt"
      />
      <IconWrapper
        icon={<Icon.ChevronRight title="ChevronRight" />}
        name="ChevronRight"
      />
      <IconWrapper
        icon={<Icon.ChevronRightAlt title="ChevronRightAlt" />}
        name="ChevronRightAlt"
      />
      <IconWrapper
        icon={<Icon.ChevronUp title="ChevronUp" />}
        name="ChevronUp"
      />
      <IconWrapper
        icon={<Icon.ChevronUpAlt title="ChevronUpAlt" />}
        name="ChevronUpAlt"
      />
      <IconWrapper icon={<Icon.City title="City" />} name="City" />
      <IconWrapper icon={<Icon.Clock title="Clock" />} name="Clock" />
      <IconWrapper icon={<Icon.Close title="Close" />} name="Close" />
      <IconWrapper icon={<Icon.CloseAlt title="CloseAlt" />} name="CloseAlt" />
      <IconWrapper
        icon={<Icon.CloseRounded title="CloseRounded" />}
        name="CloseRounded"
      />
      <IconWrapper icon={<Icon.Clover title="Clover" />} name="Clover" />
      <IconWrapper icon={<Icon.Comment title="Comment" />} name="Comment" />
      <IconWrapper icon={<Icon.Compass title="Compass" />} name="Compass" />
      <IconWrapper icon={<Icon.Copy title="Copy" />} name="Copy" />
      <IconWrapper
        icon={<Icon.CreditCard title="CreditCard" />}
        name="CreditCard"
      />
      <IconWrapper icon={<Icon.Dot title="Dot" />} name="Dot" />
      <IconWrapper icon={<Icon.Dots title="Dots" />} name="Dots" />
      <IconWrapper icon={<Icon.Download title="Download" />} name="Download" />
      <IconWrapper icon={<Icon.Entrance title="Entrance" />} name="Entrance" />
      <IconWrapper icon={<Icon.Envelope title="Envelope" />} name="Envelope" />
      <IconWrapper icon={<Icon.Error title="Error" />} name="Error" />
      <IconWrapper icon={<Icon.Event title="Event" />} name="Event" />
      <IconWrapper
        icon={<Icon.EventType title="EventType" />}
        name="EventType"
      />
      <IconWrapper icon={<Icon.Eye title="Eye" />} name="Eye" />
      <IconWrapper icon={<Icon.Facebook title="Facebook" />} name="Facebook" />
      <IconWrapper icon={<Icon.File title="File" />} name="File" />
      <IconWrapper icon={<Icon.Filter title="Filter" />} name="Filter" />
      <IconWrapper icon={<Icon.Flag title="Flag" />} name="Flag" />
      <IconWrapper icon={<Icon.Gear title="Gear" />} name="Gear" />
      <IconWrapper icon={<Icon.Github title="Github" />} name="Github" />
      <IconWrapper icon={<Icon.Happy title="Happy" />} name="Happy" />
      <IconWrapper icon={<Icon.House title="House" />} name="House" />
      <IconWrapper icon={<Icon.Image title="Image" />} name="Image" />
      <IconWrapper icon={<Icon.Info title="Info" />} name="Info" />
      <IconWrapper
        icon={<Icon.InfoRounded title="InfoRounded" />}
        name="InfoRounded"
      />
      <IconWrapper
        icon={<Icon.Instagram title="Instagram" />}
        name="Instagram"
      />
      <IconWrapper icon={<Icon.Link title="Link" />} name="Link" />
      <IconWrapper icon={<Icon.List title="List" />} name="List" />
      <IconWrapper icon={<Icon.ListAlt title="ListAlt" />} name="ListAlt" />
      <IconWrapper icon={<Icon.Location title="Location" />} name="Location" />
      <IconWrapper icon={<Icon.Logout title="Logout" />} name="Logout" />
      <IconWrapper
        icon={<Icon.Loudspeaker title="Loudspeaker" />}
        name="Loudspeaker"
      />
      <IconWrapper
        icon={<Icon.MagnifyingGlass title="MagnifyingGlass" />}
        name="MagnifyingGlass"
      />
      <IconWrapper
        icon={<Icon.MagnifyingGlassAlt title="MagnifyingGlassAlt" />}
        name="MagnifyingGlassAlt"
      />
      <IconWrapper icon={<Icon.Masks title="Masks" />} name="Masks" />
      <IconWrapper icon={<Icon.Medium title="Medium" />} name="Medium" />
      <IconWrapper
        icon={<Icon.Messenger title="Messenger" />}
        name="Messenger"
      />
      <IconWrapper icon={<Icon.Minus title="Minus" />} name="Minus" />
      <IconWrapper icon={<Icon.MinusAlt title="MinusAlt" />} name="MinusAlt" />
      <IconWrapper
        icon={<Icon.MinusRounded title="MinusRounded" />}
        name="MinusRounded"
      />
      <IconWrapper
        icon={<Icon.MobilePhone title="MobilePhone" />}
        name="MobilePhone"
      />
      <IconWrapper icon={<Icon.Money title="Money" />} name="Money" />
      <IconWrapper
        icon={<Icon.MusicalNote title="MusicalNote" />}
        name="MusicalNote"
      />
      <IconWrapper icon={<Icon.Padlock title="Padlock" />} name="Padlock" />
      <IconWrapper
        icon={<Icon.Paperclip title="Paperclip" />}
        name="Paperclip"
      />
      <IconWrapper icon={<Icon.Pause title="Pause" />} name="Pause" />
      <IconWrapper icon={<Icon.Pencil title="Pencil" />} name="Pencil" />
      <IconWrapper icon={<Icon.Phone title="Phone" />} name="Phone" />
      <IconWrapper
        icon={<Icon.PhoneVerified title="PhoneVerified" />}
        name="PhoneVerified"
      />
      <IconWrapper icon={<Icon.Pin title="Pin" />} name="Pin" />
      <IconWrapper icon={<Icon.Play title="Play" />} name="Play" />
      <IconWrapper icon={<Icon.Plus title="Plus" />} name="Plus" />
      <IconWrapper icon={<Icon.PlusAlt title="PlusAlt" />} name="PlusAlt" />
      <IconWrapper
        icon={<Icon.PlusRounded title="PlusRounded" />}
        name="PlusRounded"
      />
      <IconWrapper icon={<Icon.QrCode title="QrCode" />} name="QrCode" />
      <IconWrapper
        icon={<Icon.Questionmark title="Questionmark" />}
        name="Questionmark"
      />
      <IconWrapper
        icon={<Icon.QuestionmarkRounded title="QuestionmarkRounded" />}
        name="QuestionmarkRounded"
      />
      <IconWrapper icon={<Icon.Refresh title="Refresh" />} name="Refresh" />
      <IconWrapper icon={<Icon.Row title="Row" />} name="Row" />
      <IconWrapper icon={<Icon.Sad title="Sad" />} name="Sad" />
      <IconWrapper icon={<Icon.Seat title="Seat" />} name="Seat" />
      <IconWrapper icon={<Icon.Section title="Section" />} name="Section" />
      <IconWrapper
        icon={<Icon.SellTicket title="SellTicket" />}
        name="SellTicket"
      />
      <IconWrapper icon={<Icon.Share title="Share" />} name="Share" />
      <IconWrapper icon={<Icon.ShareAlt title="ShareAlt" />} name="ShareAlt" />
      <IconWrapper icon={<Icon.Shield title="Shield" />} name="Shield" />
      <IconWrapper icon={<Icon.Shuffle title="Shuffle" />} name="Shuffle" />
      <IconWrapper icon={<Icon.Snooze title="Snooze" />} name="Snooze" />
      <IconWrapper
        icon={<Icon.SoundCloud title="SoundCloud" />}
        name="SoundCloud"
      />
      <IconWrapper icon={<Icon.SoundOff title="Sound off" />} name="SoundOff" />
      <IconWrapper icon={<Icon.SoundOn title="Sound on" />} name="SoundOn" />
      <IconWrapper icon={<Icon.Spinner title="Spinner" />} name="Spinner" />
      <IconWrapper icon={<Icon.Spotify title="Spotify" />} name="Spotify" />
      <IconWrapper icon={<Icon.Star title="Star" />} name="Star" />
      <IconWrapper icon={<Icon.StarHalf title="StarHalf" />} name="StarHalf" />
      <IconWrapper icon={<Icon.Sun title="Sun" />} name="Sun" />
      <IconWrapper icon={<Icon.Tag title="Tag" />} name="Tag" />
      <IconWrapper
        icon={<Icon.ThumbsDown title="ThumbsDown" />}
        name="ThumbsDown"
      />
      <IconWrapper icon={<Icon.ThumbsUp title="ThumbsUp" />} name="ThumbsUp" />
      <IconWrapper icon={<Icon.Ticket title="Ticket" />} name="Ticket" />
      <IconWrapper
        icon={<Icon.TicketSwap title="TicketSwap" />}
        name="TicketSwap"
      />
      <IconWrapper icon={<Icon.Tidal title="Tidal" />} name="Tidal" />
      <IconWrapper icon={<Icon.Trash title="Trash" />} name="Trash" />
      <IconWrapper icon={<Icon.Trophy title="Trophy" />} name="Trophy" />
      <IconWrapper icon={<Icon.Twitter title="Twitter" />} name="Twitter" />
      <IconWrapper icon={<Icon.Verified title="Verified" />} name="Verified" />
      <IconWrapper icon={<Icon.Voucher title="Voucher" />} name="Voucher" />
      <IconWrapper icon={<Icon.Warning title="Warning" />} name="Warning" />
      <IconWrapper
        icon={<Icon.WarningRounded title="WarningRounded" />}
        name="WarningRounded"
      />
      <IconWrapper icon={<Icon.Watch title="Watch" />} name="Watch" />
      <IconWrapper icon={<Icon.WhatsApp title="WhatsApp" />} name="WhatsApp" />
      <IconWrapper
        icon={<Icon.ExternalLink title="ExternalLink" />}
        name="ExternalLink"
      />
    </IconGrid>
  )
}
