import React from 'react'
import * as Icon from './'
import styled from '@emotion/styled'

const StyledAlert = styled(Icon.Alert)`
  color: blue;
`

const StyledAlertOff = styled(Icon.AlertOff)`
  color: blue;
`

export const Comets = () => (
  <div
    style={{
      display: 'grid',
      gridGap: 16,
      gridTemplateColumns: 'repeat(auto-fill, 32px)',
    }}
  >
    <StyledAlert title="Alert" color="red" />
    <StyledAlertOff title="AlertOff" />
    <Icon.Android title="Android" color="green" />
    <Icon.Apple title="Apple" />
    <Icon.ArrowDown title="ArrowDown" />
    <Icon.ArrowDownRounded title="ArrowDownRounded" />
    <Icon.ArrowUpRounded title="ArrowUpRounded" />
    <Icon.Avatar title="Avatar" />
    <Icon.Calendar title="Calendar" />
    <Icon.CalendarClock title="CalendarClock" />
    <Icon.CalendarDay title="CalendarDay" />
    <Icon.CalendarWeekend title="CalendarWeekend" />
    <Icon.Cart title="Cart" />
    <Icon.Chat title="Chat" />
    <Icon.Checkmark title="Checkmark" color="lightgreen" />
    <Icon.CheckmarkRounded title="CheckmarkRounded" />
    <Icon.ChevronDown title="ChevronDown" />
    <Icon.ChevronDownAlt title="ChevronDownAlt" />
    <Icon.ChevronLeft title="ChevronLeft" />
    <Icon.ChevronLeftAlt title="ChevronLeftAlt" />
    <Icon.ChevronRight title="ChevronRight" />
    <Icon.ChevronRightAlt title="ChevronRightAlt" />
    <Icon.ChevronUp title="ChevronUp" />
    <Icon.ChevronUpAlt title="ChevronUpAlt" />
    <Icon.City title="City" />
    <Icon.Clock title="Clock" />
    <Icon.Close title="Close" />
    <Icon.CloseAlt title="CloseAlt" />
    <Icon.CloseRounded title="CloseRounded" />
    <Icon.Clover title="Clover" color="pink" />
    <Icon.Comment title="Comment" />
    <Icon.Copy title="Copy" />
    <Icon.CreditCard title="CreditCard" />
    <Icon.Dot title="Dot" />
    <Icon.Dots title="Dots" />
    <Icon.Download title="Download" />
    <Icon.Entrance title="Entrance" />
    <Icon.Envelope title="Envelope" />
    <Icon.Error title="Error" />
    <Icon.Event title="Event" />
    <Icon.Eye title="Eye" />
    <Icon.Facebook title="Facebook" />
    <Icon.File title="File" />
    <Icon.Filter title="Filter" />
    <Icon.Flag title="Flag" />
    <Icon.Gear title="Gear" />
    <Icon.Github title="Github" />
    <Icon.Happy title="Happy" />
    <Icon.House title="House" />
    <Icon.Image title="Image" />
    <Icon.Info title="Info" />
    <Icon.InfoRounded title="InfoRounded" />
    <Icon.Instagram title="Instagram" />
    <Icon.List title="List" />
    <Icon.ListAlt title="ListAlt" />
    <Icon.Location title="Location" />
    <Icon.Logout title="Logout" />
    <Icon.Loudspeaker title="Loudspeaker" />
    <Icon.MagnifyingGlass title="MagnifyingGlass" />
    <Icon.MagnifyingGlassAlt title="MagnifyingGlassAlt" />
    <Icon.Masks title="Masks" />
    <Icon.Medium title="Medium" />
    <Icon.Messenger title="Messenger" />
    <Icon.Minus title="Minus" />
    <Icon.MinusAlt title="MinusAlt" />
    <Icon.MinusRounded title="MinusRounded" />
    <Icon.MobilePhone title="MobilePhone" />
    <Icon.Money title="Money" />
    <Icon.MusicalNote title="MusicalNote" />
    <Icon.Padlock title="Padlock" />
    <Icon.Paperclip title="Paperclip" />
    <Icon.Pencil title="Pencil" />
    <Icon.Phone title="Phone" />
    <Icon.PhoneVerified title="PhoneVerified" />
    <Icon.Pin title="Pin" />
    <Icon.Play title="Play" />
    <Icon.Plus title="Plus" />
    <Icon.PlusAlt title="PlusAlt" />
    <Icon.PlusRounded title="PlusRounded" />
    <Icon.Questionmark title="Questionmark" />
    <Icon.QuestionmarkRounded title="QuestionmarkRounded" />
    <Icon.Refresh title="Refresh" />
    <Icon.Row title="Row" />
    <Icon.Sad title="Sad" />
    <Icon.Seat title="Seat" />
    <Icon.Section title="Section" />
    <Icon.SellTicket title="SellTicket" />
    <Icon.Share title="Share" />
    <Icon.ShareAlt title="ShareAlt" />
    <Icon.Shield title="Shield" />
    <Icon.SoundCloud title="SoundCloud" />
    <Icon.Spinner title="Spinner" />
    <Icon.Spotify title="Spotify" />
    <Icon.Star title="Star" />
    <Icon.Sun title="Sun" />
    <Icon.Tag title="Tag" />
    <Icon.ThumbsDown title="ThumbsDown" />
    <Icon.ThumbsUp title="ThumbsUp" />
    <Icon.Ticket title="Ticket" />
    <Icon.TicketSwap title="TicketSwap" />
    <Icon.Trash title="Trash" />
    <Icon.Trophy title="Trophy" />
    <Icon.Twitter title="Twitter" />
    <Icon.Verified title="Verified" />
    <Icon.Voucher title="Voucher" />
    <Icon.Warning title="Warning" />
    <Icon.WarningRounded title="WarningRounded" />
    <Icon.WhatsApp title="WhatsApp" />
  </div>
)

export default {
  title: 'Icons/Comets',
}
