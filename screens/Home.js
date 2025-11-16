import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Checkbox from "expo-checkbox";
import Logo from '../assets/Logo.png'


export default function Home({ navigation, route }) {

    const email = route?.params?.email ?? null;

    function logout() {
        navigation.navigate('Login');
    }

    const [startAdd, setStartAdd] = useState('');
    const [endAdd, setEndAdd] = useState('');
    const [respostaApi, setRespostaApi] = useState("");
    const [erro, setErro] = useState('');

    async function handleSubmit() {

        if (!startAdd || !endAdd) {
            setErro('Preencha todos os campos!');
            return;
        }

        setErro('');
        setRespostaApi("");

        try {
            const response = await fetch("https://localhost:8080/x/xt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    startAdd,
                    endAdd
                }),
            });

            const data = await response.json();

            setRespostaApi(JSON.stringify(data, null, 2));

        } catch (error) {
            setRespostaApi("Erro ao enviar requisição: " + error.message);
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.navBar}>
                <Image source={Logo} style={styles.navBarLogo} />
            </View>

            <View style={styles.wellcomeText}>
                <Text style={styles.title}>Bem vindo ao IncluSync.</Text>
                <Text style={styles.subtitle}>Seu assistente na geração de rotas inclusivas pelo metro de São Paulo.</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formTitle}>Preencha as seguintes informações:</Text>

                <Text style={styles.formLabel}>Endereço de partida:</Text>
                <TextInput style={styles.formInput} value={startAdd} onChangeText={setStartAdd} placeholder="Digite o endereço de partida." />

                <Text style={styles.formLabel}>Endereço de chegada:</Text>
                <TextInput style={styles.formInput} value={endAdd} onChangeText={setEndAdd} placeholder="Digite o endereço de chegada." />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <TextInput style={styles.textarea} multiline editable={false} value={respostaApi} />
            </View>

            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        backgroundColor: '#FFFFFF'
    },
    navBar: {
        backgroundColor: '#DFE9F5'
    },
    navBarLogo: {
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 10,
        width: 40,
        height: 40
    },
    button: { backgroundColor: '#ef4444', padding: 12, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: '600' },
    wellcomeText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        margin: 30
    },
    title: {
        fontWeight: '800',
        fontSize: 23,
        color: '#004987'
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center'
    }
});