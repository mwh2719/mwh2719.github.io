
    // 1
  	window.onload = (e) => {if(!dateSet){
    setDate();
}
        document.querySelector("#search").onclick = getData;

//this displays previously saved search terms
    const natiField = document.querySelector("#natiTerm");
    const custField = document.querySelector("#custTerm");
    const launchFiel = document.querySelector("#succOrFail");
    const prefix = "mwh2719-";
    const natiKey = prefix + "nation";
    const custKey = prefix + "customer";
    const launKey = prefix + "launch";

    // grab the stored data
    const storedNati = localStorage.getItem(natiKey);
    const storedCust = localStorage.getItem(custKey);
    const storedLaun = localStorage.getItem(launKey);
                           


// if we find a previously set value, display it
if (storedNati){
	natiField.value = storedNati;
}
else{
    natiField.value = "";
}

if (storedCust){
	custField.value = storedCust;
}
else{
    custField.value = "";
}
                           
                            
if (storedLaun){
    launchFiel.querySelector(`option[value='${storedLaun}']`).selected = true;
}
                           

//changing the values if the user enters information

natiField.onchange = e=>{ localStorage.setItem(natiKey, e.target.value); };


custField.onchange = e=>{ localStorage.setItem(custKey, e.target.value); };
                            
launchFiel.onchange = e=>{ localStorage.setItem(launKey, e.target.value); };
                           
                           }

    //setting the end date to search to be equal to today's date when the page loads the first time
let dateSet = false;

