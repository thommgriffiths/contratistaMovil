import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/pantallas/LoginScreen";
import HomeScreen from "./src/pantallas/HomeScreen";

//Componentes principales
import CrearPedidoDeObra from "./src/pantallas/PedidoDeObra/CrearPedidoDeObra";
import ConsultarPedidosDeObra from "./src/pantallas/PedidoDeObra/ConsultarPedidosDeObra";

//Componentes ABM datos maestros
import CrearObra from "./src/pantallas/ABMMaestros/Obra/CrearObra";
import ListarObras from "./src/pantallas/ABMMaestros/Obra/ListarObras";
import CrearRubro from "./src/pantallas/ABMMaestros/Rubro/CrearRubro";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ListarObrasScreen"
            component={ListarObras}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PedidoDeObraScreen"
            component={CrearPedidoDeObra}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearObraScreen"
            component={CrearObra}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearRubroScreen"
            component={CrearRubro}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerPedidosDeObraScreen"
            component={ConsultarPedidosDeObra}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}></Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
