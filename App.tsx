import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = ''; // Garantir que seja sempre uma string

                        // Verifica a rota e atribui o ícone correspondente
                        if (route.name === 'Home') {
                            iconName = focused ? 'camera' : 'camera-outline';
                        } else if (route.name === 'Gallery') {
                            iconName = focused ? 'images' : 'images-outline';
                        }

                        // Retorna o ícone
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
                <Tab.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Galeria' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
