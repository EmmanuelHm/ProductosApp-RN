import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({

    formContainer:{
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        height: 600,
        marginBottom: 50
    },

    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: "#fff",
        fontWeight: "bold",
    },
    inputField: {
        color: "#fff",
        fontSize: 20,
    },
    inputFieldIOS:{
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer:{
        alignItems: "center",
        marginTop: 50,
    },
    button: {
        borderWidth: 2,
        borderColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
    buttonText:{
        color: "#fff",
        fontSize: 18
    },
    newUserContainer:{
        alignItems: "flex-end",
        marginTop: 20,
    },
    buttonReturn:{
        position: "absolute",
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10, 
        paddingVertical: 5,
        borderRadius: 100,
    }


})