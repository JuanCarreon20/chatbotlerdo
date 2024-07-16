const { getUniversityInfo, getCareersInfo } = require('../models/chatbotModel');

const chatbotController = async (req, res) => {
    const { message } = req.body;

    let response;

    if (message === '1' || message.toLowerCase() === 'información') {
        try {
            const info = await getUniversityInfo();
            response = {
                location: info.location,
                history: info.history,
                costs: info.costs,
                study_plans: info.study_plans,
                gallery: info.gallery,
                duration: info.duration,
                forums: info.forums,
                extracurricular: info.extracurricular,
                facilities: info.facilities,
                safe_classroom: info.safe_classroom,
                whatsapp_contact: info.whatsapp_contact
            };
        } catch (error) {
            response = 'Hubo un error al obtener la información de la universidad.';
        }
    } else if (message === '2' || message.toLowerCase() === 'ver carreras') {
        try {
            const careers = await getCareersInfo();
            response = careers.map(career => ({
                name: career.name,
                description: career.description
            }));
        } catch (error) {
            response = 'Hubo un error al obtener la información de las carreras.';
        }
    } else {
        response = 'Lo siento, no entiendo tu solicitud. Por favor, intenta elegir una de las opciones: "1", "2"';
    }

    res.json({ response });
};

module.exports = {
    chatbotController
};
