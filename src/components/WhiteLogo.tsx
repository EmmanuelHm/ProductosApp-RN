import React from 'react'
import { Image, View } from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={{
        alignItems: 'center',
    }}>
        <Image 
            source={ require('../assets/reactLogo.png') }
            style={{
                width: 123,
                height: 110
            }}
        />
    </View>
  )
}
