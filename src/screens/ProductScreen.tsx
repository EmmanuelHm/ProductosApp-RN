import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Image } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ( { navigation, route }: Props) => {

    const { id = '', name= '' } = route.params

    const { categories } = useCategories()

    const { loadProductsById, addProduct, updateProduct } = useContext(ProductsContext)

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    })


    useEffect(() => {
        navigation.setOptions({
            title: ( nombre ) ? nombre : 'Nombre del Producto'
        })
    }, [nombre])

    useEffect(() => {
        loadProduct()
    }, [])


    const loadProduct = async () => {
        if( id.length === 0 ) return
        const producto = await loadProductsById( id )
        setFormValue({
            _id: id,
            categoriaId: producto.categoria._id,
            img: producto.img || '',
            nombre
        })
    }

    const saveOrUpdate = async () => {
        // console.log('saveOrUpdate');
        if ( id.length > 0 ){
            updateProduct(categoriaId, nombre, id)
        }else{
            const tempCategoriaId = categoriaId || categories[0]._id
            const newProduct = await addProduct(tempCategoriaId, nombre)
            onChange(newProduct._id, '_id')
        }
    }

    return (
        <View style={styles.container}>
            
            <ScrollView>
                <Text style={styles.text}>Nombre del producto:</Text>

                <TextInput
                    placeholder='Producto'
                    placeholderTextColor='#ccc'
                    style={styles.textInput}
                    value={ nombre }
                    onChangeText={ (value) => onChange(value, 'nombre') }

                />

                {/* Picker / Selector */}
                <Text style={styles.text}>Categoría:</Text>
                <Picker
                    selectedValue={ categoriaId }
                    onValueChange={ (value) => onChange( value, 'categoriaId' ) }
                >
                    {
                        categories.map( c => (
                            <Picker.Item 
                                label={ c.nombre } 
                                value={ c._id } 
                                key={ c._id }
                            />
                        ) )
                    }
                </Picker>


                <Button 
                    title='Guardar'
                    onPress={ () => saveOrUpdate() }
                    color='#5856D6'
                />

                {
                    ( _id.length > 0) && (

                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'center',
                            marginTop: 10
                        }}>

                            <Button 
                                title='Camara'
                                onPress={ () => {} }
                                color='#5856D6'
                            />

                            <View style={{ width: 10}} />

                            <Button 
                                title='Galeria'
                                onPress={ () => {} }
                                color='#5856D6'
                            />

                        </View>
                    )
                }

                {/* <Text style={styles.text}>
                    {JSON.stringify(form, null, 5)}
                </Text> */}

                {
                    
                    (img.length > 0) && (
                        <Image
                            source={{ uri: img }}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 300,
                            }}
                        />
                    )
                }

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    text: {
        color: '#000'
    },
    label: {
        fontSize: 18,
    },
    textInput:{
        color: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginVertical: 10,
    }

})