import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../../constants/colors.json'

export default function Loading({ isLoading }) {
  if (!isLoading)
    return false

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors["bg-dark"]} />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    zIndex: 2,
    top: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 80,
    height: 80
  },
})