import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    const [savedPhotos, setSavedPhotos] = useState<string[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = '';
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Gallery') {
                            iconName = focused ? 'images' : 'images-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" options={{ title: 'Início' }}>
                    {(props) => (
                        <HomeScreen
                            {...props}
                            savedPhotos={savedPhotos}
                            selectedPhotos={selectedPhotos}
                            setSelectedPhotos={setSelectedPhotos}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name="Gallery" options={{ title: 'Galeria' }}>
                    {(props) => (
                        <GalleryScreen
                            {...props}
                            savedPhotos={savedPhotos}
                            setSavedPhotos={setSavedPhotos}
                            selectedPhotos={selectedPhotos}
                            setSelectedPhotos={setSelectedPhotos}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
