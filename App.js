import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
//Docs de react native paper: https://callstack.github.io/react-native-paper/4.0/index.html
import { registerTranslation, enGB } from "react-native-paper-dates";

import LoginScreen from "./src/pantallas/LoginScreen";
import HomeScreen from "./src/pantallas/HomeScreen";

//Componentes principales
import CrearPedidoDeObra from "./src/pantallas/PedidoDeObra/CrearPedidoDeObra";
import ConsultarPedidosDeObra from "./src/pantallas/PedidoDeObra/ConsultarPedidosDeObra";
import ConsultarJornales from "./src/pantallas/Jornal/ConsultarJornales";
import CrearJornal from "./src/pantallas/Jornal/CrearJornal";
import ConsultarPedidosDeReintegro from "./src/pantallas/PedidoDeReintegro/ConsultarPedidosDeReintegro";
import CrearPedidoDeReintegro from "./src/pantallas/PedidoDeReintegro/CrearPedidoDeReintegro";

//Componentes ABM datos maestros
import ConsultarObras from "./src/pantallas/Obra/ConsultarObras";
import CrearObra from "./src/pantallas/Obra/CrearObra";
import ConsultarRubros from "./src/pantallas/Rubro/ConsultarRubros";
import CrearRubro from "./src/pantallas/Rubro/CrearRubro";

const Stack = createStackNavigator();

export default function App() {
  registerTranslation("en", enGB);
  return (
    <PaperProvider>
      <AppWithNavigation />
    </PaperProvider>
  );
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearPedidoDeObraScreen"
            component={CrearPedidoDeObra}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerPedidosDeObraScreen"
            component={ConsultarPedidosDeObra}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearJornalScreen"
            component={CrearJornal}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerJornalesScreen"
            component={ConsultarJornales}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearPedidoDeReintegroScreen"
            component={CrearPedidoDeReintegro}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerPedidosDeReintegroScreen"
            component={ConsultarPedidosDeReintegro}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearObraScreen"
            component={CrearObra}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerObrasScreen"
            component={ConsultarObras}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearRubroScreen"
            component={CrearRubro}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerRubrosScreen"
            component={ConsultarRubros}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}></Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/*
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
            name="CrearPedidoDeObraScreen"
            component={CrearPedidoDeObra}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerPedidosDeObraScreen"
            component={ConsultarPedidosDeObra}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearJornalScreen"
            component={CrearJornal}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerJornalesScreen"
            component={ConsultarJornales}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearPedidoDeReintegroScreen"
            component={CrearPedidoDeReintegro}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerPedidosDeReintegroScreen"
            component={ConsultarPedidosDeReintegro}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearObraScreen"
            component={CrearObra}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerObrasScreen"
            component={ConsultarObras}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="CrearRubroScreen"
            component={CrearRubro}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="VerRubrosScreen"
            component={ConsultarRubros}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}></Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
