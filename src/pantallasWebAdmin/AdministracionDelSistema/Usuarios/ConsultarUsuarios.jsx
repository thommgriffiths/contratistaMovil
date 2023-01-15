import { Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { getFSCollectionAsync } from "../../../Core/Firebase/FirebaseFirestoreManager";
import { entities, commonAttrs, userTypes } from "../../../Core/util/entities";
import { filterByAttributes } from "../../../Core/util/functions";

import Header from "../../../sharedComponents/Header";
import Titles from "../../../sharedComponents/Titles";
import LoadingComponent from "../../../sharedComponents/LoadingComponent";
import Filter from "./Filter";

import styles from "../../styles/Consultar.style";
import ValidateUser from "./ValidateUser";

const defaultFilter = [
  userTypes.admin,
  userTypes.architect,
  userTypes.contractor,
];

const AdminConsultarUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    const loadItems = async () => {
      const elements = await getFSCollectionAsync(entities.user);
      setUsers(elements);

      let filteredUsrs = filterByAttributes(
        elements,
        commonAttrs.userType,
        filter
      );
      setFilteredUsers(filteredUsrs);
      setLoading(false);
    };
    loading ? loadItems() : {};
  }, [loading]);

  useEffect(() => {
    let filteredUsrs = filterByAttributes(users, commonAttrs.userType, filter);
    setFilteredUsers(filteredUsrs);
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header backTo="AdminHomeScreen" />
      <View style={styles.body}>
        <View style={styles.titlesAndActions}>
          <Titles titleText="Gestion de usuarios" />
          <Filter action={setFilter} filter={filter} />
        </View>
        <View style={styles.listContainer}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <FlatList
              data={filteredUsers}
              renderItem={renderUser}
              keyExtractor={(item) => item.id}
              style={styles.List}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AdminConsultarUsuarios;

const ShortInfo = ({ item }) => {
  return (
    <>
      <Text>Nombre: {item?.[commonAttrs.nombre]}</Text>
      <Text>Apellido: {item?.[commonAttrs.apellido]}</Text>
      <Text>Email: {item?.[commonAttrs.email]}</Text>
      <Text style={{ fontWeight: "bold" }}>
        Tipo de Usuario: {item?.[commonAttrs.userType]}
      </Text>
    </>
  );
};

const renderUser = ({ item }) => {
  return (
    <View style={styles.ListItem}>
      <View style={styles.ListItemText}>
        <ShortInfo item={item} />
      </View>
      <View style={styles.ListItemActions}>
        <ValidateUser user={item} />
      </View>
    </View>
  );
};
