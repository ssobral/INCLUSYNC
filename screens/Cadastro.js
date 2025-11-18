import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import LogoImage from '../assets/Logo Completo.png';

export default function Cadastro({ navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [deficiencia, setDeficiencia] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSubmit() {
        setError('');
        setSuccess('');

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmSenha.trim()) {
            setError('Preencha todos os campos.');
            return;
        }

        if (senha !== confirmSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        const access = "user";

        const body = {
            nome,
            email,
            senha,
            possuiDeficienciaMobilidade: deficiencia,
            access
        };

        try {
            const response = await fetch("https://localhost:8080/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Cadastro realizado com sucesso!");
                setTimeout(() => navigation.navigate("Login"), 1500);
            } else {
                setError(data.message || "Erro ao cadastrar.");
            }

        } catch (e) {
            setError("Erro ao conectar ao servidor.");
        }
    }

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

                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        style={styles.input}
                        placeholderTextColor="#888"
                    />

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
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#888"
                    />

                    <Text style={styles.label}>Confirmar Senha:</Text>
                    <TextInput
                        value={confirmSenha}
                        onChangeText={setConfirmSenha}
                        secureTextEntry
                        style={styles.input}
                        placeholderTextColor="#888"
                    />

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={deficiencia}
                            onValueChange={setDeficiencia}
                            color={deficiencia ? "#2563eb" : undefined}
                        />
                        <Text style={styles.checkboxLabel}>
                            Possui deficiência de mobilidade?
                        </Text>
                    </View>

                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    {success ? <Text style={styles.success}>{success}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.linkText}>
                            Já possui conta? <Text style={styles.linkHighlight}>Entrar</Text>
                        </Text>
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
    logoCard: {
        alignItems: "center",
        marginBottom: 10
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e6e9ef',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 5
    },
    checkboxLabel: {
        marginLeft: 10,
        color: "#333"
    },
    button: {
        backgroundColor: '#2563eb',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
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
    success: {
        color: 'green',
        marginBottom: 8,
        textAlign: 'center'
    },
    linkText: {
        textAlign: "center",
        color: "#444",
        marginTop: 15,
        marginBottom: 5
    },
    linkHighlight: {
        color: "#004987",
        fontWeight: "bold",
        textDecorationLine: "underline"
    }
});
