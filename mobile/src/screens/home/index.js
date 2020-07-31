import React, { useState, useEffect, useRef } from 'react'
import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Header, Loading } from '../../components'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5 } from '@expo/vector-icons'
import MapView, { Marker, Polygon } from 'react-native-maps'
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
  geocodeAsync,
  reverseGeocodeAsync
} from 'expo-location'
import colors from '../../constants/colors.json'
import api from '../../services/api'
import { formatTemp, formatScore, formatWeatherData } from '../../utils/util'
import { useNavigation } from '@react-navigation/native'

const latitudeDelta = 0.04
const longitudeDelta = 0.04

export default function Home() {
  const [initialRegion, setInitialRegion] = useState({
    latitudeDelta,
    longitudeDelta
  })
  const [currentRegion, setCurrentRegion] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [menuWeatherOpen, setMenuWeatherOpen] = useState(true)
  const [polygonCoordinates, setPolygonCoordinates] = useState(null)
  const [customRegion, setCustomRegion] = useState("")
  const [loading, setLoading] = useState(false)

  const inputRef = useRef()

  const navigation = useNavigation()

  const getInitialPosition = async () => {
    setLoading(true)

    const { granted } = await requestPermissionsAsync()

    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      })

      if (coords) {
        const { latitude, longitude } = coords

        setInitialRegion({
          ...initialRegion,
          latitude,
          longitude
        })

        setCurrentRegion({
          ...initialRegion,
          latitude,
          longitude
        })

        getWeatherConditions(latitude, longitude)

        setPolygonCoordinates(
          coordinates = [
            { latitude: -21.7608, longitude: -45.9975 },
            { latitude: -21.7782, longitude: -45.9816 },
            { latitude: -21.7762, longitude: -45.9565 },
            { latitude: -21.7610, longitude: -45.9542 }
          ]
        )

        const region = await reverseGeocodeAsync({ latitude, longitude })

        if (region.length) {
          let { city, region: uf, street } = region[0]
          city = city ? (city + ", ") : ""
          uf = uf || ""
          street = street ? (street + ", ") : ""

          setCustomRegion(street + city + uf)
        }
      }
    } else {
      Alert.alert(
        'Sorry for this error',
        'You did not grant access to your location, so we will not be able to show results for your location.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    }

    setLoading(false)
  }

  const getWeatherConditions = async (latitude, longitude) => {
    const response = await api.get("/get-iam-token")

    const data = {
      latitude,
      longitude,
      iam_token: response.data.iam_token
    }

    await api.post("/floods/weather-conditions/current", data)
      .then((res) => {
        setCurrentWeather(formatWeatherData(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => { (!initialRegion.latitude || !initialRegion.longitude) && getInitialPosition() }, [])

  const handleChange = (region) => setCustomRegion(region)

  const changeRegion = async () => {
    if (inputRef.current && inputRef.current.isFocused()) {
      inputRef.current.blur()
    }

    setLoading(true)

    const region = await geocodeAsync(customRegion)

    if (region.length) {
      const { latitude, longitude } = region[0]
      setCurrentRegion({ ...currentRegion, latitude, longitude })
      getWeatherConditions(latitude, longitude)
    } else {
      Alert.alert(
        'Sorry for this error',
        "We couldn't find a region with these characteristics, try to be more precise.",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    }

    setLoading(false)
  }

  const goToDetails = () => navigation.navigate("home-details", { currentRegion })

  return (
    <>
      <Header title="Home" options={[
        {
          title: "Reload",
          onClick: () => getInitialPosition()
        },
        {
          title: menuWeatherOpen ? "Close Weather Menu" : "Open Weather Menu",
          onClick: () => setMenuWeatherOpen(!menuWeatherOpen)
        }
      ]} />

      <Loading isLoading={loading} />

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome5 style={styles.inputIcon}
              name="search"
              size={16}
              color={colors["text"]}
              onPress={() => changeRegion()}
            />
            <TextInput
              ref={inputRef}
              style={styles.textField}
              onChangeText={text => handleChange(text)}
              placeholder="Search a custom region..."
              value={customRegion}
            />
            {customRegion.length > 0 && inputRef.current && inputRef.current.isFocused() && (
              <FontAwesome5 style={styles.inputIcon}
                name="times"
                size={16}
                color={colors["text"]}
                onPress={() => setCustomRegion("")}
              />
            )}
          </View>
          <TouchableOpacity onPress={() => changeRegion()}>
            <LinearGradient style={styles.buttonContainer} colors={colors.gradient}>
              <FontAwesome5 name="paper-plane" solid size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {initialRegion.latitude && initialRegion.longitude && (
          <MapView initialRegion={initialRegion} region={currentRegion} style={styles.mapContainer}>
            {/* <Polygon coordinates={polygonCoordinates} strokeColor={'rgba(255, 0, 0,0.9)'} fillColor={'rgba(255, 0, 0,0.4)'} /> */}
            <Marker coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }} />
          </MapView>
        )}

        {(currentWeather && menuWeatherOpen) && (
          <LinearGradient style={styles.weatherContainer} colors={colors.gradient}>
            <View style={styles.weather}>
              <View style={styles.weatherClose}>
                <Text style={styles.weatherText}>Flood Score</Text>
                <FontAwesome5
                  name="times"
                  size={20}
                  color="#FFFFFF"
                  onPress={() => setMenuWeatherOpen(false)}
                />
              </View>
              <View style={styles.floodScore}>
                <Text style={{ ...styles.weatherText, fontSize: 70 }}>
                  {formatScore(currentWeather.flood_score)}
                </Text>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.temperature}>
                <FontAwesome5 name={currentWeather.icon} solid size={22} color="#FFFFFF" />
                <Text style={styles.weatherText}>
                  {formatTemp(currentWeather.temperature)} - Today
                </Text>
              </View>
              <TouchableOpacity style={styles.detailButton} onPress={() => goToDetails()}>
                <Text style={styles.detailButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1,
    zIndex: 1
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 20,
    zIndex: 2
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2
  },
  inputIcon: {
    alignSelf: "center"
  },
  textField: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  weatherContainer: {
    position: "absolute",
    alignSelf: "center",
    width: "85%",
    zIndex: 2,
    bottom: 0,
    marginVertical: 15,
    borderRadius: 7,
    padding: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2
  },
  weather: {
    padding: 10
  },
  weatherClose: {
    flex: 1,
    marginTop: -10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  floodScore: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  weatherText: {
    color: "#FFFFFF",
    fontSize: 19,
    marginLeft: 15
  },
  detailContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF"
  },
  temperature: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  detailButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginTop: 10,
    marginBottom: -10
  },
  detailButtonText: {
    color: colors["title"]
  }
})