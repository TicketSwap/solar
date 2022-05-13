import styled from '@emotion/styled'
import { device, radius, shadow, space } from '../../../src/theme'

const logos = [
  {
    image: '/static/images/logo/white.png',
    urlEPS:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-hor-blue.eps',
    urlPNG:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-hor-blue.png',
  },
  {
    image: '/static/images/logo/blue.png',
    urlEPS:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-hor-white-blue.eps',
    urlPNG:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-hor-white-blue.png',
  },
  {
    image: '/static/images/logo/icon-white.png',
    urlEPS:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-blue.eps',
    urlPNG:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-blue.png',
  },
  {
    image: '/static/images/logo/vertical-white.png',
    urlEPS:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-ver-blue.eps',
    urlPNG:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-ver-blue.png',
  },
  {
    image: '/static/images/logo/vertical-blue.png',
    urlEPS:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-ver-white-blue.eps',
    urlPNG:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-ver-white-blue.png',
  },
  {
    image: '/static/images/logo/icon-blue.png',
    urlEPS:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-white-blue.eps',
    urlPNG:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-white-blue.png',
  },
]

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
  height: calc(100vh - 10px);
  margin-block-start: 1rem;

  @media ${device.tablet} {
    margin-block: 0;
    margin-inline: -${space[16]};
    grid-template-columns: repeat(3, 1fr);
  }
`
const Card = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  justify-content: center;
  padding-block: ${space[8]};
  padding-inline: 0;

  @media ${device.tablet} {
    flex: 0 0 50%;
    padding-block: ${space[16]};
    padding-inline: ${space[16]};

    &:nth-child(even) {
      margin-inline-start: auto;
    }
  }

  @media ${device.laptopM} {
    flex: 0 0 33.33%;

    &:nth-child(even) {
      margin-inline-start: 0;
    }
  }
`

interface StyledImageProps {
  isWhite: boolean
}

const Image = styled.img<StyledImageProps>`
  background-color: ${props => (props.isWhite ? 'rgb(0, 182, 240)' : 'unset')};
  border-radius: ${radius.md};
  box-shadow: ${shadow.strong};
  height: auto;
  max-width: 320px;
  width: 100%;

  @media ${device.tablet} {
    max-width: none;
  }
`
const Info = styled.div`
  margin-block-start: ${space[16]};
`

const Link = styled.a`
  color: #00b6f0;
  text-decoration: none;
  font-family: 'Nunito Sans', -apple-system, '.SFNSText-Regular',
    'San Francisco', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;

  &:hover {
    color: #99a1a3;
  }
`

export const Logos = ({ ...props }) => {
  return (
    <List {...props}>
      {logos.map(({ image, urlEPS, urlPNG }, index) => (
        <Card key={image}>
          <Image src={urlPNG} isWhite={index === 0 || index === 3} />
          <Info>
            <Link href={urlEPS}>EPS</Link> &middot;{' '}
            <Link href={urlPNG}>PNG</Link>
          </Info>
        </Card>
      ))}
    </List>
  )
}
