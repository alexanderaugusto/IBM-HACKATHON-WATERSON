import React, { useState, useEffect } from 'react'
import { Alert, FlatList, View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Header, Loading } from '../../components'
import api from '../../services/api'
import { useRoute } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { createRows, formatScore, formatTemp, formatEveryWeatherData, formatTime } from '../../utils/util'
import colors from '../../constants/colors.json'
import { LinearGradient } from 'expo-linear-gradient'

export default function HomeDetails() {
  const [loading, setLoading] = useState(false)
  const [everyWeatherConditions, setEveryWeatherConditions] = useState([])

  const route = useRoute()

  const getEveryWeatherConditions = async (latitude, longitude) => {
    const response = await api.get("/get-iam-token")

    const data = {
      latitude,
      longitude,
      iam_token: response.data.iam_token
    }

    setLoading(true)

    await api.post("/floods/weather-conditions/every", data)
      .then((res) => {
        setEveryWeatherConditions(formatEveryWeatherData(res.data))
      })
      .catch((err) => {
        console.log(err)
      })

    setLoading(false)
  }

  useEffect(() => {
    const { latitude, longitude } = route.params.currentRegion

    if (!everyWeatherConditions.length)
      getEveryWeatherConditions(latitude, longitude)
  }, [])

  return (
    <>
      <Header title="Flood Details" goBack={true} />

      <Loading isLoading={loading} />

      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          {everyWeatherConditions.map((value) => {
            return (
              <View key={value.date}>
                <Text style={styles.textDate}>{value.date}</Text>
                <FlatList
                  keyExtractor={item => item.id}
                  data={createRows(value.data, 2)}
                  numColumns={2}
                  renderItem={({ item }) => {
                    if (item.empty) {
                      return <View style={{ ...styles.listItem, backgroundColor: "transparent" }} />
                    }

                    return (
                      <TouchableOpacity style={styles.listItemContainer} activeOpacity={1}>
                        <LinearGradient style={styles.listItem} colors={colors.gradient}>
                          <View style={styles.listItemHeader}>
                            <Text style={{ ...styles.listText, fontSize: 15, fontWeight: "bold" }}>
                              Weather Conditions
                      </Text>
                            <Text style={{ ...styles.listText, fontSize: 19, fontWeight: "bold" }}>
                              {formatTime(item.time)}
                            </Text>
                          </View>
                          <View style={styles.listItemBody}>
                            <Text style={{ ...styles.listText, fontSize: 40 }}>{formatScore(item.flood_score)}</Text>
                            <Text style={styles.listText}>Flood Score</Text>
                          </View>
                          <View style={styles.listItemFooter}>
                            <FontAwesome5 name={item.icon} solid size={26} color="#FFFFFF" />
                            <Text style={{ ...styles.listText, fontSize: 17 }}>
                              {formatTemp(item.temperature)} - {item.summary}
                            </Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>
            )
          })}
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    paddingHorizontal: 5
  },
  listItemContainer: {
    flexGrow: 1,
    margin: 5,
    flexBasis: 0,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    elevation: 1,
    borderRadius: 10
  },
  textDate: {
    color: colors["title"],
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  listItem: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    flexGrow: 1,
    flexBasis: 0,
    justifyContent: "space-between"
  },
  listItemHeader: {
    justifyContent: "center",
    alignItems: "center"
  },
  listItemBody: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15
  },
  listItemFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  listText: {
    color: "#FFFFFF",
    textAlign: "center"
  }
})