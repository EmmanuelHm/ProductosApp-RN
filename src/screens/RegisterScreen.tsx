import React, { useContext, useEffect } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { loginStyles } from '../theme/loginTheme';

import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ( { navigation }: Props ) => {

  const { signUp, errorMessage, removeError } = useContext(AuthContext)

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if( errorMessage.length === 0 ) return;

    Alert.alert('Registro Incorrecto', errorMessage, [{ text: 'OK', onPress: removeError }] )

  }, [errorMessage])

  const onRegister = () => {
    console.log({name, email, password})
    // Ocultar teclado
    Keyboard.dismiss();

    signUp({
      nombre: name,
      correo: email,
      password
    })
}

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856D6' }}
        behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
      >

        <View style={ loginStyles.formContainer }>

          {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={ loginStyles.title }>Registro</Text>

          <Text style={ loginStyles.label }>Nombre:</Text>
          <TextInput
            placeholder='Ingresa tu nombre'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='white'
            style={ [
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ] }
            selectionColor="#fff"

            // Manejo de Formulario con hook
            onChangeText={ (value) => onChange(value, 'name') }
            value={ name }
            onSubmitEditing={ onRegister }

            autoCapitalize='words'
            autoCorrect={ false }
          />

          <Text style={ loginStyles.label }>Email:</Text>
          <TextInput
            placeholder='Ingresa tu email'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            style={ [
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ] }
            selectionColor="#fff"

            // Manejo de Formulario con hook
            onChangeText={ (value) => onChange(value, 'email') }
            value={ email }
            onSubmitEditing={ onRegister }

            autoCapitalize='none'
            autoCorrect={ false }
          />

          <Text style={ loginStyles.label }>Contraseña:</Text>
          <TextInput
            placeholder='***********'
            placeholderTextColor='rgba(255,255,255,0.4)'
            underlineColorAndroid='white'
            secureTextEntry={ true }
            style={ [
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ] }
            selectionColor="#fff"

            // Manejo de Formulario con hook
            onChangeText={ (value) => onChange(value, 'password') }
            value={ password }
            onSubmitEditing={ onRegister }

            autoCapitalize='none'
            autoCorrect={ false }
          />

          {/* Boton Login  */}
          <View style={ loginStyles.buttonContainer }>

            <TouchableOpacity
              activeOpacity={0.7}
              style={ loginStyles.button }
              onPress={ onRegister }
            >
              <Text style={ loginStyles.buttonText }>Crear cuenta</Text>
            </TouchableOpacity>

          </View>

          {/* Crear una nueva cuenta  */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={ () => navigation.replace('LoginScreen') }
            style={ loginStyles.buttonReturn }
          >
            <Text style={ loginStyles.buttonText }>Login</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </>
  )
}

