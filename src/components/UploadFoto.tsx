import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AnimacaoImpressao from './AnimacaoImpressao';

interface UploadResponse {
    filePath: string;
}

const UploadFoto = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permissão necessária', 'É necessário permitir acesso à galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            const filename = localUri.split('/').pop();
            const type = `image/${filename?.split('.').pop()}`;

            const formData = new FormData();
            formData.append('photo', {
                uri: localUri,
                name: filename,
                type,
            } as any); // Usando `as any` para contornar o problema de tipo

            try {
                const response = await axios.post<UploadResponse>('http://192.168.0.189:3001/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                

                Alert.alert('Upload realizado!', `Foto salva: ${response.data.filePath}`);
                console.log('Caminho da imagem no servidor:', response.data.filePath);

                setSelectedImage(response.data.filePath); // Atualiza a imagem para o link retornado
                setShowAnimation(false); // Reinicia a animação
            } catch (error) {
                if (error instanceof Error) {
                    Alert.alert('Erro ao enviar a foto.', error.message);
                } else {
                    console.error('Erro inesperado:', error);
                }
            }
        }
    };

    const startAnimation = () => {
        if (!selectedImage) {
            Alert.alert('Selecione uma foto primeiro!');
            return;
        }
        setShowAnimation(true);
    };

    return (
        <View style={styles.container}>
            <Button title="Selecionar Foto" onPress={pickImage} />
            {selectedImage && !showAnimation && (
                <Button title="Imprimir Foto" onPress={startAnimation} />
            )}
            {showAnimation && selectedImage && (
                <AnimacaoImpressao uri={selectedImage} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
});

export default UploadFoto;
