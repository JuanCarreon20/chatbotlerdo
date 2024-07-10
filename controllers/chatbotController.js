const { getUniversityInfo, getCareersInfo  } = require('../models/chatbotModel');

const chatbotController = async (req, res) => {
    const { message } = req.body;

    let response;

    if (message === '1' || message.toLowerCase() === 'información') {
        const info = await getUniversityInfo(); 
        response =  `
                    Información: ${info.location}\n\n\n\n\n
                    Historia: ${info.history}  
                    Costos : ${info.costs} 
                    Plan de estudios: ${info.study_plans} 
                    Galeria: ${info.gallery} 
                    Duracion: ${info.duration} 
                    Foros: ${info.forums} 
                    Extracurricular: ${info.extracurricular} 
                    Instalaciones: ${info.facilities} 
                    Aula Segura: ${info.safe_classroom} 
                    Contactanos: ${info.whatsapp_contact} `;       
            }  else if (message === '2' || message.toLowerCase() === 'ver carreras') {
        const carreras = await getCareersInfo();
        response = 'Carreras que ofrece la universidad:\n';
        carreras.forEach(carrera => {
            response += `Carreras a elegir: ${carrera.name} 
                        Descripcion: ${carrera.description} `; 
        });
    } else {
        response = 'Lo siento, no entiendo tu solicitud. Por favor, intenta elegir una de las opciones: "1", "2"';
    }

    res.json({ response });
};

module.exports = {
    chatbotController
};