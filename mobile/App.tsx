import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from "./pages/Welcome";
import Login from './pages/Login'
import Home from './pages/Home';
import Profile from "./pages/Profile";
import StoreProvider from "./utils/StoreProvider";
import Widget from "./pages/Widget";

const Stack = createNativeStackNavigator();

function App() {
  return (
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="Widget" component={Widget} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
  );
}

export default App