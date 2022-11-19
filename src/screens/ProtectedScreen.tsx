import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

  const { user, token, logOut } = useContext(AuthContext)

  return (
    <View style={ styles.container }>

      <Text style={ styles.title }>Protexted Screen</Text>

      <Button
        title='Logout'
        color="#5856D6"
        onPress={ logOut }
      />  

      <Text style={styles.text}>
        { JSON.stringify( user, null, 5 ) }
      </Text>

      <Text style={styles.text}>
        { JSON.stringify( token, null, 5 ) }
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      color: '#000'
    },
    text: {
      color: '#000'
    }
})
