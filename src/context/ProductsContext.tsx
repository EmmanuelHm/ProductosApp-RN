import React, { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi, { baseURL } from '../api/cafeApi';
import { ImagePickerResponse } from "react-native-image-picker";
import { Platform } from "react-native";

type ProductsContextProps = {
    products: Producto[],
    loadProducts: () => Promise<void>,
    addProduct: ( categoryId: string, productName: string ) => Promise<Producto>,
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>,
    deleteProduct: ( id: string ) => Promise<void>,
    loadProductsById: ( id: string ) => Promise<Producto>,
    uploadImage: ( data: any, id: string ) => Promise<void>,  //TODO: cambiar any
}

//Crear contexto
export const ProductsContext = createContext({} as ProductsContextProps);

//Crear el proovedor del contexto
export const ProductsProvider = ( {children}: any ) => {

    const [products, setProducts] = useState<Producto[]>([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50')
        // setProducts([ ...products, ...resp.data.productos ])
        setProducts([ ...resp.data.productos ])
    }

    const addProduct = async ( categoryId: string, productName: string ): Promise<Producto> => {
        // console.log({ categoryId, productName });
        const resp = await cafeApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId
        })
        setProducts( [...products, resp.data ] )

        return resp.data
    }

    const updateProduct = async ( categoryId: string, productName: string, productId: string ) => {
        // console.log({ categoryId, productName, productId});
        const resp = await cafeApi.put<Producto>(`/productos/${ productId }`, {
            nombre: productName,
            categoria: categoryId
        })
        setProducts( products.map( prod => {
            return (prod._id === productId)
                    ? resp.data
                    : prod
        }) )
    }

    const deleteProduct = async ( id: string ) => {

    }

    const loadProductsById = async ( id: string ): Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${ id }`)
        return resp.data
    }

    const uploadImage = async ( data: ImagePickerResponse, id: string ) => {
        
        const fileToUpload = {
            name: data.assets![0].fileName,
            type: data.assets![0].type,
            uri:  data.assets![0].uri
        }
        
        const formData = new FormData()
        formData.append('archivo', fileToUpload)

        // try {
        //     const resp = await cafeApi.put(`/uploads/productos/${id}`, formData,  )
        //     console.log(resp);
        // } catch (error) {
        //     console.log(error);
        // }
        
        try {
            const resp = await fetch(`${ baseURL }/uploads/productos/${ id }`, { method: 'PUT', body: formData } )
            console.log(resp);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductsById,
            uploadImage,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}