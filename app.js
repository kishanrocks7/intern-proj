const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express=require('express');
const bodyParser=require('body-parser');
const port=8081;
const path = require('path');
const app = express();
const sessionId = uuid.v4();

app.use(bodyParser.urlencoded({
    extended:false
}))



app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+''));
  });
  app.use(express.static('public'));





app.post('/send-msg',(req,res)=>{
    runSample(req.body.MSG).then(data=>{
        res.send({Reply:data})
    })
})

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'rn-bot-mucfbt') {
  // A unique identifier for the given session
  

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename:"C:/Users/kishan/Desktop/intern-proj/RN-bot-0037c8c5ccb2.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}

app.listen(port,()=>{
    console.log("running on the port", port);
})