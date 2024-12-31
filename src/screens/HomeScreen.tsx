import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UploadFoto from '../components/UploadFoto';
import ListaImagens from '../components/ListaImagens';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo ao PhotoPrint!</Text>
            <UploadFoto />
            <Text style={styles.subtext}>Suas Fotos</Text>
            <ListaImagens />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtext: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginTop: 20, // Mais espaço entre o botão e o texto
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default HomeScreen;
