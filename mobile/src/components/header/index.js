import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import colors from '../../constants/colors.json'
import { useNavigation } from '@react-navigation/native'

export default function Header({ title, options, goBack }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigation = useNavigation()

  const handleClick = (onClick) => {
    onClick()
    setMenuOpen(false)
  }

  if (goBack) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={20} color={colors["text"]} />
          <Text style={{ ...styles.title, marginLeft: 15, marginTop: -5 }}>{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <View
        style={{ ...styles.container, justifyContent: "space-between" }}
      >
        <Image style={styles.logo} source={require('../../../assets/logo.png')}
        />
        <TouchableOpacity style={styles.button} onPress={() => setMenuOpen(!menuOpen)}>
          <FontAwesome5 name="ellipsis-v" size={20} color={colors["text"]} />
        </TouchableOpacity>

        {menuOpen && options.length > 0(
          <View style={styles.menu}>
            {options.map((option, index) => {
              return (
                <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.8}
                  onPress={() => handleClick(option.onClick)}
                >
                  <Text style={styles.menuText}>{option.title}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors["header"],
    width: "100%",
    height: "12%",
    minHeight: 80,
    maxHeight: 120,
    padding: 15,
    paddingBottom: 18,
    alignItems: "flex-end",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    elevation: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  button: {
    flexDirection: "row",
    padding: 10,
    marginBottom: -10
  },
  title: {
    color: colors["text"],
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: 20,
    flex: 1
  },
  logo: {
    height: 84,
    width: 138.6,
    marginBottom: -30
  },
  menu: {
    position: "absolute",
    right: 10,
    top: 100,
    zIndex: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 10
  },
  menuItem: {
    padding: 5,
    marginVertical: 10,
  },
  menuText: {
    color: colors["text"]
  }
})