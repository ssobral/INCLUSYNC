import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Checkbox from "expo-checkbox";
import Logo from '../assets/Logo.png'


export default function Home({ navigation, route }) {

    const email = route?.params?.email ?? null;
    //const access = route?.params?.access ?? null;
    const access = "admin";

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
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.wellcomeText}>
                <Text style={styles.title}>Bem vindo ao IncluSync.</Text>
                <Text style={styles.subtitle}>Seu assistente na geração de rotas inclusivas pelo metro de São Paulo.</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formTitle}>Preencha o formulário para receber a rota mais adequada à você!</Text>

                <Text style={styles.formLabel}>Endereço de partida:</Text>
                <TextInput style={styles.formInput} value={startAdd} onChangeText={setStartAdd} placeholder="Digite o endereço de partida." />

                <Text style={styles.formLabel}>Endereço de chegada:</Text>
                <TextInput style={styles.formInput} value={endAdd} onChangeText={setEndAdd} placeholder="Digite o endereço de chegada." />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <TextInput style={styles.textarea} multiline editable={false} value={respostaApi} />

                {access === "admin" && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminArea', {email})}>
                        <Text style={styles.buttonText}>Área do Admin</Text>
                    </TouchableOpacity>
                )}
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
    navBarLogo: {
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 10,
        width: 40,
        height: 40
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
        color: '#004987',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center'
    },
    formTitle: {
        textAlign: 'center',
        marginBottom: 20
    },
    formLabel: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
        marginTop: 10,
        fontWeight: '500'
    },
    form: {
        marginLeft: 30,
        marginRight: 30
    },
    formInput: {
        borderWidth: 1,
        borderColor: '#e6e9ef',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    }
});