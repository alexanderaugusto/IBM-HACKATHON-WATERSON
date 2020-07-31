import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import colors from './constants/colors.json'

// Home
import Home from './screens/home'
import HomeDetails from './screens/home/Details'

// Chat
import Chat from './screens/chat'

const Tab = createBottomTabNavigator()

const TabMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            "Home": "room",
            "Chat": "chat",
          }

          return <MaterialIcons name={icons[route.name]} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: colors["bg-dark"],
        inactiveTintColor: colors["text"],
        style: { paddingBottom: 10, paddingTop: 10, height: 60 }
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={TabMenu} />
        <Stack.Screen name="home-details" component={HomeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}