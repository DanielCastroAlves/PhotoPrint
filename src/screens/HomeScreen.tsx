import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    Alert,
    Animated,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface HomeScreenProps {
    savedPhotos: string[]; // Adicionado aqui
    selectedPhotos: string[];
    setSelectedPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ savedPhotos, selectedPhotos, setSelectedPhotos }) => {
    const [printing, setPrinting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
    const animationValues = useRef<Animated.Value[]>([]).current;

    useEffect(() => {
        while (animationValues.length < selectedPhotos.length) {
            animationValues.push(new Animated.Value(0));
        }
    }, [selectedPhotos]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setSelectedPhotos([]); // Limpar fotos ao sair da tela
            };
        }, [setSelectedPhotos])
    );

    const handlePrint = () => {
        if (selectedPhotos.length === 0) {
            Alert.alert('Nenhuma Foto Selecionada', 'Selecione fotos para impressão.');
            return;
        }

        setPrinting(true);

        const animations = selectedPhotos.map((_, index) =>
            Animated.timing(animationValues[index], {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );

        Animated.stagger(500, animations).start(() => {
            setPrinting(false);
            animationValues.forEach((anim) => anim.setValue(0));
        });
    };

    const handlePhotoClick = (photo: string) => {
        setCurrentPhoto(photo);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Imprimir Fotos</Text>
            <View style={styles.cameraContainer}>
                <View style={styles.cameraBody}>
                    <View style={styles.lens} />
                    <View style={styles.flash} />
                </View>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        {currentPhoto && (
                            <Image source={{ uri: currentPhoto }} style={styles.fullScreenImage} />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {printing ? (
                <FlatList
                    data={selectedPhotos}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item, index }) => {
                        const translateY = animationValues[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [-300, 0],
                        });

                        return (
                            <Animated.View
                                style={[styles.polaroidContainer, { transform: [{ translateY }] }]}
                            >
                                <Image source={{ uri: item }} style={styles.polaroidImage} />
                                <Text style={styles.polaroidText}>PhotoPrint</Text>
                            </Animated.View>
                        );
                    }}
                />
            ) : (
                <ScrollView contentContainerStyle={styles.printedPhotosContainer}>
                    {savedPhotos.map((photo, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePhotoClick(photo)}>
                            <View style={styles.polaroidContainer}>
                                <Image source={{ uri: photo }} style={styles.polaroidImage} />
                                <Text style={styles.polaroidText}>PhotoPrint</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <Button title="Imprimir Fotos" onPress={handlePrint} />
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
    cameraContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cameraBody: {
        width: 100,
        height: 80,
        backgroundColor: '#5dbcd2',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    lens: {
        width: 40,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 20,
    },
    flash: {
        width: 10,
        height: 10,
        backgroundColor: 'yellow',
        borderRadius: 5,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    polaroidContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        width: 180,
        alignItems: 'center',
    },
    polaroidImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        borderRadius: 5,
    },
    polaroidText: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
    printedPhotosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
    },
});

export default HomeScreen;
