import { StyleSheet } from "react-native";
import { palette } from "../../Core/colors";

export const createStylesDatosMaestros = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.neutral,
    },

    // Form Section
    formWrapper: {
      paddingHorizontal: 20,
    },

    //Detail title
    detailTitlesWrapper: {
      marginTop: 30,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detailTitlesTitle: {
      //fontFamily: 'MBold',
      fontSize: 32,
      color: palette.textDark,
      marginTop: 5,
    },
    detailTitleCreate: {
      width: "20%",
      //flexDirection: 'row',
      //backgroundColor: palette.B1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },

    input: {
      backgroundColor: palette.white,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      borderWidth: 2,
      borderColor: palette.B1,
    },

    //Detail
    itemContainer: {
      paddingHorizontal: 20,
    },

    itemDetail: {
      flexDirection: "row",
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: palette.B1,
      marginTop: 10,
      borderRadius: 10,
      padding: 10,
      justifyContent: "space-between",
    },
    itemDetailInfo: {
      //width: '70%',
    },
    itemDetailInfoText: {
      paddingVertical: 10,
      fontSize: 20,
      color: palette.textDark,
    },
  });

  return styles;
};
