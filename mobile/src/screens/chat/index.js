import React, { useState, useEffect, useRef } from 'react'
import { Alert, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Header, Loading } from '../../components'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5 } from '@expo/vector-icons'
import api from '../../services/api'
import colors from '../../constants/colors.json'

export default function Chat() {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      user: "waterson-assistent",
      text: "Hello human, I'm Watson Assistant!"
    },
    {
      user: "waterson-assistent",
      text: "My job here is to give you guidance on how to prevent and survive flooding"
    },
    {
      user: "waterson-assistent",
      text: "Feel free to ask me anything"
    },
    {
      user: "waterson-assistent",
      text: "I'll do my best to answer you in the best way, let's go :)"
    }
  ])
  const [sessionId, setSessionId] = useState("")
  const [loading, setLoading] = useState(false)
  const [answerLoading, setAnswerLoading] = useState(false)
  const scrollRef = useRef()

  useEffect(() => {
    async function getSessionId() {
      setLoading(true)

      await api.get("/assistent/session")
        .then((res) => {
          setSessionId(res.data.session_id)
        })
        .catch(() => {
          Alert.alert(
            'Sorry for this error',
            'There was an error connecting with Waterson Assistant, we are already solving the problem, please try again later.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          )
        })

      setLoading(false)
    }

    getSessionId()
  }, [])

  const handleChange = (message) => setCurrentMessage(message)

  const sendMessage = async () => {
    const data = {
      text: currentMessage,
      session_id: sessionId
    }

    const newMessages = [...messages, { user: "user-logged", text: currentMessage }]
    setMessages(newMessages)

    setAnswerLoading(true)

    await api.post("/assistent/message", data)
      .then((res) => {
        setMessages([
          ...newMessages,
          {
            user: "waterson-assistent",
            text: res.data.message || "I'm working hard, but I still don't understand this question :("
          }
        ])

        setCurrentMessage("")
      })
      .catch(() => {
        setMessages([
          ...newMessages,
          {
            user: "waterson-assistent",
            text: res.data.message || "Sorry! An error occurred with our assistant, we are already checking, come back again later, thanks!"
          }
        ])
      })

    setAnswerLoading(false)
  }

  return (
    <>
      <Header title="Chat" />

      <Loading isLoading={loading} />

      <View style={styles.container}>
        <ScrollView style={styles.messagesContainer}
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
        >
          <>
            {messages.map((message, index) => {
              return (
                <View key={index}
                  style={{
                    ...styles.message,
                    ...styles[message.user === "user-logged" ? "userMessage" : "assistentMessage"]
                  }}
                >
                  <Text style={{
                    ...styles[message.user === "user-logged" ? "userMessageText" : "assistentMessageText"]
                  }}>
                    {message.text}
                  </Text>
                </View>
              )
            })}
            {answerLoading && (
              <View style={{ ...styles.message, ...styles.assistentMessage }}>
                <Text style={styles.assistentMessageText}>
                  Processing...
              </Text>
              </View>
            )}
          </>
        </ScrollView>

        <View style={styles.chatInput}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textField}
              onChangeText={text => handleChange(text)}
              placeholder="Write a message here..."
              value={currentMessage}
            />
          </View>
          <TouchableOpacity onPress={() => sendMessage()}>
            <LinearGradient style={styles.buttonContainer} colors={colors.gradient}>
              <FontAwesome5 name="paper-plane" solid size={18} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10
  },
  messagesContainer: {
    flex: 1,
    height: "100%"
  },
  message: {
    backgroundColor: "green",
    borderRadius: 7,
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 5,
    width: "auto"
  },
  userMessage: {
    backgroundColor: colors["bg-light"],
    alignSelf: 'flex-end',
    marginLeft: "20%"
  },
  assistentMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: 'flex-start',
    marginRight: "20%"
  },
  userMessageText: {
    color: "#FFFFFF",
    fontSize: 16
  },
  assistentMessageText: {
    color: colors["text"],
    fontSize: 16
  },
  answerLoading: {
    // backgroundColor: "#FFFFFF",
    alignSelf: 'flex-start',
    marginRight: "20%"
  },
  chatInput: {
    flexDirection: "row",
    justifyContent: "space-between"
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
  }
})