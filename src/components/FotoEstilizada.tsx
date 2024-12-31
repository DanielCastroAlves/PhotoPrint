import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface FotoEstilizadaProps {
    uri: string;
}

const FotoEstilizada: React.FC<FotoEstilizadaProps> = ({ uri }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 220,
        height: 280,
        backgroundColor: '#000', // Fundo preto como uma borda
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
        filter: 'grayscale(50%) sepia(20%) contrast(1.2)', // Estilo vintage
    },
});

export default FotoEstilizada;
