import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { getFSCollectionAsync } from "../../../Core/Firebase/FirebaseFirestoreManager";
import { updateElement } from "../../../Core/util/functions";
import { commonAttrs, entities } from "../../../Core/util/entities";
import styles from "../../styles/Consultar.style";
import { palette } from "../../../Core/colors";

import Header from "../../../sharedComponents/Header";
import Titles from "../../../sharedComponents/Titles";
import EditModal from "../../../sharedComponents/Modals/EditModal";
import LoadingComponent from "../../../sharedComponents/LoadingComponent";

const AdminConsultarObras = ({ navigation }) => {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalParams, setModalParams] = useState({ visible: false, item: {} });

  useEffect(() => {
    const loadItems = async () => {
      const elements = await getFSCollectionAsync(entities.obra);
      setObras(elements);
      console.log(elements);
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

  const renderObra = ({ item }) => {
    return (
      <View style={styles.ListItem}>
        <View style={styles.ListItemText}>
          <ShortInfo item={item} />
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
              name={item[commonAttrs.enabled] ? "domain" : "domain-disabled"}
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
          <Titles titleText="Obras" />
          <View style={styles.actions}>
            <Pressable
              style={styles.actionsAdd}
              onPress={() => navigation.replace("AdminCrearObraScreen")}
            >
              <MaterialIcons name="add" size={30} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.listContainer}>
          {loading && <LoadingComponent />}
          {!loading && (
            <FlatList
              data={obras}
              renderItem={renderObra}
              keyExtractor={(item) => item.id}
              style={styles.List}
            />
          )}
        </View>
      </View>
      {modalParams?.actionLabel == "Editar" && (
        <EditModal modalParams={modalParams} setParams={setModalParams} />
      )}
    </View>
  );
};

export default AdminConsultarObras;

const ShortInfo = ({ item }) => {
  return (
    <View style={styles.shortInfo}>
      <Text style={styles.strongText}>Nombre: {item?.Nombre}</Text>
      <Text>Direccion: {item?.Direccion}</Text>
      <Text>Propietario: {item?.Propietario}</Text>
      <Text>id: {item.id}</Text>
    </View>
  );
};
