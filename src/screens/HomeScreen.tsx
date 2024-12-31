import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, Alert } from 'react-native';
import AnimacaoImpressao from '../components/AnimacaoImpressao';

interface HomeScreenProps {
    savedPhotos: string[];
    selectedPhotos: string[];
    setSelectedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
    savedPhotos,
    selectedPhotos,
    setSelectedPhotos,
}) => {
    const [showAnimation, setShowAnimation] = useState(false);

    const handleSelectPhotos = () => {
        if (savedPhotos.length === 0) {
            Alert.alert('Galeria Vazia', 'Adicione fotos na galeria antes de selecionar.');
            return;
        }
        setSelectedPhotos([...savedPhotos]); // Seleciona todas as fotos disponíveis
        Alert.alert('Fotos Selecionadas', 'Todas as fotos foram selecionadas!');
    };

    const handlePrint = () => {
        if (selectedPhotos.length === 0) {
            Alert.alert('Nenhuma Foto Selecionada', 'Selecione fotos para impressão.');
            return;
        }
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
            Alert.alert('Impressão Concluída', 'Suas fotos foram impressas com sucesso!');
        }, 3000); // Duração da animação (3 segundos)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Imprimir Fotos</Text>
            {showAnimation ? (
                <AnimacaoImpressao uri={selectedPhotos[0]} /> // Mostra a animação
            ) : (
                <>
                    {selectedPhotos.length === 0 ? (
                        <>
                            <Text style={styles.subtitle}>Nenhuma foto selecionada.</Text>
                            <Button title="Selecionar Fotos" onPress={handleSelectPhotos} />
                        </>
                    ) : (
                        <>
                            <FlatList
                                data={selectedPhotos}
                                keyExtractor={(item, index) => `${item}-${index}`}
                                renderItem={({ item }) => (
                                    <Image source={{ uri: item }} style={styles.image} />
                                )}
                                style={styles.list}
                            />
                            <Button title="Imprimir Fotos" onPress={handlePrint} />
                        </>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
    },
    list: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10,
    },
});

export default HomeScreen;
