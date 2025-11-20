import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Checkbox from "expo-checkbox";
import Logo from '../assets/Logo.png'


export default function Home({ navigation, route }) {

    const email = route?.params?.email ?? null;
    const access = route?.params?.access ?? null;



    function logout() {
        navigation.navigate('Login');
    }

    const [startAdd, setStartAdd] = useState('');
    const [endAdd, setEndAdd] = useState('');
    const [respostaApi, setRespostaApi] = useState("");
    const [erro, setErro] = useState('');


    async function handleSubmit() {

        if (email === null){
            navigation.navigate('Login');
        }

        if (!startAdd || !endAdd) {
            setErro('Preencha todos os campos!');
            return;
        }

        setErro('');
        setRespostaApi("");

        try {
            const response = await fetch("http://localhost:8080/direction", {
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

            setRespostaApi(data.message);

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

                {access === "admin" && (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminArea', { email, access })}>
                        <Text style={styles.buttonText}>Área do Admin</Text>
                    </TouchableOpacity>
                )}


                <Text style={styles.formTitle}>Preencha o formulário para receber a rota mais adequada à você!</Text>

                <Text style={styles.formLabel}>Endereço de partida:</Text>
                <TextInput style={styles.formInput} value={startAdd} onChangeText={setStartAdd} placeholder="Digite o endereço de partida." />

                <Text style={styles.formLabel}>Endereço de chegada:</Text>
                <TextInput style={styles.formInput} value={endAdd} onChangeText={setEndAdd} placeholder="Digite o endereço de chegada." />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.textarea}
                    multiline
                    editable={false}
                    value={typeof respostaApi === "string" ? respostaApi : JSON.stringify(respostaApi, null, 2)}
                    placeholder="A melhor rota será exibida aqui."
                    textAlignVertical="top"
                />



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
        marginBottom: 20,
        marginTop: 20
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
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#e6e9ef',
        borderRadius: 8,
        padding: 12,
        marginTop: 20,
        textAlignVertical: "top",
        height: 400,
    }

});