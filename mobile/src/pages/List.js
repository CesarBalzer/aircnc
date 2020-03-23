import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, AsyncStorage, ScrollView, Text, StyleSheet, Image } from 'react-native';

import socketio from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://localhost:3333', {
        query: { user_id }
      });
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      });

    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });

  }, []);

  function logout() {
    AsyncStorage.setItem('user', '').then(user => {
      navigation.navigate('Login');
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text onPress={logout} style={styles.logout}>Sair</Text>
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  },

  logout: {
    color: '#f05a5b',
    textAlign: 'right',
    paddingRight: 10,
  }
});