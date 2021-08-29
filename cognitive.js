const axios = require('axios');
require('dotenv').config();

const COGNITIVE_API_URL = 'https://westus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen'

const headers = {
    'Content-Type': 'text/plain',
    'Ocp-Apim-Subscription-Key': process.env.AZURE_COGNITIVE_API_KEY
}


async function reviewContent(message) {
    if(message.length < 5) {
        return {score: 0, flag: null}    
    }
    
    // https://docs.microsoft.com/en-us/azure/cognitive-services/content-moderator/text-moderation-api#classification-preview
    try {
        let res = await axios.post(COGNITIVE_API_URL, message, {params: {classify: true}, headers: headers})
    } catch(err) {
        console.log("ERROR: ", err);
        return null;    
    }
    console.log("SUCCESS: ", resp.data);
    let data = resp.data; 
    // based on the scores for different categories, chose what we want to do.
    // we can give each message a score between 0 and 10
    // we will likely have a lot of Cateogry1 pings in our chat...
    // bewtween 0 and 10 how bad your message is
    // [4, 7) = little bit toxic
    // [7, 9) = definitely toxic
    // [9, 10] = radioactive
    // we also should likely eliminate anything that is under a certain word count

    return res.data;
}
module.exports.reviewContent = reviewContent;
