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

//Pantallas administrador

import AdminHome from "./src/pantallasWebAdmin/HomeAdmin";
import AdminEstadosObra from "./src/pantallasWebAdmin/EstadosObra/EstadosObra";
import AdminNotificaciones from "./src/pantallasWebAdmin/Notificaciones/Notificaciones";
import MenuAdministracionSistema from "./src/pantallasWebAdmin/AdministracionDelSistema/MenuAdministracionSistema";
import AdminReporteRapido from "./src/pantallasWebAdmin/ReporteContratistas/ReporteRapido";
import AdminMenuTareas from "./src/pantallasWebAdmin/Tareas/MenuTareas";
import AdminPedidosDeObraYMateriales from "./src/pantallasWebAdmin/Tareas/PedidosObraYMateriales";
import AdminPedidosDeReintegro from "./src/pantallasWebAdmin/Tareas/PedidosReintegro";
import AdminTodasTareas from "./src/pantallasWebAdmin/Tareas/TodasTareas";

//Componentes ABM datos maestros para admin
import AdminConsultarObras from "./src/pantallasWebAdmin/AdministracionDelSistema/Obra/ConsultarObras";
import AdminCrearObra from "./src/pantallasWebAdmin/AdministracionDelSistema/Obra/CrearObra";
import AdminConsultarRubros from "./src/pantallasWebAdmin/AdministracionDelSistema/Rubro/ConsultarRubros";
import AdminCrearRubro from "./src/pantallasWebAdmin/AdministracionDelSistema/Rubro/CrearRubro";

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
          {/*Aca van las pantallas del administrador */}
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminHomeScreen"
              component={AdminHome}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminEstadosObraScreen"
              component={AdminEstadosObra}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminNotificacionesScreen"
              component={AdminNotificaciones}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="MenuAdministracionScreen"
              component={MenuAdministracionSistema}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminReporteRapidoScreen"
              component={AdminReporteRapido}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminMenuTareasScreen"
              component={AdminMenuTareas}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminPedidosDeObraYMaterialesScreen"
              component={AdminPedidosDeObraYMateriales}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminPedidosDeReintegroScreen"
              component={AdminPedidosDeReintegro}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminTodasTareasScreen"
              component={AdminTodasTareas}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminCrearObraScreen"
              component={AdminCrearObra}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminVerObrasScreen"
              component={AdminConsultarObras}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminCrearRubroScreen"
              component={AdminCrearRubro}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AdminVerRubrosScreen"
              component={AdminConsultarRubros}
            />
          </>

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
        <Stack.Group screenOptions={{ presentation: "modal" }}></Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
