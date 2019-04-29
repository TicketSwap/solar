import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Dialog,
  DialogWindow,
  DialogHeader,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  useDialog,
} from './'
import { Button } from '../Button'
import { Input } from '../Input'
import { TabsGroup, AnimatedTabPanels } from '../TabsGroup'
import { Icon } from '../Icon'
import { color } from '../../theme'

const Login = props => (
  <DialogBody>
    <div style={{ display: 'grid', gridGap: '0.5rem', marginBottom: '2rem' }}>
      <Button variant="facebook">Log in with Facebook</Button>
      <Button variant="secondary" onClick={() => props.select(2)}>
        Log in with email
      </Button>
    </div>
    <div>
      Don’t have an account yet?{' '}
      <button style={{ color: color.earth }} onClick={() => props.select(1)}>
        Sign up
      </button>
    </div>
  </DialogBody>
)

const LoginEmail = () => (
  <DialogBody>
    <div style={{ marginBottom: '1rem' }}>
      <Input type="email" id="email" label="Email address" hideLabel />
    </div>
    <Button variant="success" width="full">
      Log in
    </Button>
  </DialogBody>
)

const Signup = props => (
  <DialogBody>
    <div style={{ display: 'grid', gridGap: '0.5rem', marginBottom: '2rem' }}>
      <Button variant="facebook">Sign up with Facebook</Button>
      <Button variant="secondary" onClick={() => props.select(3)}>
        Sign up with email
      </Button>
    </div>
    <div>
      Already have an account{' '}
      <button style={{ color: color.earth }} onClick={() => props.select(0)}>
        Log in
      </button>
    </div>
  </DialogBody>
)

const SignupEmail = () => (
  <>
    <DialogBody>
      <div>
        <Input type="email" id="email" label="Email address" />
        <Input id="fname" label="First name" />
        <Input id="lname" label="Last name" />
        <Input id="message" label="Message" as="textarea" rows="4" />
      </div>
    </DialogBody>
    <DialogFooter>
      <Button variant="success" width="full">
        Sign up
      </Button>
    </DialogFooter>
  </>
)

const views = [
  { title: 'Login', component: Login, back: false },
  { title: 'Signup', component: Signup, back: false },
  { title: 'Login with email', component: LoginEmail, back: 0 },
  { title: 'Signup with email', component: SignupEmail, back: 1 },
]

const MyDialog = ({ children, ...props }) => (
  <Dialog {...props}>
    {({ hide, getToggleProps, getWindowProps }) => (
      <>
        <Button {...getToggleProps()}>Show dialog</Button>
        <DialogWindow {...getWindowProps()}>
          <DialogHeader>
            Dialog Title
            {!props.persist && (
              <DialogAdornment right>
                <button onClick={hide}>
                  <Icon glyph="close" size={24} />
                </button>
              </DialogAdornment>
            )}
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
        </DialogWindow>
      </>
    )}
  </Dialog>
)

function MyNewDialog() {
  const { hide, getToggleProps, getWindowProps } = useDialog({
    onToggle: val => console.log(val),
  })

  return (
    <>
      <Button {...getToggleProps()}>Show dialog</Button>
      <DialogWindow {...getWindowProps()}>
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>Body</DialogBody>
        <DialogFooter>
          <Button onClick={hide}>Discard</Button>
        </DialogFooter>
      </DialogWindow>
    </>
  )
}

storiesOf('Dialog', module)
  .add('basic', () => <MyDialog>Body</MyDialog>)
  .add('default on', () => <MyDialog defaultOn>Body</MyDialog>)
  .add('show on mount', () => <MyDialog showOnMount>Body</MyDialog>)
  .add('show on mount and persist', () => (
    <MyDialog showOnMount persist>
      Body
    </MyDialog>
  ))
  .add('with long body', () => (
    <MyDialog>
      <div>
        <Input id="email" type="email" label="Email address" />
        <Input id="fname" label="First name" />
        <Input id="lname" label="Last name" />
        <Input id="message" label="Message" as="textarea" rows="4" />
      </div>
    </MyDialog>
  ))
  .add('with tabs', () => (
    <Dialog>
      {({ hide, getToggleProps, getWindowProps }) => (
        <TabsGroup>
          {({
            activeIndex,
            previousIndex,
            select,
            getPanelProps,
            getPanelContainerProps,
          }) => (
            <>
              <Button
                {...getToggleProps({
                  onClick: () => select(0),
                })}
              >
                Login
              </Button>

              <DialogWindow {...getWindowProps()}>
                <DialogHeader>
                  {views.map(({ back }, index) =>
                    index === activeIndex && back !== false ? (
                      <DialogAdornment left>
                        <button onClick={() => select(back)}>
                          <Icon glyph="arrow-left" size={24} />
                        </button>
                      </DialogAdornment>
                    ) : null
                  )}

                  {views.map(
                    ({ title }, index) => index === activeIndex && title
                  )}

                  <DialogAdornment right>
                    <button onClick={hide}>
                      <Icon glyph="close" size={24} />
                    </button>
                  </DialogAdornment>
                </DialogHeader>

                <AnimatedTabPanels
                  items={views[activeIndex]}
                  {...getPanelContainerProps()}
                />
              </DialogWindow>
            </>
          )}
        </TabsGroup>
      )}
    </Dialog>
  ))
  .add('useDialog', () => <MyNewDialog />)
