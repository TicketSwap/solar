import React from 'react'
import { Input } from '../InputV2'
import { Button, ButtonVariant } from '../Button'
import { Select } from '../Select'
import { ChevronLeftAlt, CloseAlt } from '../../icons'
import {
  DialogAdornment,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogWindow,
  useDialog,
} from '../Dialog'
import { ContentTransition } from './'
import { color } from '../../theme'
import { Textarea } from '../Textarea'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

const Login = (props: {
  showLoginEmailView: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  showSignupView: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title: string
}) => (
  <DialogBody>
    <div style={{ display: 'grid', gridGap: '0.5rem', marginBottom: '2rem' }}>
      <Button variant={ButtonVariant.facebook}>Log in with Facebook</Button>
      <Button variant={ButtonVariant.secondary} onClick={props.showLoginEmailView}>
        Log in with email
      </Button>

      <Select
        items={items}
        id="language"
        label="Language"
        onChange={selection => console.log(selection)}
        initialSelectedItem={items[1]}
      />
    </div>
    <div>
      Don’t have an account yet?{' '}
      <button style={{ color: color.earth }} onClick={props.showSignupView}>
        Sign up
      </button>
    </div>
  </DialogBody>
)

const LoginEmail = ({}: { title: string; back: string }) => (
  <DialogBody>
    <div style={{ marginBottom: '0.5rem' }}>
      <Input type="email" id="email" label="Email address" />
    </div>
    <Button variant={ButtonVariant.success} fullWidth>
      Log in
    </Button>
  </DialogBody>
)

const Signup = (props: {
  showSignupEmailView: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  showLoginView: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title: string
}) => (
  <DialogBody>
    <div style={{ display: 'grid', gridGap: '0.5rem', marginBottom: '2rem' }}>
      <Button variant={ButtonVariant.facebook}>Sign up with Facebook</Button>
      <Button variant={ButtonVariant.secondary} onClick={props.showSignupEmailView}>
        Sign up with email
      </Button>
    </div>
    <div>
      Already have an account{' '}
      <button style={{ color: color.earth }} onClick={props.showLoginView}>
        Log in
      </button>
    </div>
  </DialogBody>
)

const SignupEmail = (props: {
  title: string
  back: string
  showSuccessView: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => (
  <>
    <DialogBody>
      <div>
        <Input type="email" id="email" label="Email address" />
        <Input id="fname" label="First name" />
        <Input id="lname" label="Last name" />
        <Textarea id="message" label="Message" rows={4} />
      </div>
    </DialogBody>
    <DialogFooter>
      <Button variant={ButtonVariant.success} fullWidth onClick={props.showSuccessView}>
        Sign up
      </Button>
    </DialogFooter>
  </>
)

const SuccessView = ({}: { title: string; back: string }) => (
  <DialogBody>
    <div>
      <p>Signup successful!</p>
    </div>
  </DialogBody>
)

function Dialog() {
  const [title, setTitle] = React.useState('')
  const [back, setBack] = React.useState('')
  const initialView = 'login'
  const [activeView, setActiveView] = React.useState(initialView)
  const { hide, getToggleProps, getWindowProps } = useDialog({
    onToggle: on => on && setActiveView(initialView),
  })

  return (
    <>
      <Button {...getToggleProps()}>Show dialog</Button>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>
          {back && (
            <DialogAdornment left>
              <button onClick={() => setActiveView(back)}>
                <ChevronLeftAlt size={24} />
              </button>
            </DialogAdornment>
          )}
          {title}
          <DialogAdornment right>
            <button onClick={hide}>
              <CloseAlt size={24} />
            </button>
          </DialogAdornment>
        </DialogHeader>
        <ContentTransition
          onChange={item => {
            setTitle(item.props.title)
            setBack(item.props.back)
          }}
          activeView={activeView}
        >
          <Login
            key="login"
            title="Login"
            showLoginEmailView={() => setActiveView('loginEmail')}
            showSignupView={() => setActiveView('signup')}
          />
          <LoginEmail key="loginEmail" title="Login with email" back="login" />
          <Signup
            key="signup"
            title="Signup"
            showSignupEmailView={() => setActiveView('signupEmail')}
            showLoginView={() => setActiveView('login')}
          />
          <SignupEmail
            key="signupEmail"
            title="Sign up with email"
            back="signup"
            showSuccessView={() => setActiveView('success')}
          />
          <SuccessView key="success" title="Success" back="signupEmail" />
        </ContentTransition>
      </DialogWindow>
    </>
  )
}

export default {
  title: 'Components/Animation/ContentTransition',
}

export const Basic = () => <Dialog />
