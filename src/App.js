import React from 'react';
import './App.css';
import { Configuration, OpenAIApi } from "openai";


class FourImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 0,
      showImages: true,
      buttonClicked: '',
      currentImage: 1,
      generatedImage: '',
      generatedText: '',
      tot: '',
      line: '',
      opt1: '',
      opt2: '',
      currentIndexLine: 0,
      isAnimatingLine: false,
      currentIndexOpt1: 0,
      isAnimatingOpt1: false,
      currentIndexOpt2: 0,
      isAnimatingOpt2: false,
      change: false,

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.configuration = new Configuration({
      apiKey: "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"
    });
    this.openai = new OpenAIApi(this.configuration);
  }
  async generateImage(prompt) {
    try {
      const res = await this.openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      this.setState({ generatedImage: res.data.data[0].url });
    } catch (err) {
      console.error(err);
    }
  }

  async generateText() {
    let prompt1 = this.state.tot + "Generate the complete next 9-worded scene of what happened next in a adventure story with Faraaz as lead character in around 9 words. Give an unexpected twist to the story, perhaps introduce a new character, put the main character in some trouble, reveal a hidden plot then in another paragraph Give two highly conflicting options on what Faraaz should do next. Write the options as Option 1, Option 2. The options should give a dramatic twist to the story, the options should give a deep moral conflict to the character. like if even one option is smart, other should be rash, if even one option is violent, the other shud be peaceful etc.The options should be around 3 words long."
    console.log(prompt1);
    
    const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt1,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    this.setState({generatedText: response["data"]["choices"][0]["text"]});
  
    // console.log(response["data"]["choices"][0]["text"]);
    let tempGeneratedText = response["data"]["choices"][0]["text"];
    let tempSplit = tempGeneratedText.split("Option 1:");
    let tempLine = tempSplit[0];
    tempSplit = tempSplit[1].split("Option 2:");
    let tempOpt1 = tempSplit[0];
    let tempOpt2 = tempSplit[1];

    this.setState(prevState => ({tot: prevState.tot + tempLine}))
    this.setState({line: tempLine,opt1: tempOpt1,opt2: tempOpt2,currentIndexLine: 0,currentIndexOpt1: 0,currentIndexOpt2: 0,isAnimatingLine:true,isAnimatingOpt1:true,isAnimatingOpt2:true});
    //console.log(this.state.tot);

    let prompie = "high-quality retroanime detailed animated, imaginative,colorful digital art of " + tempLine

    const updateLineCall = async () => {
      console.log("Lineupdate ON!")
      this.updateLine();
    }

    const createImageCall = async () => {
      console.log("ImageUpdate ON!")
      try {
        const res = await this.openai.createImage({
          prompt: prompie,
          n: 1,
          size: "256x256",
        });
        this.setState({ generatedImage: res.data.data[0].url });
      } catch (err) {
        console.error(err);
      }
    }

    Promise.all([updateLineCall(), createImageCall()])
      .then(() => { 
        console.log("Both updateLine and createImage have completed");
      })
      .catch(error => {
        console.log(error);
      });


  }

  async generateFirst(prompt) {
   
    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 2,
    });
    this.setState({generatedText: response["data"]["choices"][0]["text"]});
    
    let tempGeneratedText = response["data"]["choices"][0]["text"];
    console.log("hey");
    console.log(response["data"]["choices"][0]["text"]);
    let tempSplit = tempGeneratedText.split("Option 1:");
    let tempLine = tempSplit[0];
    tempSplit = tempSplit[1].split("Option 2:");
    console.log(tempSplit);
    let tempOpt1 = tempSplit[0];
    let tempOpt2 = tempSplit[1];


    this.setState({tot: tempLine, line: tempLine,opt1: tempOpt1,opt2: tempOpt2 });
   
    let prompie = "high-quality retroanime detailed animated, imaginative,colorful digital art of " + tempLine
   
    const updateLineCall = async () => {
      console.log("Lineupdate ON!")
      this.updateLine();
    }

    const createImageCall = async () => {
      console.log("ImageUpdate ON!")
      try {
        const res = await this.openai.createImage({
          prompt: prompie,
          n: 1,
          size: "256x256",
        });
        this.setState({ generatedImage: res.data.data[0].url });
      } catch (err) {
        console.error(err);
      }
    }

    Promise.all([updateLineCall(), createImageCall()])
      .then(() => { 
        console.log("Both updateLine and createImage have completed");
      })
      .catch(error => {
        console.log(error);
      });
  }



  handleClick(num) {
    this.setState(() => {
      return {
        clicked: num,
        showImages: false   
      }
      
    });
   
    if (num === 1){
      this.generateFirst("Write the complete 9-worded first scene of a children adventure story of Faraaz the Warrior in around 9 words. After writing the line, change paragraphs and Give two highly conflicting options on what should do next. Write the options as Option 1, Option 2. The options should give a dramatic twist to the story, the options should give a deep moral conflict to the character. like if even one option is smart, other should be rash, if even one option is violent, the other shud be peaceful etc. Write the options in a way that this what the character does. Option 1 should not affect option 2. The options should be around 3 words long.")
    }
    else if (num === 2){
      this.generateFirst("Write the complete 9-worded first scene of a children horror story of Ghostbuster Faraaz in around 9 words. After writing the line, change paragraphs and Give two highly conflicting options on what should do next. Write the options as Option 1, Option 2. The options should give a dramatic twist to the story, the options should give a deep moral conflict to the character. like if even one option is smart, other should be rash, if even one option is violent, the other shud be peaceful etc. Write the options in a way that this what the character does. Option 1 should not affect option 2. The options should be around 3 words long.")
    }
    else if (num === 3){
      this.generateFirst("Write the complete 9-worded first scene of a children magical story of Whizzy Farzi in around 9 words . After writing the line, change paragraphs and Give two highly conflicting options on what should do next. Write the options as Option 1, Option 2. The options should give a dramatic twist to the story, the options should give a deep moral conflict to the character. like if even one option is smart, other should be rash, if even one option is violent, the other shud be peaceful etc. Write the options in a way that this what the character does. Option 1 should not affect option 2. The options should be around 3 words long.")
    }

    //this.generateImage(tempLin);
    //this.generateText("Write a name for Genie")
  }

  handleButtonClick(e) {
    if(e.currentTarget.value === 'A'){
      this.setState(prevState => ({tot: prevState.tot + this.state.opt1}), () => {
        console.log("wew");
        this.generateText();
    });
    
    }
    if(e.currentTarget.value === 'B'){
      this.setState(prevState => ({tot: prevState.tot + this.state.opt2}), () => {
        console.log("wew2");
        this.generateText();
    });
    
    }
    
  }

  updateLine = () => {
    console.log(this.state.line)
    setTimeout(() => {
      let check = this.state.line;
      this.setState(prevState => ({
        currentIndexLine: prevState.currentIndexLine + 1
      }));
      if (this.state.currentIndexLine < check.length) {
        this.updateLine();
      } else {
        this.setState({ isAnimatingLine: false, change: true });
        this.updateOpt1();
        this.updateOpt2();
      }
    }, 15);
  }

  updateOpt1 = () => {
    setTimeout(() => {
      let check = this.state.opt1;
      this.setState(prevState => ({
        currentIndexOpt1: prevState.currentIndexOpt1 + 1
      }));
      if (this.state.currentIndexOpt1 < check.length) {
        this.updateOpt1();
      } else {
        this.setState({ isAnimatingOpt1: false});
      }
    }, 30);
  }
  updateOpt2 = () => {
    setTimeout(() => {
      let check = this.state.opt2;
      this.setState(prevState => ({
        currentIndexOpt2: prevState.currentIndexOpt2 + 1
      }));
      if (this.state.currentIndexOpt2 < check.length) {
        this.updateOpt2();
      } else {
        this.setState({ isAnimatingOpt2: false });
      }
    }, 30);
  }


  render() {
   // let check1 = this.state.opt1;
   let loadingImage = require(`./genie.jpg`);

    return (
      <div>
        {
          this.state.showImages && (
            <div className = "container">
            <img onClick ={() => this.handleClick(1)}  className="normal-size" src={require("./adventure.jpg")} alt="3" />
            <img onClick ={() => this.handleClick(2)}  className="normal-size" src={require("./horror.jpg")} alt="3" />
            <img onClick ={() => this.handleClick(3)}  className="normal-size" src={require("./mystery.jpeg")} alt="3" />
            </div>    
          )}
        {!this.state.showImages && (
          <div>
            <img src={this.state.generatedImage ? this.state.generatedImage : loadingImage} className="normal-size" alt="generated"/>  
              <button onClick={this.handleButtonClick} value = "A">
                <div className={`typing-animation ${this.state.isAnimatingOpt1 ? 'animating' : ''}`}>
                  {this.state.opt1.slice(0, this.state.currentIndexOpt1)}
                </div>
              </button>
              <button onClick={this.handleButtonClick} value = "B">
                <div className={`typing-animation ${this.state.isAnimatingOpt2 ? 'animating' : ''}`}>
                  {this.state.opt2.slice(0, this.state.currentIndexOpt2)}
                </div>
              </button>
            <p>
              <div className={`typing-animation ${this.state.isAnimatingLine ? 'animating' : ''}`}>
              {this.state.line.slice(0, this.state.currentIndexLine)}
              </div>
            </p>
          </div>
        )}
      </div>  
    ); 
  }
}

export default FourImages; 
