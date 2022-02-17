import { renderHook } from '@testing-library/react-hooks'
import { useTransition, TransitionState } from './'

jest.mock('./', () => jest.requireActual('./'))

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

describe('useTransition', () => {
  describe('when it is on', () => {
    it('returns is mounted as true', async () => {
      const { result, waitFor } = renderHook(() =>
        useTransition({
          in: true,
          timeout: 1,
        })
      )

      await waitFor(() => result.current[1] === true, {
        timeout: 100,
      })

      expect(result.current[1]).toBe(true)
    })

    it('starts the animation', async () => {
      const { result, waitFor } = renderHook(() =>
        useTransition({
          in: true,
          timeout: 1,
        })
      )

      await waitFor(() => result.current[0] === TransitionState.ENTERING, {
        timeout: 100,
      })

      await waitFor(() => result.current[0] === TransitionState.ENTERED, {
        timeout: 100,
      })

      expect(result.current[0]).toBe(TransitionState.ENTERED)
    })

    describe('and it is entering', () => {
      it('invokes the onEntering callback', async () => {
        const onEnteringCallback = jest.fn()

        const { result, waitFor } = renderHook(() =>
          useTransition({
            in: true,
            timeout: 1,
            onEntering: onEnteringCallback,
          })
        )

        await waitFor(() => result.current[0] === TransitionState.ENTERING, {
          timeout: 100,
        })

        expect(onEnteringCallback).toHaveBeenCalledTimes(1)
      })
    })

    describe('and it has entered', () => {
      it('invokes the onEntered callback', async () => {
        const onEnteredCallback = jest.fn()

        const { result, waitFor } = renderHook(() =>
          useTransition({
            in: true,
            timeout: 1,
            onEntered: onEnteredCallback,
          })
        )

        await waitFor(() => result.current[0] === TransitionState.ENTERED, {
          timeout: 200,
        })

        expect(onEnteredCallback).toHaveBeenCalledTimes(1)
      })
    })

    describe('and it is turned off', () => {
      it('ends the animation', async () => {
        const { result, waitFor, rerender } = renderHook(
          props => useTransition(props),
          {
            initialProps: {
              in: true,
              timeout: 1,
            },
          }
        )

        await waitFor(() => result.current[0] === TransitionState.ENTERED, {
          timeout: 200,
        })

        rerender({
          in: false,
          timeout: 1,
        })

        await waitFor(() => result.current[0] === TransitionState.EXITING, {
          timeout: 100,
        })

        await waitFor(() => result.current[0] === TransitionState.EXITED, {
          timeout: 100,
        })

        expect(result.current[0]).toBe(TransitionState.EXITED)
      })

      describe('and it is exiting', () => {
        it('invokes the onExiting callback', async () => {
          const onExitingCallback = jest.fn()

          const { result, waitFor, rerender } = renderHook(
            props => useTransition(props),
            {
              initialProps: {
                in: true,
                timeout: 1,
                onExiting: onExitingCallback,
              },
            }
          )

          await waitFor(() => result.current[0] === TransitionState.ENTERED, {
            timeout: 200,
          })

          rerender({
            in: false,
            timeout: 1,
            onExiting: onExitingCallback,
          })

          await waitFor(() => result.current[0] === TransitionState.EXITING, {
            timeout: 100,
          })

          await waitFor(() => result.current[0] === TransitionState.EXITED, {
            timeout: 100,
          })

          expect(onExitingCallback).toHaveBeenCalled()
        })
      })

      describe('and it has exited', () => {
        it('invokes the onExited callback', async () => {
          const onExitedCallback = jest.fn()

          const { result, waitFor, rerender } = renderHook(
            props => useTransition(props),
            {
              initialProps: {
                in: true,
                timeout: 1,
                onExited: onExitedCallback,
              },
            }
          )

          await waitFor(() => result.current[0] === TransitionState.ENTERED, {
            timeout: 200,
          })

          rerender({
            in: false,
            timeout: 1,
            onExited: onExitedCallback,
          })

          await waitFor(() => result.current[0] === TransitionState.EXITING, {
            timeout: 100,
          })

          await waitFor(() => result.current[0] === TransitionState.EXITED, {
            timeout: 100,
          })

          expect(onExitedCallback).toHaveBeenCalled()
        })
      })

      it('returns is mounted as false', async () => {
        const { result, waitFor, rerender } = renderHook(
          props => useTransition(props),
          {
            initialProps: {
              in: true,
              timeout: 1,
            },
          }
        )

        await waitFor(() => result.current[0] === TransitionState.ENTERED, {
          timeout: 200,
        })

        rerender({
          in: false,
          timeout: 1,
        })

        await waitFor(() => result.current[0] === TransitionState.EXITING, {
          timeout: 100,
        })

        await waitFor(() => result.current[0] === TransitionState.EXITED, {
          timeout: 100,
        })

        expect(result.current[1]).toBe(false)
      })
    })

    describe('and it is unmounted', () => {
      it('cancels future animations', async () => {
        const onEnteringCallback = jest.fn()

        const { unmount } = renderHook(() =>
          useTransition({
            in: true,
            timeout: 10,
            onEntering: onEnteringCallback,
          })
        )

        unmount()

        await delay(200)

        expect(onEnteringCallback).not.toHaveBeenCalled()
      })
    })
  })
})
