import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';

interface GalleryScreenProps {
    savedPhotos: string[];
    setSavedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPhotos: string[];
    setSelectedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

interface PhotoResponse {
    filepath: string;
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({
    savedPhotos,
    setSavedPhotos,
    selectedPhotos,
    setSelectedPhotos,
}) => {
    // Função para buscar fotos salvas no backend
    const fetchSavedPhotos = async () => {
        try {
            const response = await axios.get<PhotoResponse[]>('http://192.168.0.189:3001/images'); // Altere para o IP correto
            setSavedPhotos(response.data.map((photo) => photo.filepath));
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as fotos.');
            console.error(error);
        }
    };

    // Carregar fotos ao montar o componente
    useEffect(() => {
        fetchSavedPhotos();
    }, []);

    // Adicionar foto fictícia (apenas para teste)
    const handleAddPhoto = () => {
        const newPhoto = `https://via.placeholder.com/200?text=Photo+${savedPhotos.length + 1}`;
        setSavedPhotos((prev) => [...prev, newPhoto]);
    };

    // Excluir foto do backend e atualizar a lista
    const handleDeletePhoto = async (uri: string) => {
        try {
            await axios.request({
                method: 'DELETE',
                url: 'http://192.168.0.189:3001/images', // Altere para o IP correto
                data: { filepath: uri }, // Dados enviados no corpo da requisição
            });
            setSavedPhotos((prev) => prev.filter((photo) => photo !== uri));
            setSelectedPhotos((prev) => prev.filter((photo) => photo !== uri));
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir a foto.');
            console.error(error);
        }
    };
    
    // Selecionar ou desselecionar fotos
    const handleSelectPhoto = (uri: string) => {
        if (selectedPhotos.includes(uri)) {
            setSelectedPhotos((prev) => prev.filter((photo) => photo !== uri));
        } else {
            setSelectedPhotos((prev) => [...prev, uri]);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Galeria de Fotos</Text>
            <Button title="Adicionar Foto" onPress={handleAddPhoto} />
            {savedPhotos.length === 0 ? (
                <Text style={styles.subtitle}>Nenhuma foto disponível.</Text>
            ) : (
                <FlatList
                    data={savedPhotos}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.photoContainer}>
                            <Image source={{ uri: item }} style={styles.image} />
                            <Button
                                title={selectedPhotos.includes(item) ? 'Deselecionar' : 'Selecionar'}
                                onPress={() => handleSelectPhoto(item)}
                            />
                            <Button
                                title="Excluir"
                                color="red"
                                onPress={() => handleDeletePhoto(item)}
                            />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginVertical: 20,
    },
    photoContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
});

export default GalleryScreen;