function setDate (){
    let day = new Date();
    
    let month = new Date();
    
    let year = new Date();
    
    if(day.getDate() < 10)
    {
        let date = year.getFullYear() + "-" + (month.getMonth() +1) + "-" + "0" + day.getDate();
        document.querySelector("#end").value = date;
    }
    else{
        let date = year.getFullYear() + "-" + (month.getMonth() +1) + "-" + day.getDate();
        document.querySelector("#end").value = date;
    }
    
    dateSet = true;
}
	
	// 2
	let displayTerm = "";
	
	// 3

    //This function is called when the user clicks the serach button
	function getData(){

        
        //url of the site where the info comes from
        const Launches_URL = "https://api.spacexdata.com/v2/launches/all";
        
        let url = Launches_URL;

        
        
        
        //calling the method that will look through the retrieved info
        $.ajax({
            dataType: "json",
            url: url,
            data: null,
            success: jsonLoaded
        });
	}
      

    //method that retrieves the info
      function jsonLoaded(obj){

          
          //rocekt info
          let rockets = obj;
          
          //array to hold the search results
          let results=[];
      
      
          //retrieving the inputed information from the search fields
      let launchSucc = document.querySelector("#succOrFail");
          
        let placeTerm = document.querySelector("#natiTerm").value;
          
          let custTerm = document.querySelector("#custTerm").value;
          
          let order = document.querySelector("#sortBy").value;
          
          //retriving the inforamtion for the dates to look between
          let start = document.querySelector("#start");
          let end = document.querySelector("#end");
          
          
          //returning rockets with the result that was selected
          if(launchSucc.value != "null"){
          for(let r of rockets){
                  if(!r.upcoming)
                  {

                      if(launchSucc.value == "true"){
                          if(r.launch_success){
                              results.push(r);
                          }
                        }
                      else if(launchSucc.value == "false"){
                        if(!r.launch_success){
                          results.push(r);
                            }
                        } 
              }
          }   
          }
          else{
                  results = rockets.slice();
              }
          
          
          //used for debugging and testing purposes
          /*console.log(rockets);
          console.log(results);*/
          
          
          
          //returning the launches from the result array that happened between the specified dates
          let date;
          for(let r = 0; r < results.length; r++){
              date   = results[r].launch_date_utc;
              date = date.substring(0, 10);
              
              
              //comparing the years
              if(date.substring(0,4) > start.value.substring(0,4) && date.substring(0,4) < end.value.substring(0,4)){}
              
              //if year is equal to min year, comparing the months
              else if(date.substring(0,4) == start.value.substring(0,4)){
                  if(date.substring(5,7) > start.value.substring(5,7)){}
                  
                  //if month is equal min month, comparing the days
                     else if(date.substring(5,7) == start.value.substring(5,7)){
                      if(date.substring(8,10) >= start.value.substring(8,10)){}
                         //removing results that do not meet the search criteria
                      else{
                          results.splice(r, 1);
                          r--;
                      }
                  }
                  else{
                    results.splice(r, 1);
                    r--;  
                  }
              } 
              
              //if year is equal to max year, comparing the months
              else if(date.substring(0,4) == end.value.substring(0,4)){
                   if(date.substring(5,7) < end.value.substring(5,7)){}
                  
                  //if month is equal max month, comparing the days
                   else if( date.substring(5,7) == end.value.substring(5,7)){
                        if(date.substring(8,10) <= end.value.substring(8,10)){}
                       //removing results that do not meet the search criteria
                        else{
                          results.splice(r, 1);
                          r--;
                        }
                    }
                  else{
                    results.splice(r, 1);
                    r--;  
                  }
              }
              else{
                  results.splice(r, 1);
                  r--;
              }
          }
        
          
          //returns launches with payloads that came from the specfied country
        //console.log(placeTerm);
        if(placeTerm != ""){
        
                for(let r = 0; r < results.length; r++){
                    for(let n of results[r].rocket.second_stage.payloads)
                    {
                    
                        if(n.nationality == placeTerm){break;}
                        //removing results that do not meet the search criteria
                     else
                    {
                        results.splice(r, 1);
                        r--;
                        break;
                    }
                }
            }
        }
        
          
          //returns launches with payloads for the specified customer
          if(custTerm != ""){
            if(custTerm != "NASA"){
                for(let r = 0; r < results.length; r++){
                    for(let n of results[r].rocket.second_stage.payloads)
                    {for(let c of n.customers){

                        if(c == custTerm){
                            break;
                        }
                        //removing results that do not meet the search criteria
                        else
                        {
                            results.splice(r, 1);
                            r--;
                            break;
                        }
                    }
                     break;
                }
            }
            }
              
              //special case for if the user searchs NASA it will return all NASA results inculding the ones with (CRS) and other customers
              else if(custTerm == "NASA"){
              for(let r = 0; r < results.length; r++){
                    for(let n of results[r].rocket.second_stage.payloads)
                    {for(let c of n.customers){
                        console.log(c);
                        console.log(custTerm);
                        if(c.substring(0,4) == custTerm){
                            break;
                        }
                        //removing results that do not meet the search criteria
                        else
                        {
                            results.splice(r, 1);
                            r--;
                            break;
                        }
                    }
                     break;
                }
            }
        }
          }
        
        
          
     //saving the original length of the array
let length = results.length;
let small = 1;
let large = 5;
      
          
          //console.log(results);
 function displayResults(){         
          //printed if no launches with correct info are found
     
     //clearing the content section of old results
        document.querySelector("#content").innerHTML = "";
     
     
          if(results.length < 1){
              
             let noResult = document.createElement("h5");
              let noResultText = "There are no launches that match these parameters! " 
              + "Please try broadening your search.";
             noResult.append(noResultText); 
              document.querySelector("#content").appendChild(noResult);
              
          }
              //prints of the information of the rocket launches
     else if (results.length >= 5){
     let resultAmount = document.createElement("h5");
          let resultAmountText = "Displaying results " + small + " - " + large + " of " + length;
          resultAmount.append(resultAmountText);
     document.querySelector("#content").appendChild(resultAmount);
     }
     else{
         large = results.length;
         let resultAmount = document.createElement("h5");
          let resultAmountText = "Displaying results " + small + " - " + large + " of " + length;
          resultAmount.append(resultAmountText);
     document.querySelector("#content").appendChild(resultAmount);
     }
     
        if(results.length >= 5){
            for(let i = 0; i < 5; i++)
            {
          
          //changes order the reults are returned
          let rock;
          
          if(order == "oldest"){
            rock = results.shift();
          }
          else if(order == "newest")
          {
              rock = results.pop();
          }
          let links = rock.links;
          let nation;
          let customer;
          for(let n of rock.rocket.second_stage.payloads)
          {
              if(n.nationality != null){
                  if(nation != null){
                      nation += " and " + n.nationality.toString();
                  }
                  else{
                    nation = n.nationality.toString();
                  }
              }
              for(let c of n.customers){
                  if(c != null){
                      if(customer != null)
                      {
                        customer += " and " + c.toString();
                      }
                      else{
                          customer = c.toString();
                      }
                  }
              }
          }
          
        let rockName = rock.rocket.rocket_name;
        let rockHeader = document.createElement("h3");
        rockHeader.append(rockName);
        document.querySelector("#content").append(rockHeader);
        let text = document.createElement("ul");
        text
        
        //write up for past launches
        if(!rock.upcoming){
        let launchTime  = document.createElement("li");
        launchTime.innerHTML = "The rocket was launched in " + rock.launch_year + "."; 
          let missionName  = document.createElement("li");
          missionName.innerHTML = "The mission name was " + rock.mission_name +  ".";
          let payloadNati = document.createElement("li");
          payloadNati.innerHTML ="The payload was from " + nation + ".";
          let payloadCust = document.createElement("li");
           payloadCust.innerHTML ="The customer was  "+ customer + ".";
          let launchOutcome = document.createElement("li");
          if(rock.launch_success){
              launchOutcome.innerHTML = "The launch was successful."
          }
          else if(!rock.launch_success){
              launchOutcome.innerHTML = "The launch failed."
          }
            
         text.appendChild(launchTime);
         text.appendChild(missionName);
         text.appendChild(payloadNati);
         text.appendChild(payloadCust); 
         text.appendChild(launchOutcome);
         if(rock.details != null)
            {
                let details = document.createElement("li");
                details.innerHTML = rock.details;
                text.appendChild(details); 
            }
            document.querySelector("#content").appendChild(text);
            
        }
          //write up for upcoming launches
          else{
              let launchTime  = document.createElement("li");
            launchTime.innerHTML = "The rocket will be launched in " + rock.launch_year + "."; 
              let missionName  = document.createElement("li");
              missionName.innerHTML = "The mission name is " + rock.mission_name +  ".";
              let payloadNati = document.createElement("li");
              payloadNati.innerHTML ="The payload will be from " + nation + ".";
              let payloadCust = document.createElement("li");
               payloadCust.innerHTML ="The customer is  "+ customer + ".";
         text.appendChild(launchTime);
         text.appendChild(missionName);
         text.appendChild(payloadNati);
         text.appendChild(payloadCust);  document.querySelector("#content").appendChild(text);
          }
          
          
          if(links != null){
              let linksHead = document.createElement("h4");
             let linksHeadText = "Links:"; 
             linksHead.append(linksHeadText); 
              document.querySelector("#content").append(linksHead);
              //used to return links to websites with more information on the rocket launches
          for(let page in links){
              //Removing pages that do not have links with them
              if(links[page] != null){
                  //These two links never work properly
                  if(page != "youtube_id" && page != "flickr_images")
                  {
              let tempPage = document.createElement("p");
              let tempLink = document.createElement("a");
              tempLink.innerHTML = page;
              tempLink.href = links[page];
              tempPage.appendChild(tempLink);
            document.querySelector("#content").appendChild(tempPage);
                  }
              }
          }
              //inserting a break between each result
              let resultBreak = document.createElement("hr");
              document.querySelector("#content").appendChild(resultBreak);
}
      }
      }
     else if (results.length < 5 && results.length >0){
         for(let i = results.length; i > 0; i--)
      {
          //changes order the reults are returned
          let rock;
          if(order == "oldest"){
                rock = results.shift();
          }
          else if(order == "newest")
          {
              rock = results.pop();
          }
          let links = rock.links;
          let nation;
          let customer;
          for(let n of rock.rocket.second_stage.payloads)
          {
              if(n.nationality != null){
                  if(nation != null){
                      nation += " and " + n.nationality.toString();
                  }
                  else{
                    nation = n.nationality.toString();
                  }
              }
              for(let c of n.customers){
                  if(c != null){
                      if(customer != null)
                      {
                        customer += " and " + c.toString();
                      }
                      else{
                          customer = c.toString();
                      }
                  }
              }
          }
          
        let rockName = rock.rocket.rocket_name;
        let rockHeader = document.createElement("h3");
        rockHeader.append(rockName);
        document.querySelector("#content").append(rockHeader);
        let text = document.createElement("ul");
        text
        
        //write up for past launches
        if(!rock.upcoming){
        let launchTime  = document.createElement("li");
        launchTime.innerHTML = "The rocket was launched in " + rock.launch_year + "."; 
          let missionName  = document.createElement("li");
          missionName.innerHTML = "The mission name was " + rock.mission_name +  ".";
          let payloadNati = document.createElement("li");
          payloadNati.innerHTML ="The payload was from " + nation + ".";
          let payloadCust = document.createElement("li");
           payloadCust.innerHTML ="The customer was  "+ customer + ".";
          let launchOutcome = document.createElement("li");
          if(rock.launch_success){
              launchOutcome.innerHTML = "The launch was successful."
          }
          else if(!rock.launch_success){
              launchOutcome.innerHTML = "The launch failed."
          }
            let details = document.createElement("li");
          details.innerHTML = rock.details + ".";
         text.appendChild(launchTime);
         text.appendChild(missionName);
         text.appendChild(payloadNati);
         text.appendChild(payloadCust); 
             text.appendChild(launchOutcome);
         text.appendChild(details);  document.querySelector("#content").appendChild(text);
            
        }
          //write up for upcoming launches
          else{
              let launchTime  = document.createElement("li");
            launchTime.innerHTML = "The rocket will be launched in " + rock.launch_year + "."; 
              let missionName  = document.createElement("li");
              missionName.innerHTML = "The mission name is " + rock.mission_name +  ".";
              let payloadNati = document.createElement("li");
              payloadNati.innerHTML ="The payload will be from " + nation + ".";
              let payloadCust = document.createElement("li");
               payloadCust.innerHTML ="The customer is  "+ customer + ".";
         text.appendChild(launchTime);
         text.appendChild(missionName);
         text.appendChild(payloadNati);
         text.appendChild(payloadCust); 
              document.querySelector("#content").appendChild(text);
          }
          
          
          if(links != null){
              let linksHead = document.createElement("h4");
             let linksHeadText = "Links:"; 
             linksHead.append(linksHeadText); document.querySelector("#content").append(linksHead);
              //used to return links to websites with more information on the rocket launches
          for(let page in links){
              let tempPage = document.createElement("p");
              let tempLink = document.createElement("a");
              tempLink.innerHTML = page;
              tempLink.href = links[page];
              tempPage.appendChild(tempLink);
            document.querySelector("#content").appendChild(tempPage);
          }
              
              //inserting a break between each result
              let resultBreak = document.createElement("hr");
              document.querySelector("#content").appendChild(resultBreak);
}
      }
      }
      
      $("#content").fadeIn(500);
          
     
     if(results.length > 0){
              let next = document.createElement("button");
               next.innerHTML= "NEXT PAGE";
              document.querySelector("#content").appendChild(next);
              next.onclick = displayResults;
            $('html, body').animate({ scrollTop: 500 }, 'fast');
         small+= 5;
         if(results.length > 5){
             large += 5;
         }
         else{
             large += results.length;
         }
          }
 }
     
     

          //calling method to run the first time
     displayResults();
          //making a button if there are still more results to show so that you can go to the next page of results
          
}

      
    
