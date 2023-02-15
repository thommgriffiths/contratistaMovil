import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
//LogBox.ignoreLogs(['Asyncstorage: ...']);

import LoginScreen from "./src/sharedScreens/LoginScreen";
import HomeScreen from "./src/sharedScreens/HomeScreen";

//Pantallas contratistas
import HomeContratista from "./src/pantallasContratista/HomeContratista";
import ContraConsultarJornales from "./src/pantallasContratista/Jornal/ConsultarJornales";
import ContraCrearJornal from "./src/pantallasContratista/Jornal/CrearJornal";
import ContraConsultarPedidosDeReintegro from "./src/pantallasContratista/PedidoDeReintegro/ConsultarPedidosDeReintegro";
import ContraCrearPedidoDeReintegro from "./src/pantallasContratista/PedidoDeReintegro/CrearPedidoDeReintegro";

//Pantallas arquitecto
import ArqHomeScreen from "./src/pantallasArquitecto/HomeArq";
import ArqValidarJornales from "./src/pantallasArquitecto/Jornal/ConsultarJornales";
import ArqConsultarPedidosDeReintegro from "./src/pantallasArquitecto/PedidoDeReintegro/ConsultarPedidosDeReintegro";
import ArqCrearPedidoDeReintegro from "./src/pantallasArquitecto/PedidoDeReintegro/CrearPedidoDeReintegro";
import ArqCrearPedidoDeObra from "./src/pantallasArquitecto/PedidoDeObra/CrearPedidoDeObra";
import ArqConsultarPedidosDeObra from "./src/pantallasArquitecto/PedidoDeObra/ConsultarPedidosDeObra";

const Stack = createNativeStackNavigator();

export default function App() {
  return <AppWithNavigation />;
}

const AppWithNavigation = () => {
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

          {/* Pantallas contratista */}
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeContratista"
              component={HomeContratista}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ContraCrearJornalScreen"
              component={ContraCrearJornal}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ContraVerJornalesScreen"
              component={ContraConsultarJornales}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="ContraCrearPedidoDeReintegroScreen"
              component={ContraCrearPedidoDeReintegro}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ContraVerPedidosDeReintegroScreen"
              component={ContraConsultarPedidosDeReintegro}
            />
          </>

          {/* Pantallas arquitecto */}
          <>
            <Stack.Group>
              <Stack.Screen
                options={{ headerShown: false }}
                name="ArqHomeScreen"
                component={ArqHomeScreen}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ValidarJornalesSreen"
                component={ArqValidarJornales}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ArqCrearPedidoDeReintegroScreen"
                component={ArqCrearPedidoDeReintegro}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="ArqVerPedidosDeReintegroScreen"
                component={ArqConsultarPedidosDeReintegro}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ArqCrearPedidosDeObraScreen"
                component={ArqCrearPedidoDeObra}
              />

              <Stack.Screen
                options={{ headerShown: false }}
                name="ArqVerPedidosDeObraScreen"
                component={ArqConsultarPedidosDeObra}
              />
            </Stack.Group>
          </>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
