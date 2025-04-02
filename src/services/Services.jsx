import axios from 'axios';

const handleInputChange = (e, setFunction) => {
    const { name, value } = e.target;
    setFunction((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleFileChange = (e, setFunction) => {
    const file = e.target.files[0];
    setFunction((prev) => ({
        ...prev,
        file: file,
    }));
};


const handleGetSubmit = async (url, msgFor) => {
    console.log("GET is Running Perfectly!");
    try {
        const response = await axios.get(`https://localhost:44374/${url}`, {
            withCredentials: true,
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });

        if (response.data.isSuccess) {
            console.log("GET request completed!");

            return response;
        }
        else {
            alert(`Failed to fetch ${msgFor}`)
        }
    } catch (error) {
        console.error(`Error during ${msgFor} Fetch:`, error);
        alert(`Failed to fetch ${msgFor}`);
    }
};

const handlePostSubmit = async (url, data, submitType, msgFor) => {
    console.log(data);
    try {

        const response = await axios.post(
            `https://localhost:44374/${url}`,
            data,
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": submitType
                },
            }
        );

        console.log(response.data);
        if (response.data.isSuccess) {
            alert(`${msgFor} Created successfully!`);
            return response;
        } else {
            alert(`Failed to Create ${msgFor}.`);
        }
    } catch (error) {
        console.error(`Error during ${msgFor} Creation:`, error);
        alert(`Failed to Create ${msgFor}.`);
    }
};

const handlePutSubmit = async (url, data, submitType, msgFor) => {
    console.log(data);
    try {

        const response = await axios.put(
            `https://localhost:44374/${url}`,
            data,
            {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    "Content-Type": submitType
                },
            }
        );

        console.log(response.data);
        if (response.data.isSuccess) {
            alert(`${msgFor} Updated successfully!`);
        } else {
            alert(`Failed to Update ${msgFor}.`);
        }
    } catch (error) {
        console.error(`Error during ${msgFor} Update:`, error);
        alert(`Failed to Update ${msgFor}.`);
    }
};

const handleDeleteSubmit = async (url, msgFor) => {
    try {
        const response = await axios.delete(`https://localhost:44374/${url}`, {
            withCredentials: true,
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        });
        console.log(response.data);
        if (response.data.isSuccess) {
            alert(`${msgFor} Deleted successfully!`);
            return response;
        } else {
            alert(`Failed to Delete ${msgFor}.`);
        }
    } catch (error) {
        console.error(`Error during ${msgFor} Delete:`, error);
        alert(`Failed to Delete ${msgFor}`);
    }
};

export { handleInputChange, handlePostSubmit, handleFileChange, handlePutSubmit, handleGetSubmit, handleDeleteSubmit };