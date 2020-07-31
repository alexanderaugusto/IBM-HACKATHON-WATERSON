const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

const assistantId = process.env.ASSISTANT_ID
const apikey = process.env.ASSISTANT_IAM_APIKEY
const apiUrl = process.env.ASSISTANT_URL
const apiVersion = process.env.ASSISTANT_VERSION

const assistant = new AssistantV2({
  version: apiVersion,
  authenticator: new IamAuthenticator({ apikey }),
  url: apiUrl
})

const message = (text, sessionId) => {
  if (!assistantId) {
    return Promise.reject('ASSISTANT_ID has not been configured.')
  } else if (!sessionId) {
    return Promise.reject('sessionId has not been provided.')
  } else if (!text) {
    return Promise.reject('No user input provided.')
  }

  const payload = {
    assistantId,
    sessionId,
    input: {
      message_type: 'text',
      text: text
    }
  }

  return new Promise((resolve, reject) => {
    assistant.message(payload, (err, data) => {
      if (err) {
        console.error('Failed to send message to Watson Assistant')
        reject(err);
      } else {
        resolve(data.result.output)
      }
    })
  })
}

const session = () => {
  if (!assistantId) {
    return Promise.reject('ASSISTANT_ID has not been configured')
  }

  return assistant
    .createSession({
      assistantId
    })
    .then(response => response.result['session_id'])
    .catch(err => {
      console.error('Failed to obtain a session ID from Watson Assistant')
      console.error(`  ASSISTANT_URL: ${apiUrl}`);
      throw err
    })
}

module.exports = {
  message,
  session
}
