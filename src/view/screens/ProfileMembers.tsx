import React, {useEffect} from 'react'
import {View} from 'react-native'
import {ViewHeader} from '../com/util/ViewHeader'
import {ProfileMembers as ProfileMembersComponent} from '../com/profile/ProfileMembers'
import {ScreenParams} from '../routes'
import {useStores} from '../../state'

export const ProfileMembers = ({navIdx, visible, params}: ScreenParams) => {
  const store = useStores()
  const {name} = params

  useEffect(() => {
    if (visible) {
      store.nav.setTitle(navIdx, `Members of ${name}`)
      store.shell.setMinimalShellMode(false)
    }
  }, [store, visible, name])

  return (
    <View testID="profileMembersView">
      <ViewHeader title="Members" subtitle={`of ${name}`} />
      <ProfileMembersComponent name={name} />
    </View>
  )
}
