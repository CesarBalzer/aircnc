import React, { useState } from 'react';
import { SafeAreaView, Alert, Text, TextInput, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');

  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user").then();

    // console.log(AsyncStorage.getAllKeys());
    // console.log(id);
    // console.log(user_id);
    // return;
    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });

    Alert.alert('Solicitação de reserva enviada!');
    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar"
        placeholderTextColor='#999'
        keyboardType='number-pad'
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={text => setDate(text)}
      // Para encurtar devido ao nome ser o mesmo podemos usar a chamada da funcao setEmail direto:
      // onChangeText={setDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },

});