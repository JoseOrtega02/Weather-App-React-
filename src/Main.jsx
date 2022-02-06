import React,{useState,useEffect} from 'react';



export  function Main() {
    const [query,setQuery] = useState({});
    const [actualCity,setCity] = useState('');
    
    const key = "4b33a2c67e3f4e7fdad99598e7e10bdc"
    

    
    const handle = evt =>{
        if(evt.key === "Enter"){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`)
            .then(res => res.json())
            .then(result => {
                setCity(result);
                setQuery('');
                console.log(result);
                
            })
            
            
        }
        

    }
    
    useEffect(() => {
        setQuery("")
    },[])
    
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
      }
    
     const expand = () => {
         const ul = document.getElementById('ul');
         const icon = document.getElementById('icon');
         

        if (ul.style.display === 'none') {
            ul.style.display = 'block';
            icon.style.animationName = "rotate";
            icon.style.transform = "rotate(180deg)";
            ul.style.animationName = "visible";
            ul.style.opacity = 1;
            
        }else{
            setTimeout(() => {
                ul.style.display = 'none'
            },800)
            
            icon.style.animationName = "unrotate"
            icon.style.transform = "rotate(0deg)"
            ul.style.animationName = "hidden";
            ul.style.opacity = 0;
        }
        
         
     } 

      


      

  return <div className="Main">
      
      
           
      <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={handle}
          />
          {(typeof actualCity.main != "undefined")?(
            <div className="Main__container" id="main">
            <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${actualCity.weather[0].icon}.svg`} alt=""/>
             <div className="Main__container--text">
                 <h4>{dateBuilder(new Date())}</h4>
                 <h1>{actualCity.name}, {actualCity.sys.country}</h1>
                 <h3>Temperature: {actualCity.main.temp}°C</h3>
                 <h3 className="wheather">{actualCity.weather[0].main}</h3>
                 <h4>{actualCity.weather[0].description}</h4>
                 <div>
                 <h4>More Details:</h4>
                     <ul  id="ul">
                         <li id="li">Humidity: {actualCity.main.humidity}%</li>
                         <li >Pressure: {actualCity.main.pressure} hPa</li>
                         <li >Tempperature max: {actualCity.main.temp_max}°C</li>
                         <li >Temperature min: {actualCity.main.temp_min}°C</li>
                     </ul>
                     <div>
                         <i onClick={expand} ><span id="icon" className="material-icons-outlined">expand_more</span></i>
                     </div>
                 </div>
             </div>
             
           </div>
          ):('')}
      
      
  </div>;
}
