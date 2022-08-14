import axios from "axios";
import { profileSelectors } from "../configs/selectors.js";
import { $, $$ } from "../utils/selectors.js";
const mongoose = require('mongoose');

const user = 'albert123';
const password = '1IM1AKKoqATmtvMn';
const bdname = 'scrapper';
const uri = `mongodb+srv://${user}:${password}@scrap.yxqlkdq.mongodb.net/${bdname}?retryWrites=true&w=majority`;


mongoose.connect(uri)
.then(()=> console.log('Base de Datos contectada'))
.catch(e => console.log(e))


async function scrap (){
    
    const token = document.cookie
    .split(';')
    .find(cookie => cookie.includes('JSESSIONID'))
    .replace(/JSESSIONID=|"/g,'').trim()

    const [contactInfSemple] = $(profileSelectors.contactInfo).href.match(/in\/.+\//g) ?? []
    
    const contactInfoUrl = `https://www.linkedin.com/voyager/api/identity/profiles${contactInfSemple.replace(/in\/|o/)}//profileContactInfo`   

    const {dato} = await axios.get(contactInfoUrl, {
        headers:{
        'csrf-token': token
    }
    })
     
    console.log(dato)
    
    const name = $(profileSelectors.name).textContent
    
    const elementExperience = $$(profileSelectors.elementExperience)
    const titleExperience = []
    
    elementExperience.forEach((listExperience) => {
        const titleExperienceElement = $('span[aria-hidden]', listExperience)
        titleExperience.push(titleExperienceElement.textContent)
    }) 
    
    //guardar BD
    const profile = {
        name,
        titleExperience
    }
    
    console.table(profile);
}

scrap()