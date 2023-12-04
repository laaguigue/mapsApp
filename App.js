import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { Platform } from 'react-native';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null)
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location)
    })();
  }, []);


  return (
    <View style={styles.container}>
      {location && location?
        (
          <MapView 
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={styles.map} 
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03
            }}
          >
            <Marker coordinate={{
              latitude: 27.159100,
              longitude: -13.216
            }}/>
          </MapView>
        ) : (
          <View>
            <Text style= {{fontSize: 50}}>no map</Text>
          </View>
        )
        
       }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
    flex:1,
    ...Platform.select({
      ios: {
        borderRadius:26,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        overflow: 'hidden',
        borderRadius:26,
        elevation: 4,
      }
    })
  },
});

