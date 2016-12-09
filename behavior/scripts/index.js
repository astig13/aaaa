'use strict'

const getCurrentWeather = require('./lib/getCurrentWeather')

const firstOfEntityRole = function(message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

exports.handle = function handle(client) {
  const collectCity = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().weatherCity)
    },

    extractInfo() {
     const city = firstOfEntityRole(client.getMessagePart(), 'city')
      if (city) {
        client.updateConversationState({
          weatherCity: city,
        })
        console.log('User wants the weather in:', city.value)
      }
    },

    prompt() {
      client.addResponse('prompt/weather_city')
      client.done()
    },
  })

  const provideWeather = client.createStep({
    satisfied() {
      return false
    },

    prompt(callback) {
      const environment = client.getCurrentApplicationEnvironment()
      //getCurrentWeather(environment.weatherAPIKey, client.getConversationState().weatherCity.value, resultBody => {
      //  if (!resultBody || resultBody.cod !== 200) {
      //    console.log('Error getting weather.')
      //    callback()
      //    return
      //  }

      //  const weatherdescription = (
      //    resultbody.weather.length > 0 ?
      //    resultbody.weather[0].description :
      //    null
      //  )

      //  const weatherdata = {
      //    temperature: math.round(resultbody.main.temp),
      //    condition: weatherdescription,
      //    city: resultbody.name,
      //  }


        //console.log('sending real weather:', weatherData)
      const city = true
      if (city)
      {
          client.addTextResponse('A')
      }
      else
      {
          client.addTextResponse('B')
      }
    
        client.done()

        callback()
      
    },
  })

  client.runFlow({
    classifications: {},
    streams: {
      main: 'getWeather',
      getWeather: [collectCity, provideWeather],
    }
  })
}
