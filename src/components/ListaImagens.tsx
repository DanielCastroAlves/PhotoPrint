import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';

interface Imagem {
    id: number;
    filename: string;
    filepath: string;
    created_at: string;
}

const ListaImagens = () => {
    const [imagens, setImagens] = useState<Imagem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchImages = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get<Imagem[]>('http://192.168.0.189:3001/images');
            setImagens(response.data);
        } catch (err) {
            setError(true);
            Alert.alert('Erro ao carregar imagens', err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erro ao carregar imagens.</Text>
                <Button title="Tentar Novamente" onPress={fetchImages} />
            </View>
        );
    }

    if (imagens.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhuma imagem encontrada.</Text>
                <Button title="Tentar Novamente" onPress={fetchImages} />
            </View>
        );
    }

    return (
        <FlatList
            data={imagens}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.filepath }} style={styles.image} />
                    <Text style={styles.filename}>{item.filename}</Text>
                </View>
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        marginTop: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10,
    },
    listContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    filename: {
        marginTop: 8,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ListaImagens;
