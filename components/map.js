import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
    const intial = {
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    }
    const [locale, setLocale] = useState(intial)

    useEffect(() => {
        const fetchingLoc = async () => {
            console.log("Fetching")
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                Alert.alert("Ei lupaa")
                return;
            }

            let fetch = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            console.log(fetch)
            setLocale({...locale, lat: fetch.coords.latitude, long: fetch.coords.longitude})
        }
        fetchingLoc()
        console.log(locale)
    }, [])

    return(
        <View style={styles.container}>
            <MapView
                style={{ flex: 1, width: "100%" }}
                region={locale}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {

    }
  });