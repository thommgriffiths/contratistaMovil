import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { getFSCollectionAsync } from "../../../Core/Firebase/FirebaseFirestoreManager";
import { entities, commonAttrs } from "../../../Core/util/entities";
import { updateElement } from "../../../Core/util/functions";

import Header from "../../../sharedComponents/Header";
import Titles from "../../../sharedComponents/Titles";
import DeleteModal from "../../../sharedComponents/DeleteModal";
import EditModal from "../../../sharedComponents/EditModal";
import DetailModal from "../../../sharedComponents/DetailModal";
import LoadingComponent from "../../../sharedComponents/LoadingComponent";
import { palette } from "../../../Core/colors";
import styles from "../../styles/Consultar.style";

const AdminConsultarRubros = ({ navigation }) => {
  const [rubros, setRubros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      const elements = await getFSCollectionAsync(entities.rubro);
      setRubros(elements);
      setLoading(false);
    };
    loading ? loadItems() : {};
  }, [loading]);

  useEffect(() => {
    console.log(modalParams);
    if (modalParams["deletedItem"] != undefined) {
      setModalParams({ visible: false });
      setLoading(true);
    }
    if (modalParams["editedItem"] != undefined) {
      setModalParams({ visible: false });
      setLoading(true);
    }
  }, [modalParams]);

  const renderRubro = ({ item }) => {
    return (
      <View style={styles.ListItem}>
        <View style={styles.ListItemText}>
          <Pressable
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "showDetail",
                item: item,
              });
            }}
          >
            <ShortInfo item={item} />
          </Pressable>
        </View>
        <View style={styles.ListItemActions}>
          <Pressable
            style={styles.ListItemAction}
            onPress={() => {
              setModalParams({
                visible: true,
                actionLabel: "Editar",
                item: item,
              });
            }}
          >
            <MaterialIcons name="edit" size={24} color={palette.B1} />
          </Pressable>
          <Pressable
            style={styles.ListItemAction}
            onPress={() => {
              let uItem = {
                ...item,
                [commonAttrs.enabled]: !item[commonAttrs.enabled],
              };
              updateElement(uItem, () => setLoading(true));
            }}
          >
            <MaterialIcons
              name={item[commonAttrs.enabled] ? "near-me" : "near-me-disabled"}
              size={24}
              color={item[commonAttrs.enabled] ? "green" : "red"}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Rubros" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsAdd}
              onPress={() => navigation.replace("CrearRubroScreen")}
            >
              <MaterialIcons name="add" size={30} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={rubros}
              renderItem={renderRubro}
              keyExtractor={(item) => item.id}
              style={styles.List}
            />
          )}
        </View>
      </View>
      {modalParams?.actionLabel == "Eliminar" && (
        <DeleteModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "Editar" && (
        <EditModal modalParams={modalParams} setParams={setModalParams} />
      )}
      {modalParams?.actionLabel == "showDetail" && (
        <DetailModal modalParams={modalParams} setParams={setModalParams} />
      )}
    </View>
  );
};

export default AdminConsultarRubros;

const ShortInfo = ({ item }) => {
  return (
    <>
      <Text>id: {item?.[commonAttrs.id]}</Text>
      <Text>Nombre: {item?.[commonAttrs.nombre]}</Text>
    </>
  );
};
