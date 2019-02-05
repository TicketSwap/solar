import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import {
  Dialog,
  DialogWindow,
  DialogHeader,
  DialogAdornment,
  DialogBody,
  DialogFooter,
} from './'
import { color } from '../../theme'
import { Button } from '../Button'
import { Box } from '../Box'
import { Input } from '../Input'
import { TabsGroup } from '../TabsGroup'
import { Icon } from '../Icon'

const Login = props => (
  <DialogBody>
    <Box display="grid" gridGap={8} marginBottom={32}>
      <Button variant="facebook">Log in with Facebook</Button>
      <Button variant="secondary" onClick={() => props.select(2)}>
        Log in with email
      </Button>
    </Box>
    <div>
      Don’t have an account yet?{' '}
      <button style={{ color: color.earth }} onClick={() => props.select(1)}>
        Sign up
      </button>
    </div>
  </DialogBody>
)

Login.propTypes = {
  select: PropTypes.func,
}

const LoginEmail = props => (
  <DialogBody>
    <Box display="grid" gridGap={8} marginBottom={32}>
      <Input type="email" id="email" label="Email address" hideLabel />
    </Box>
    <Button variant="success">Log in</Button>
  </DialogBody>
)

LoginEmail.propTypes = {
  select: PropTypes.func,
}

const Signup = props => (
  <DialogBody>
    <Box display="grid" gridGap={8} marginBottom={32}>
      <Button variant="facebook">Sign up with Facebook</Button>
      <Button variant="secondary" onClick={() => props.select(3)}>
        Sign up with email
      </Button>
    </Box>
    <div>
      Already have an account{' '}
      <button style={{ color: color.earth }} onClick={() => props.select(0)}>
        Log in
      </button>
    </div>
  </DialogBody>
)

Signup.propTypes = {
  select: PropTypes.func,
}

const SignupEmail = props => (
  <>
    <DialogBody>
      <Box display="grid" gridGap={8} marginBottom={32}>
        <Input type="email" id="email" label="Email address" />
        <Input id="fname" label="First name" />
        <Input id="lname" label="Last name" />
      </Box>
    </DialogBody>
    <DialogFooter>
      <Button variant="success">Sign up</Button>
    </DialogFooter>
  </>
)

SignupEmail.propTypes = {
  select: PropTypes.func,
}

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
      <Box display="grid" gridGap={16}>
        <Input id="email" type="email" label="Email address" />
        <Input id="fname" label="First name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
        <Input id="lname" label="Last name" />
      </Box>
    </MyDialog>
  ))
  .add('with tabs', () => (
    <Dialog>
      {({ hide, getToggleProps, getWindowProps }) => (
        <TabsGroup>
          {({ activeIndex, select, getPanelProps }) => (
            <>
              <Button
                {...getToggleProps({
                  onClick: () => select(0),
                })}
              >
                Login
              </Button>

              <Button
                {...getToggleProps({
                  onClick: () => select(1),
                })}
              >
                Signup
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

                {views.map(
                  ({ title, component: Component }, index) =>
                    index === activeIndex && (
                      <Component key={title} {...getPanelProps()} />
                    )
                )}
              </DialogWindow>
            </>
          )}
        </TabsGroup>
      )}
    </Dialog>
  ))
