import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';

interface GalleryScreenProps {
    savedPhotos: string[];
    setSavedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPhotos: string[];
    setSelectedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({
    savedPhotos,
    setSavedPhotos,
    selectedPhotos,
    setSelectedPhotos,
}) => {
    const handleAddPhoto = () => {
        const newPhoto = `https://via.placeholder.com/200?text=Photo+${savedPhotos.length + 1}`;
        setSavedPhotos((prev) => [...prev, newPhoto]);
    };

    const handleDeletePhoto = (uri: string) => {
        setSavedPhotos((prev) => prev.filter((photo) => photo !== uri));
        setSelectedPhotos((prev) => prev.filter((photo) => photo !== uri));
    };

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
                    horizontal
                    data={savedPhotos}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.filmFrame}>
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
                    contentContainerStyle={styles.filmRollContainer}
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
    filmRollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    filmFrame: {
        marginHorizontal: 8,
        padding: 8,
        backgroundColor: '#555',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default GalleryScreen;
