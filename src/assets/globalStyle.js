import {StyleSheet} from 'react-native'

const palette = ["#1984c5", "#22a7f0", "#63bff0", "#a7d5ed", "#e2e2e2", "#e1a692", "#de6e56", "#e14b31", "#c23728"];

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



const Globalstyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.neutral,
      marginTop:30
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: colors.white,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: colors.B1,
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: colors.white,
      width: '90%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 5,
      borderColor: colors.B1,
      borderWidth: 2,
      marginBottom: 15,
      marginHorizontal:15
    },
    buttonText: {
      color: colors.white,
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: colors.B1,
      fontWeight: '700',
      fontSize: 16,
    },
    List : {
      backgroundColor: colors.white,
      width: '90%',
      padding: 15,
      marginTop:30,
      borderRadius: 10,
    },
    ListItem : {
      padding:5,
      backgroundColor:colors.neutral,
      margin: 10,
      borderRadius: 10,
    },
    ListItemDelete : {
      backgroundColor: colors.white,
      width: "20%",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 15,
    }
  })


  export default Globalstyles