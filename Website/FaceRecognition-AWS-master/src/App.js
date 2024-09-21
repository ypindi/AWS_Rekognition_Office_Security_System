import { useState } from 'react';
import './App.css';
//import java.io.*;

const uuid=require('uuid');

function App() {

  const [image,setImage]=useState('');
  const [uploadResultMessage,setUploadResultMessage]=useState('Please enter an image to authenticate');
  const [visitorName,setVisitorName]=useState('placeholder.jpeg');
  const[isAuth,setAuth]=useState(false);

  function sendImage(e){
    e.preventDefault();
    setVisitorName(image.name);
    const visitorImageName=uuid.v4();
    //fetch(`https://8hpjvto9t1.execute-api.ap-south-1.amazonaws.com/dev/visitors-images/${visitorImageName}.jpeg` ,{
    fetch(`https://7evg7qk1q8.execute-api.eu-west-1.amazonaws.com/yashdeployapi/yashvisitorsbucketgroup1/${visitorImageName}.jpeg` ,{
    method:'PUT',
      headers:{
        'Content-Type':'image/jpeg'
      },
      body:image
    }).then(async()=>{
      //setTimeout(function() {
      //  console.log("Delayed anonymous function executed!");
      //}, 5500);
      const buildResponse=await authenticate(visitorImageName);
      setUploadResultMessage(`Hi ${buildResponse}`)
      //System.out.println(response);
      //if(buildResponse.Message=='Success'){
      //if(buildResponse['Message']=='Success'){
      if(buildResponse==='Success'){
        setAuth(true);
        //setUploadResultMessage(`Hi ${response['firstName']} ${response['lastName']},welcome to work`)
        setUploadResultMessage(`Hi welcome to work`)
      }else{
        setAuth(false);
        //setUploadResultMessage(`Authentication Failed`)
      }
    }).catch(error=>{
      setAuth(false);
      setUploadResultMessage(`There is an error in authentication process,try again later.`)
      console.error(error);
      //setUploadResultMessage(console.error(error));
    })

  }

  
  async function authenticate(visitorImageName){
    const requestUrl='https://7evg7qk1q8.execute-api.eu-west-1.amazonaws.com/yashdeployapi/employee?'+new URLSearchParams({
      objectKey:`${visitorImageName}.jpeg`
    });
    return await fetch(requestUrl,{

      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    }).then(response=>response().json)
    .then((data)=>{
      return data;
    }).catch(error=>console.error(error));
  }



  return (
    <div className="App">
    <h2>FACIAL RECOGNITION SYSTEM</h2>
    <form onSubmit={sendImage}>
      <input type='file' name='image' onChange={e=> setImage(e.target.files[0])} />
      <button type='submit'>Authenticate</button>
    </form>

    <div className={isAuth? 'Success':'failure'}>{uploadResultMessage}</div>
    <img src={require(`./visitors/${visitorName}`)} alt='Visitor' height={250} width={250} />
    </div>
  );
}

export default App;
//maybe calling the wrong s3.