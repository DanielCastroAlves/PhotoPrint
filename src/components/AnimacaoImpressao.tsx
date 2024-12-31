import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface AnimacaoImpressaoProps {
    uri: string;
}

const AnimacaoImpressao: React.FC<AnimacaoImpressaoProps> = ({ uri }) => {
    return (
        <Animatable.View animation="slideInDown" duration={1500} style={styles.container}>
            <Image source={{ uri }} style={styles.image} />
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: 220,
        height: 280,
        resizeMode: 'cover',
        backgroundColor: '#000',
        borderRadius: 10,
    },
});

export default AnimacaoImpressao;
