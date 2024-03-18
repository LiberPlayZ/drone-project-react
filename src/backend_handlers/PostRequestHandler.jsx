
import enviorment_variables from '../enviorment_variables';

//handler for post requests in the project that receive the endpoint, data to send the setError if needed . 

export async function PostRequestHandler(endpoint, dataToSend, setError) {
    const Server_url = enviorment_variables.Server_URL + endpoint;
    try {
        const response = await fetch(Server_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
            credentials: 'include'
        });


        return response;

    } catch (error) {
        // Handle error
        console.error('Error:', error);


    }


};



