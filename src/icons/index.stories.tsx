import React from 'react'
import * as Icon from './'
import styled from '@emotion/styled'
import { color } from '../theme'
import { SmallText } from '../components'

const IconBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  word-wrap: anywhere;
  text-align: center;
  background-color: ${color.stardust};
  padding: 16px 4px;
  border-radius: 8px;

  p {
    font-size: 12px;
    margin-top: 4px;
  }
`

const CodeBlock = styled.div`
  background-color: ${color.stardustLight};
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: 24px;
  display: inline-block;
`

export const Icons = () => (
  <>
    <h1>Icons</h1>
    <SmallText as="p">Import</SmallText>
    <CodeBlock>
      <SmallText>{`import { Alert } from "@ticketswap/solar/icon"`}</SmallText>
    </CodeBlock>
    <SmallText as="p">Use</SmallText>
    <CodeBlock>
      <SmallText>{`<Alert title="Alert" />`}</SmallText>
    </CodeBlock>

    <h2>Library</h2>
    <div
      style={{
        display: 'grid',
        gridGap: 8,
        gridTemplateColumns: 'repeat(auto-fill, 128px)',
      }}
    >
      <IconBlock>
        <Icon.Alert title="Alert" />
        <p>Alert</p>
      </IconBlock>
      <IconBlock>
        <Icon.AlertOff title="AlertOff" />
        <p>AlertOff</p>
      </IconBlock>
      <IconBlock>
        <Icon.Android title="Android" />
        <p>Android</p>
      </IconBlock>
      <IconBlock>
        <Icon.Apple title="Apple" />
        <p>Apple</p>
      </IconBlock>
      <IconBlock>
        <Icon.ArrowDown title="ArrowDown" />
        <p>ArrowDown</p>
      </IconBlock>
      <IconBlock>
        <Icon.ArrowDownRounded title="ArrowDownRounded" />
        <p>ArrowDownRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.ArrowUpRounded title="ArrowUpRounded" />
        <p>ArrowUpRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.Avatar title="Avatar" />
        <p>Avatar</p>
      </IconBlock>
      <IconBlock>
        <Icon.Calendar title="Calendar" />
        <p>Calendar</p>
      </IconBlock>
      <IconBlock>
        <Icon.CalendarClock title="CalendarClock" />
        <p>CalendarClock</p>
      </IconBlock>
      <IconBlock>
        <Icon.CalendarDay title="CalendarDay" />
        <p>CalendarDay</p>
      </IconBlock>
      <IconBlock>
        <Icon.CalendarWeekend title="CalendarWeekend" />
        <p>CalendarWeekend</p>
      </IconBlock>
      <IconBlock>
        <Icon.Cart title="Cart" />
        <p>Cart</p>
      </IconBlock>
      <IconBlock>
        <Icon.Chat title="Chat" />
        <p>Chat</p>
      </IconBlock>
      <IconBlock>
        <Icon.Checkmark title="Checkmark" />
        <p>Checkmark</p>
      </IconBlock>
      <IconBlock>
        <Icon.CheckmarkRounded title="CheckmarkRounded" />
        <p>CheckmarkRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronDown title="ChevronDown" />
        <p>ChevronDown</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronDownAlt title="ChevronDownAlt" />
        <p>ChevronDownAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronLeft title="ChevronLeft" />
        <p>ChevronLeft</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronLeftAlt title="ChevronLeftAlt" />
        <p>ChevronLeftAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronRight title="ChevronRight" />
        <p>ChevronRight</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronRightAlt title="ChevronRightAlt" />
        <p>ChevronRightAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronUp title="ChevronUp" />
        <p>ChevronUp</p>
      </IconBlock>
      <IconBlock>
        <Icon.ChevronUpAlt title="ChevronUpAlt" />
        <p>ChevronUpAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.City title="City" />
        <p>City</p>
      </IconBlock>
      <IconBlock>
        <Icon.Clock title="Clock" />
        <p>Clock</p>
      </IconBlock>
      <IconBlock>
        <Icon.Close title="Close" />
        <p>Close</p>
      </IconBlock>
      <IconBlock>
        <Icon.CloseAlt title="CloseAlt" />
        <p>CloseAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.CloseRounded title="CloseRounded" />
        <p>CloseRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.Clover title="Clover" />
        <p>Clover</p>
      </IconBlock>
      <IconBlock>
        <Icon.Comment title="Comment" />
        <p>Comment</p>
      </IconBlock>
      <IconBlock>
        <Icon.Copy title="Copy" />
        <p>Copy</p>
      </IconBlock>
      <IconBlock>
        <Icon.CreditCard title="CreditCard" />
        <p>CreditCard</p>
      </IconBlock>
      <IconBlock>
        <Icon.Dot title="Dot" />
        <p>Dot</p>
      </IconBlock>
      <IconBlock>
        <Icon.Dots title="Dots" />
        <p>Dots</p>
      </IconBlock>
      <IconBlock>
        <Icon.Download title="Download" />
        <p>Download</p>
      </IconBlock>
      <IconBlock>
        <Icon.Entrance title="Entrance" />
        <p>Entrance</p>
      </IconBlock>
      <IconBlock>
        <Icon.Envelope title="Envelope" />
        <p>Envelope</p>
      </IconBlock>
      <IconBlock>
        <Icon.Error title="Error" />
        <p>Error</p>
      </IconBlock>
      <IconBlock>
        <Icon.Event title="Event" />
        <p>Event</p>
      </IconBlock>
      <IconBlock>
        <Icon.Eye title="Eye" />
        <p>Eye</p>
      </IconBlock>
      <IconBlock>
        <Icon.Facebook title="Facebook" />
        <p>Facebook</p>
      </IconBlock>
      <IconBlock>
        <Icon.File title="File" />
        <p>File</p>
      </IconBlock>
      <IconBlock>
        <Icon.Filter title="Filter" />
        <p>Filter</p>
      </IconBlock>
      <IconBlock>
        <Icon.Flag title="Flag" />
        <p>Flag</p>
      </IconBlock>
      <IconBlock>
        <Icon.Gear title="Gear" />
        <p>Gear</p>
      </IconBlock>
      <IconBlock>
        <Icon.Github title="Github" />
        <p>Github</p>
      </IconBlock>
      <IconBlock>
        <Icon.Happy title="Happy" />
        <p>Happy</p>
      </IconBlock>
      <IconBlock>
        <Icon.House title="House" />
        <p>House</p>
      </IconBlock>
      <IconBlock>
        <Icon.Image title="Image" />
        <p>Image</p>
      </IconBlock>
      <IconBlock>
        <Icon.Info title="Info" />
        <p>Info</p>
      </IconBlock>
      <IconBlock>
        <Icon.InfoRounded title="InfoRounded" />
        <p>InfoRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.Instagram title="Instagram" />
        <p>Instagram</p>
      </IconBlock>
      <IconBlock>
        <Icon.List title="List" />
        <p>List</p>
      </IconBlock>
      <IconBlock>
        <Icon.ListAlt title="ListAlt" />
        <p>ListAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.Location title="Location" />
        <p>Location</p>
      </IconBlock>
      <IconBlock>
        <Icon.Logout title="Logout" />
        <p>Logout</p>
      </IconBlock>
      <IconBlock>
        <Icon.Loudspeaker title="Loudspeaker" />
        <p>Loudspeaker</p>
      </IconBlock>
      <IconBlock>
        <Icon.MagnifyingGlass title="MagnifyingGlass" />
        <p>MagnifyingGlass</p>
      </IconBlock>
      <IconBlock>
        <Icon.MagnifyingGlassAlt title="MagnifyingGlassAlt" />
        <p>MagnifyingGlassAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.Masks title="Masks" />
        <p>Masks</p>
      </IconBlock>
      <IconBlock>
        <Icon.Medium title="Medium" />
        <p>Medium</p>
      </IconBlock>
      <IconBlock>
        <Icon.Messenger title="Messenger" />
        <p>Messenger</p>
      </IconBlock>
      <IconBlock>
        <Icon.Minus title="Minus" />
        <p>Minus</p>
      </IconBlock>
      <IconBlock>
        <Icon.MinusAlt title="MinusAlt" />
        <p>MinusAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.MinusRounded title="MinusRounded" />
        <p>MinusRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.MobilePhone title="MobilePhone" />
        <p>MobilePhone</p>
      </IconBlock>
      <IconBlock>
        <Icon.Money title="Money" />
        <p>Money</p>
      </IconBlock>
      <IconBlock>
        <Icon.MusicalNote title="MusicalNote" />
        <p>MusicalNote</p>
      </IconBlock>
      <IconBlock>
        <Icon.Padlock title="Padlock" />
        <p>Padlock</p>
      </IconBlock>
      <IconBlock>
        <Icon.Paperclip title="Paperclip" />
        <p>Paperclip</p>
      </IconBlock>
      <IconBlock>
        <Icon.Pencil title="Pencil" />
        <p>Pencil</p>
      </IconBlock>
      <IconBlock>
        <Icon.Phone title="Phone" />
        <p>Phone</p>
      </IconBlock>
      <IconBlock>
        <Icon.PhoneVerified title="PhoneVerified" />
        <p>PhoneVerified</p>
      </IconBlock>
      <IconBlock>
        <Icon.Pin title="Pin" />
        <p>Pin</p>
      </IconBlock>
      <IconBlock>
        <Icon.Play title="Play" />
        <p>Play</p>
      </IconBlock>
      <IconBlock>
        <Icon.Plus title="Plus" />
        <p>Plus</p>
      </IconBlock>
      <IconBlock>
        <Icon.PlusAlt title="PlusAlt" />
        <p>PlusAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.PlusRounded title="PlusRounded" />
        <p>PlusRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.Questionmark title="Questionmark" />
        <p>Questionmark</p>
      </IconBlock>
      <IconBlock>
        <Icon.QuestionmarkRounded title="QuestionmarkRounded" />
        <p>QuestionmarkRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.Refresh title="Refresh" />
        <p>Refresh</p>
      </IconBlock>
      <IconBlock>
        <Icon.Row title="Row" />
        <p>Row</p>
      </IconBlock>
      <IconBlock>
        <Icon.Sad title="Sad" />
        <p>Sad</p>
      </IconBlock>
      <IconBlock>
        <Icon.Seat title="Seat" />
        <p>Seat</p>
      </IconBlock>
      <IconBlock>
        <Icon.Section title="Section" />
        <p>Section</p>
      </IconBlock>
      <IconBlock>
        <Icon.SellTicket title="SellTicket" />
        <p>SellTicket</p>
      </IconBlock>
      <IconBlock>
        <Icon.Share title="Share" />
        <p>Share</p>
      </IconBlock>
      <IconBlock>
        <Icon.ShareAlt title="ShareAlt" />
        <p>ShareAlt</p>
      </IconBlock>
      <IconBlock>
        <Icon.Shield title="Shield" />
        <p>Shield</p>
      </IconBlock>
      <IconBlock>
        <Icon.SoundCloud title="SoundCloud" />
        <p>SoundCloud</p>
      </IconBlock>
      <IconBlock>
        <Icon.Spinner title="Spinner" />
        <p>Spinner</p>
      </IconBlock>
      <IconBlock>
        <Icon.Spotify title="Spotify" />
        <p>Spotify</p>
      </IconBlock>
      <IconBlock>
        <Icon.Star title="Star" />
        <p>Star</p>
      </IconBlock>
      <IconBlock>
        <Icon.Sun title="Sun" />
        <p>Sun</p>
      </IconBlock>
      <IconBlock>
        <Icon.Tag title="Tag" />
        <p>Tag</p>
      </IconBlock>
      <IconBlock>
        <Icon.ThumbsDown title="ThumbsDown" />
        <p>ThumbsDown</p>
      </IconBlock>
      <IconBlock>
        <Icon.ThumbsUp title="ThumbsUp" />
        <p>ThumbsUp</p>
      </IconBlock>
      <IconBlock>
        <Icon.Ticket title="Ticket" />
        <p>Ticket</p>
      </IconBlock>
      <IconBlock>
        <Icon.TicketSwap title="TicketSwap" />
        <p>TicketSwap</p>
      </IconBlock>
      <IconBlock>
        <Icon.Trash title="Trash" />
        <p>Trash</p>
      </IconBlock>
      <IconBlock>
        <Icon.Trophy title="Trophy" />
        <p>Trophy</p>
      </IconBlock>
      <IconBlock>
        <Icon.Twitter title="Twitter" />
        <p>Twitter</p>
      </IconBlock>
      <IconBlock>
        <Icon.Verified title="Verified" />
        <p>Verified</p>
      </IconBlock>
      <IconBlock>
        <Icon.Voucher title="Voucher" />
        <p>Voucher</p>
      </IconBlock>
      <IconBlock>
        <Icon.Warning title="Warning" />
        <p>Warning</p>
      </IconBlock>
      <IconBlock>
        <Icon.WarningRounded title="WarningRounded" />
        <p>WarningRounded</p>
      </IconBlock>
      <IconBlock>
        <Icon.WhatsApp title="WhatsApp" />
        <p>WhatsApp</p>
      </IconBlock>
    </div>
  </>
)

export default {
  title: 'Icons',
}
