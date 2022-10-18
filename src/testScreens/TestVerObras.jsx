import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';


import Globalstyles from '../assets/globalStyle';
import { getAllObras } from '../Managers/ObraManager';

const TestVerObras = () => {
    const navigation = useNavigation()

    //Hooks
    const [obras, setObras] = useState([])

    const renderObra = ({item}) => {
        return(
            <View style={Globalstyles.ListItem}>
                <Text>Nombre obra: {item.Nombre}</Text>
                <Text>Propietario obra: {item.Propietario}</Text>
                <Text>Direccion obra: {item.Direccion}</Text>
                <Text>id: {item.id}</Text>
            </View>
        )
    }

    const obtenerObras = () => {
        const onSuccess = (devolucion) => {
            setObras(devolucion);
        };
        getAllObras(onSuccess)
    }
    
    useEffect(() => {
        obtenerObras();
    }, [])
  
    const navigateBack = () => {
        navigation.replace("Home");
    }

    return (
        <SafeAreaView
          style={Globalstyles.container}
        >
            <FlatList
                data={obras}
                renderItem={renderObra}
                keyExtractor={item => item.id}
                style={Globalstyles.List}
            />
            <TouchableOpacity
              onPress={navigateBack}
              style={[Globalstyles.button, Globalstyles.buttonOutline]}
            >
              <Text style={Globalstyles.buttonOutlineText}>Volver</Text>
            </TouchableOpacity>
        </SafeAreaView>
      )
}

export default TestVerObras