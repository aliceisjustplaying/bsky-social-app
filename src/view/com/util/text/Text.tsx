import React from 'react'
import {Text as RNText, TextInput, TextProps} from 'react-native'
import {s, lh} from 'lib/styles'
import {useTheme, TypographyVariant} from 'lib/ThemeContext'

export type CustomTextProps = TextProps & {
  type?: TypographyVariant
  lineHeight?: number
}

export function Text({
  type = 'md',
  children,
  lineHeight,
  style,
  selectable,
  ...props
}: React.PropsWithChildren<CustomTextProps>) {
  const theme = useTheme()
  const typography = theme.typography[type]
  const lineHeightStyle = lineHeight ? lh(theme, type, lineHeight) : undefined
  if (selectable) {
    return (
      <TextInput
        value={children as string}
        scrollEnabled={false}
        style={[s.black, typography, lineHeightStyle, style]}
        editable={false}
        multiline={true}
      />
    )
  }
  return (
    <RNText style={[s.black, typography, lineHeightStyle, style]} {...props}>
      {children}
    </RNText>
  )
}
