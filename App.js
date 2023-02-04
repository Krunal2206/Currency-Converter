import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import CurrencyListScreen from './app/screens/CurrencyListScreen';
import CurrencyListProvider from './app/context/CurrencyListProvider';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <CurrencyListProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#242526',
          },
          headerTintColor: '#38d6d5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          statusBarColor: '#fff'
        }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Exchange Rate', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 20 } }} />
          <Stack.Screen name="CurrencyList" component={CurrencyListScreen} options={{
            title: 'Select Currency', headerTintColor: '#fff', headerTitleStyle: { fontSize: 20 }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrencyListProvider>
  );
}
