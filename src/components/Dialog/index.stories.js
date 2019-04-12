import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Measure from 'react-measure'
import { Transition, Spring, animated } from 'react-spring'
import {
  Dialog,
  DialogWindow,
  DialogHeader,
  DialogAdornment,
  DialogBody,
  DialogFooter,
  useDialog,
} from './'
import { color, easingFunctions } from '../../theme'
import { Button } from '../Button'
import { Input } from '../Input'
import { TabsGroup } from '../TabsGroup'
import { Icon } from '../Icon'

const ViewContainer = styled.div`
  position: relative;
  overflow: hidden;
`

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
          {({ activeIndex, previousIndex, select, getPanelProps }) => (
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
                <Measure bounds>
                  {({ measureRef, contentRect }) => (
                    <Spring
                      native
                      config={{ tension: 2000, friction: 100, precision: 1 }}
                      from={{ height: contentRect.bounds.height || -1 }}
                      to={{ height: contentRect.bounds.height || -1 }}
                      // Disable on initial render
                      immediate={activeIndex === previousIndex}
                    >
                      {props => (
                        <animated.div style={props}>
                          <ViewContainer ref={measureRef}>
                            <Transition
                              native
                              items={views[activeIndex]}
                              keys={item => item.component}
                              initial={{ x: 0 }}
                              from={{
                                opacity: 0,
                                x: previousIndex < activeIndex ? 16 : -16,
                              }}
                              enter={{ opacity: 1, x: 0 }}
                              leave={{
                                opacity: 0,
                                position: 'absolute',
                                x: previousIndex < activeIndex ? -16 : 16,
                                width: '100%',
                                zIndex: 0,
                                pointerEvents: 'none',
                              }}
                              config={{
                                duration: 400,
                                easing: easingFunctions.easeOutCubic,
                              }}
                            >
                              {({ title, component: Component }) => ({
                                x,
                                ...props
                              }) => (
                                <animated.div
                                  key={Component}
                                  style={{
                                    transform: x.interpolate(
                                      val => `translate3d(${val}rem,0,0)`
                                    ),
                                    ...props,
                                  }}
                                >
                                  <Component key={title} {...getPanelProps()} />
                                </animated.div>
                              )}
                            </Transition>
                          </ViewContainer>
                        </animated.div>
                      )}
                    </Spring>
                  )}
                </Measure>
              </DialogWindow>
            </>
          )}
        </TabsGroup>
      )}
    </Dialog>
  ))
  .add('useDialog', () => <MyNewDialog />)
