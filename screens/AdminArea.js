import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Checkbox from "expo-checkbox";
import Logo from '../assets/Logo.png'

export default function Home({ navigation, route }) {

    const adminEmail = route?.params?.email ?? null;

    const [email, setEmail] = useState('');
    const [erro, setErro] = useState('');
    const [respostaApi, setRespostaApi] = useState('');

    async function handleSubmit() {

        if (adminEmail === null) {
            navigation.navigate('Login');
        }

        if (!email) {
            setErro('Digite o e-mail.');
            return;
        }

        setErro('');
        setRespostaApi('');

        try {
            const response = await fetch("http://localhost:8080/user", {
                method: "DELETE",
                headers: {
                    "userEmail": email,
                    "adminEmail": adminEmail
                }
            });

            setRespostaApi("Usuário excluído com sucesso.");
            setEmail("");

        } catch (error) {
            setRespostaApi("Erro ao enviar requisição: " + error.message);
        }
    }

    function returnToHome() {
        var email = adminEmail;
        const access = route?.params?.access ?? null;
        navigation.navigate('Home', { email, access });
    }

    return (
        <View style={styles.container}>

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.logoutButton} onPress={returnToHome}>
                    <Text style={styles.logoutText}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.formTitle}>Digite o e-mail do usuário que deseja excluir:</Text>

                <TextInput
                    style={styles.formInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite o e-mail."
                />

                {erro ? <Text style={styles.error}>{erro}</Text> : null}
                {respostaApi ? <Text style={styles.success}>{respostaApi}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    navBar: {
        backgroundColor: '#DFE9F5',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    logoutText: {
        marginTop: 30,
        color: '#004987',
        fontWeight: '700'
    },
    form: {
        margin: 30
    },
    formTitle: {
        textAlign: 'center',
        marginBottom: 20
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#e6e9ef',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#004987',
        padding: 12,
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center'
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center'
    },
    success: {
        color: 'green',
        marginBottom: 10,
        textAlign: 'center'
    }
});
