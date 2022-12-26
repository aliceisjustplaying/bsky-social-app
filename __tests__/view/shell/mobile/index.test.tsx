import React from 'react'
import {MobileShell} from '../../../../src/view/shell/mobile'
import renderer from 'react-test-renderer'
import {SafeAreaProvider} from 'react-native-safe-area-context'
// import {render, screen} from '../../../../jest/test-utils'

describe('MobileShell', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider>
          <MobileShell />
        </SafeAreaProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  // it('tests', () => {
  //   render(
  //     <SafeAreaProvider>
  //       <MobileShell />
  //     </SafeAreaProvider>,
  //   )
  // })
})
