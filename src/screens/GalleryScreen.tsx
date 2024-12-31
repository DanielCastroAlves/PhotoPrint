import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListaImagens from '../components/ListaImagens';
import UploadFoto from '../components/UploadFoto';

const GalleryScreen = () => {
    return (
        <View style={styles.container}>
            <UploadFoto />
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
});

export default GalleryScreen;
