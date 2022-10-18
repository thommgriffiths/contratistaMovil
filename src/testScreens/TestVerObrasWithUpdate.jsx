import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';


import Globalstyles from '../assets/globalStyle';
import { newObra, createObra, obraConstructor, getAllObras, deleteObra } from '../Managers/ObraManager';
import { TestUpdateModal } from './TestUpdateModal'

const TestVerObrasYUpdateScreen = () => {
    const navigation = useNavigation()

    //Hooks
    const [obras, setObras] = useState([]);
    const [itemToUpdate, setItemToUpdate] = useState(null);

    const renderObra = ({item}) => {
        return(
            <View style={[Globalstyles.ListItem, {flexDirection: "row"}]}>
                <View>
                    <Text>Nombre obra: {item.Nombre}</Text>
                    <Text>Propietario obra: {item.Propietario}</Text>
                    <Text>Direccion obra: {item.Direccion}</Text>
                    <Text>id: {item.id}</Text>
                </View>
                <TouchableOpacity 
                    style={Globalstyles.ListItemDelete}
                    onPress={()=> {handleUpdate(item)}}
                    >
                    <MaterialIcons name="update" size={24} color="black" />
                </TouchableOpacity>            
            </View>
        )
    }

    const obtenerObras = () => {
        const onSuccess = (devolucion) => {
            setObras(devolucion);
        };
        getAllObras(onSuccess)
    }

    const handleUpdate = (item) => {
        setItemToUpdate(item);
        navigation.navigate('TestUpdateScreen',item)
    }
    
    useEffect(() => {
        obtenerObras();
    }, [])
  
    const navigateBack = () => {
        navigation.goBack();
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
export default TestVerObrasYUpdateScreen