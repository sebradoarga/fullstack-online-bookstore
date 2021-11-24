import styled from 'styled-components'
import { device } from '../device'
import logo from '../images/logo-transparent-background.png'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  return (
    <FooterContainer>
      <FirstFooter>
        <LeftSide>
          <Image src={logo} alt="The Story Store logo" />
          <FollowSection>
            Follow us:
            <SocialMediaIcon>
              <TwitterIcon fontSize="medium" />
            </SocialMediaIcon>
            <SocialMediaIcon>
              <FacebookIcon fontSize="medium" />
            </SocialMediaIcon>
            <SocialMediaIcon>
              <InstagramIcon fontSize="medium" />
            </SocialMediaIcon>
          </FollowSection>
        </LeftSide>
        <RightSide>
          <ListItem>
            <PageLink href="#">About</PageLink>
          </ListItem>
          <ListItem>
            <PageLink href="#">Help</PageLink>
          </ListItem>
          <ListItem>
            <PageLink href="#">Gift Cards</PageLink>
          </ListItem>
          <ListItem>
            <PageLink href="#">Contact</PageLink>
          </ListItem>
          <ListItem>
            <PageLink href="#">Returns and Refunds</PageLink>
          </ListItem>
        </RightSide>
      </FirstFooter>
      <SecondFooter>
        <Copyright>© 2021 All Rights Reserved</Copyright>
        <BottomLink href="#">Terms of Use</BottomLink>
        <BottomLink href="#">Privacy Notice</BottomLink>
      </SecondFooter>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  width: 100%;
  background: #130912;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  margin-top: 3rem;
  color: white;

  @media ${device.laptop} {
    margin-top: 6rem;
  }
`
const FirstFooter = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${device.laptop} {
    justify-content: space-around;
  }
`

const SecondFooter = styled.div`
  align-self: center;
  display: flex;
  font-size: 1.3rem;
  margin-top: 2rem;

  & * {
    text-align: center;
  }
`

const LeftSide = styled.div``

const FollowSection = styled.h4`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  margin-top: 1.5rem;
  font-weight: 300;
`

const SocialMediaIcon = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.4rem;
  cursor: pointer;
`

const RightSide = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media ${device.laptop} {
    align-items: center;
  }
`

const ListItem = styled.li`
  text-align: right;
`

const PageLink = styled.a`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`

const Image = styled.img`
  width: 20rem;
  object-fit: cover;
`
const Copyright = styled.p``

const BottomLink = styled.a`
  color: white;
  margin-left: 2rem;
`
