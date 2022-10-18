import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';


import Globalstyles from '../assets/globalStyle';
import { newObra, createObra, obraConstructor, getAllObras, deleteObra } from '../Managers/ObraManager';
import { TestUpdateModal } from './TestUpdateModal'

const TestComponentScreen = () => {
    const navigation = useNavigation()

    //Hooks
    const [obras, setObras] = useState([]);
    const [itemToUpdate, setItemToUpdate] = useState(null);

    const renderObra = ({item}) => {
        return(
            <View style={styles.listItem}>

                <View style={styles.listItemInfo }>
                    <Text>Nombre obra: {item.Nombre}</Text>
                    <Text>Propietario obra: {item.Propietario}</Text>
                    <Text>Direccion obra: {item.Direccion}</Text>
                    <Text>id: {item.id}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.listItemDetail }
                    onPress={()=> {handleDetailView(item)}}
                    >
                    <MaterialIcons name="pageview" size={35} color="black" />
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

    const handleDetailView = (item) =>{
        navigation.navigate('ObraDetailScreen',item)
    }
    
    useEffect(() => {
        obtenerObras();
    }, [])
  
    const navigateBack = () => {
        navigation.goBack();
    }
  
    return (
        <View style={styles.container} >
            {/*Header*/}
            <SafeAreaView>
                <View style={styles.headerWrapper}>
                <View style={styles.profileImage} ></View>
                <AntDesign name="back" size={24} color="black" />
                </View>
            </SafeAreaView>

            {/*Lista obras*/}
            <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator={false} style={styles.listWrapper} >

                <View style={styles.listTitlesWrapper} >
                    <Text style={styles.listTitlesSubtitle}>Menu</Text>
                    <Text style={styles.listTitlesTitle} >Obras</Text>
                </View>

                <></>

                <FlatList
                    data={obras}
                    renderItem={renderObra}
                    keyExtractor={item => item.id}
                    style={styles.listContainer}
                />
            
            </ScrollView>

            {/*Back button */} 
            <View style={styles.backButtonWrapper} >
                <TouchableOpacity
                    onPress={navigateBack}
                    style={styles.backButton}
                    >
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
      )
}
export default TestComponentScreen


const colors = {
    "B1" : "#1984c5",
    "B2" : "#22a7f0",
    "B3"  : "#63bff0",
    "B4" : "#a7d5ed",
    "neutral" : "#e2e2e2",
    "R1" : "#e1a692",
    "R2" : "#de6e56",
    "R3" : "#e14b31",
    "R4" : "#c23728",
    "white" : "white",
  }
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
      },
  
      headerWrapper: {
        flexDirection: 'row',
        backgroundColor: colors.R1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
        paddingBottom: 30
      },
  
      profileImage: {
        backgroundColor: colors.B1,
        width: 40,
        height: 40,
        borderRadius: 40
      },
  
      //List
      listWrapper : {

      },
  
      listTitlesWrapper: {
        marginTop: 30,
        paddingHorizontal:20
      },
      listTitlesSubtitle: {
          //fontFamily: 'MRegular',
          fontSize:16,
          color: colors.textDark
      },
      listTitlesTitle: {
        //fontFamily: 'MBold',
        fontSize:32,
        color: colors.textDark,
        marginTop:5
      },

      listContainer : {
        paddingHorizontal:20
      },

      listItem : {
        flexDirection: "row",
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: colors.B1,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',

      },
        listItemInfo : {
            width: '70%',
        },
        listItemModify : {
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listItemDelete : {
            width: '15%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listItemDetail : {
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        
        //Back button
        backButtonWrapper : {
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        backButton: {
            backgroundColor: colors.B1,
            width: '100%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
          },
          backButtonText: {
            color: colors.white,
            fontWeight: '700',
            fontSize: 16,
          },
  

    })