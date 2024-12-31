import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Button } from 'react-native';

interface CameraWithPrintProps {
    photoUri: string;
}

const CameraWithPrint: React.FC<CameraWithPrintProps> = ({ photoUri }) => {
    const translateY = useRef(new Animated.Value(-200)).current;

    const handlePrintPhoto = () => {
        // Animação para "sair" da câmera
        Animated.timing(translateY, {
            toValue: 150,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            // Reinicia a posição para uma nova animação
            translateY.setValue(-200);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.camera}>
                <View style={styles.lens}></View>
                <View style={styles.slot}></View>
            </View>
            <Animated.View
                style={[
                    styles.photoContainer,
                    { transform: [{ translateY }] },
                ]}
            >
                <Image source={{ uri: photoUri }} style={styles.photo} />
            </Animated.View>
            <Button title="Imprimir Foto" onPress={handlePrintPhoto} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    camera: {
        width: 200,
        height: 150,
        backgroundColor: '#1e90ff',
        borderRadius: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lens: {
        width: 70,
        height: 70,
        backgroundColor: '#000',
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#fff',
    },
    slot: {
        width: 100,
        height: 10,
        backgroundColor: '#ccc',
        position: 'absolute',
        bottom: -5,
    },
    photoContainer: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
});

export default CameraWithPrint;
