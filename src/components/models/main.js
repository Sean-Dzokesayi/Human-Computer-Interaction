import OpenAI from "openai";
/*

//
// VARIABELS
//

*/
const openai = new OpenAI({apiKey: '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', dangerouslyAllowBrowser: true});

const rules = `
You are an AI assistant called Jasemine, but you prefer the name Jazz.
Your task involves providing a personalized answer for the 'jazz_output' field feel free to be creative with this field treat this as a friendly interaction, as well as any other field that may be present.
You will receive a value, intent, and user_statement. To create JSON output from text, adhere to these rules.
When specifying file paths for locations, use proper notation. For example, represent the Desktop folder as ~/Desktop and so on.
Given the provided dictionary, replace all occurrences of [...] with the appropriate values. You can infer these values using the intent, value, and user_statement.
For goto link the value should be a full url for a webpage i.e https://www.google.com
when updating files always return FULL and complete document results.
When updating files the value should be the filename with no other text i.e "index.html"
When appending to files, do not return the origional Text, only return the addition requested.
If the intent is Other, jazz_output should contain an answer to whatever the user said/ a response
When dealing with closing apps, ensure the value contains just the name of the app with no extension i.e "safari"
Finally, return the updated JSON:
`

export const intent_formatting_examples = {
    "Goto Link" : {
    "jazz_output": "I'm opening the browser.",
    "user_statement": "open google",
    "intent": "Open Browser",
    "value": "[Full VALID URL i.e https://example.com]"
    },
    "Open App": {
    "jazz_output": "I'm launching the [App Name] app.",
    "user_statement": "launch [App Name] app",
    "intent": "Launch App",
    "value": "[App Name i.e Xcode]"
    },
    "Type Text": {
        "user_statement": "type out they call it stormy monday",
        "text": "[The text user wants to type i.e they call it stormy monday]"
    },
    "Close App": {
    "jazz_output": "I'm closing the [App Name] app.",
    "user_statement": "close [App Name] app",
    "intent": "Close App",
    "value": "[App Name]"
    },
    "Create New File":
    {
    "jazz_output": "I'm creating a new file called [File Name] in [Location].",
    "user_statement": "create a file called [File Name] in [Location]",
    "intent": "Create New File",
    "value": "[File Name i.e index.html]",
    "location": "[Location i.e ~/Desktop]"
    },
    "Increase Volume":
    {
    "jazz_output": "I'm increasing the volume to [Volume Level].",
    "user_statement": "increase volume to [Volume Level]",
    "intent": "Increase Volume",
    "value": "[Volume Level]"
    },
    "Decrease Volume":
    {
    "jazz_output": "I'm decreasing the volume to [Volume Level].",
    "user_statement": "decrease volume to [Volume Level]",
    "intent": "Decrease Volume",
    "value": "[Volume Level]"
    },
    "Move File":
    {
    "jazz_output": "I'm moving [File Name] to [New Location].",
    "user_statement": "move [File Name] to [New Location]",
    "intent": "Move File",
    "value": "[File Name]",
    "location": "[New Location (e.g ~/Desktop)]"
    },
    "Append To File":
    {
    "jazz_output": "I'm adding [Content] to [File Name].",
    "user_statement": "add [Content] to [File Name]",
    "intent": "Append File",
    "value": "[File Name]",
    "text": "[Content]"
    },
    "Update File":
    {
    "jazz_output": "I'm updating [File Name].",
    "user_statement": "update [Content] to [File Name]",
    "intent": "Update File",
    "value": "[File Name]",
    },
    "Other":
    {
    "jazz_output": "[Assistant Response]",
    "user_statement": "[User Query]",
    "intent": "Other",
    },
    "Question":
    {
    "jazz_output": "[Assistant Response]",
    "user_statement": "[User Query]",
    "intent": "Other",
    }
}

export const intent_output_speech = {
    "Open App": {
        "filename": "open_app.mp3",
        "transcription": "Opening the app"
    },
    "Create New File": {
        "filename": "create_new_file.mp3",
        "transcription": "Creating new file"
    },
    "Increase Volume": {
         "filename": "vol_up.mp3",
        "transcription": "Increasing your volume"
    },
    "Move File": {
        "filename": "move_file.mp3",
        "transcription": "Moving file to new location"
    },
    "Update File": {
        "filename": "update_file.mp3",
        "transcription": "Updating your file"
    },
    "Other": {
        
    },
    "Question": {

    },
    "Goto Link": {
        "filename": "goto_link.mp3",
        "transcription": "Opening the website"
    },
    "Close App": {
        "filename": "close_app.mp3",
        "transcription": "Closing the app"
    },
    "Append To File": {
        "filename": "append_to_file.mp3",
        "transcription": "Adding to your file"
    }
} 

export const classification_labels = [
    "Open App",
    "Create New File",
    "Increase Volume",
    "Decrease Volume",
    "Move File",
    "Update File",
    "Other",
    "Question",
    "Goto Link",
    "Close App",
    "Append To File",
    "Type Text"
]

/*

//
// FUNCTIONS
//

*/

export async function create_intent_json(intent, user_statement){
    for (const key in intent_formatting_examples) {
        if(key === intent){
            let intent_example = intent_formatting_examples[key]
            intent_example['user_statement'] = user_statement
            intent_example['intent'] = intent
            intent_example = JSON.stringify(intent_example)
            // console.log(intent_example)

            const statement = `Given this template json, replace all occurences of [...] with relevant text based on the 
                             user_statement. return valid json. Here are some rules regarding the formatting: `
            + rules + "\n:Template Json: " + intent_example 

            // console.log("length of statement: ", statement.length)
            
            const answer = await jazz(statement)
            // console.log("Answer: ", answer)
            return answer
            
        }  
      }
}

export async function intent_classification(input){
    const statement = "Which classification label best fits the users statement, give a consise answer. labels: " + classification_labels.toString() +"\ntext: " + input
    const answer = await jazz(statement)
    // console.log(answer)
    return answer
}

export async function question_answering(question, context){
    const statement = "Given some content answer the question as concise as possible. \nContext: " + context + "\nQuestion: " + question
    const answer = await jazz(statement)
    console.log(answer)
    return answer
}


export async function jazz(input) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: input }

],
    model: "gpt-3.5-turbo",
  });

//   console.log(completion.choices[0]['message']['content']);
  return (completion.choices[0]['message']['content']);
}

