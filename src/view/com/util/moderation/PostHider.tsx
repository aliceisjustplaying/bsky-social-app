import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {ComAtprotoLabelDefs} from '@atproto/api'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {usePalette} from 'lib/hooks/usePalette'
import {Link} from '../Link'
import {Text} from '../text/Text'
import {addStyle} from 'lib/styles'
import {useStores} from 'state/index'

export function PostHider({
  testID,
  href,
  isMuted,
  labels,
  style,
  children,
}: React.PropsWithChildren<{
  testID?: string
  href: string
  isMuted: boolean | undefined
  labels: ComAtprotoLabelDefs.Label[] | undefined
  style: StyleProp<ViewStyle>
}>) {
  const store = useStores()
  const pal = usePalette('default')
  const [override, setOverride] = React.useState(false)
  const bg = override ? pal.viewLight : pal.view

  const labelPref = store.preferences.getLabelPreference(labels)
  if (labelPref.pref === 'hide') {
    return <></>
  }

  if (!isMuted) {
    // NOTE: any further label enforcement should occur in ContentContainer
    return (
      <Link testID={testID} style={style} href={href} noFeedback>
        {children}
      </Link>
    )
  }

  return (
    <>
      <View style={[styles.description, bg, pal.border]}>
        <FontAwesomeIcon
          icon={['far', 'eye-slash']}
          style={[styles.icon, pal.text]}
        />
        <Text type="md" style={pal.textLight}>
          Post from an account you muted.
        </Text>
        <TouchableOpacity
          style={styles.showBtn}
          onPress={() => setOverride(v => !v)}
          accessibilityLabel={override ? 'Hide post' : 'Show post'}
          accessibilityHint={
            override
              ? 'Re-hides post from muted account'
              : 'Shows post from muted account'
          }>
          <Text type="md" style={pal.link}>
            {override ? 'Hide' : 'Show'} post
          </Text>
        </TouchableOpacity>
      </View>
      {override && (
        <View style={[styles.childrenContainer, pal.border, bg]}>
          <Link
            testID={testID}
            style={addStyle(style, styles.child)}
            href={href}
            noFeedback>
            {children}
          </Link>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderTopWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  showBtn: {
    marginLeft: 'auto',
  },
  childrenContainer: {
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  child: {
    borderWidth: 1,
    borderRadius: 12,
  },
})
