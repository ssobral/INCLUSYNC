import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LogoImage from '../assets/Logo Completo.png';
import SHA256 from 'crypto-js/sha256';
import encHex from 'crypto-js/enc-hex';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function hashPassword(password) {
        return SHA256(password).toString(encHex);
    }

    async function handleSubmit() {
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Preencha usuário e senha');
            return;
        }

        console.log("Vai tentar conectar");

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: hashPassword(password)
                }),
            });

            console.log("oi");

            const data = await response.json();

            if (data.code === 200) {
                navigation.navigate('Home', { email,acess: data.access });
            } else {
                setError('Usuário ou senha inválidos');
            }

        } catch (e) {
            console.error(e);
            setError('Erro ao conectar à API');
        }
    }

    // function handleSubmit() {
    //     setError('');
    //     if (!email.trim() || !password.trim()) {
    //         setError('Preencha usuário e senha');
    //         return;
    //     }
    //     navigation.navigate('Home', { email });
    // }


    const gradientColors = ['#a8c0ff', '#eef3ff', '#ffffff'];

    return (
        <LinearGradient
            colors={gradientColors}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.card}>
                    <View style={styles.logoCard}>
                        <Image source={LogoImage} style={styles.logo} />
                    </View>


                    <Text style={styles.label}>E-mail:</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        style={styles.input}
                        placeholderTextColor="#888"
                    />

                    <Text style={styles.label}>Senha:</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#888"
                    />

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                        <Text style={styles.linkText}>
                            Não possui conta? <Text style={styles.linkHighlight}>Clique aqui!</Text>
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        maxWidth: 420,
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 15,
    },
    logoPlaceholder: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0e7490',
        textAlign: 'center',
        marginBottom: 30
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e6e9ef',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600'
    },
    error: {
        color: '#b91c1c',
        marginBottom: 8,
        textAlign: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    logoCard: {
        alignItems: "center"
    },
    linkText: {
        textAlign: "center",
        color: "#444",
        marginTop: 10,
        marginBottom: 10
    },
    linkHighlight: {
        color: "#004987",
        fontWeight: "bold",
        textDecorationLine: "underline"
    }
});